const bcrypt = require('bcrypt');
const auth = require("./auth");
const messages = require('./proto/user_pb');
const ObjectId = require('mongodb').ObjectID;

module.exports = class API {
    grpc
    db: any;
    constructor(db:any, grpc:any) {
        this.db = db;
        this.grpc = grpc;
    }

   register = (call:any, callback:any) => {
        const users = this.db.collection("users");

        bcrypt.hash(call.request.getPassword(), 10, (err:any, hash:any) => {
            let user = { _id:call.request.get,name: call.request.getName(), email: call.request.getEmail(), password: hash }
            users.insertOne(user).then((_r: any) => {
                let resp = new messages.UserResponse();
                resp.setId(user._id);
                resp.setName(user.name);
                resp.setEmail(user.email);
                resp.setToken(auth.generateToken(user));
                callback(null, resp);
            });
        });
    }
    

login = (call:any, callback:any) => {
    const users = this.db.collection("users");

    users.findOne({ email: call.request.getEmail() }).then((user: { password: any; _id: { toString: () => any; }; name: any; email: any; }) => {
        if (user) {
            bcrypt.compare(call.request.getPassword(), user.password, (err:any, result:any) => {
                if (result) {
                    let resp = new messages.UserResponse();
                    resp.setId(user._id.toString());
                    resp.setName(user.name);
                    resp.setEmail(user.email);
                    resp.setToken(auth.generateToken(user));
                    callback(null, resp);
                }
            });
        } else {
            return callback({
                code: this.grpc.status.UNAUTHENTICATED,
                message: "No user found",
            });
        }
    });
}
verify = (call:any, callback:any) => {
    auth.verify(call.request.getToken(), (usr: { email: any; }) => {
        const users = this.db.collection("users");

        let resp = new messages.VerifyResponse();
        if (usr) {
            users.findOne({ email: usr.email }).then((user: { _id: { toString: () => any; }; name: any; email: any; }) => {
                resp.setId(user._id.toString());
                resp.setName(user.name);
                resp.setEmail(user.email);
                callback(null, resp);
            })
        } else {
            return callback({
                code: this.grpc.status.UNAUTHENTICATED,
                message: "No user found",
            });
        }
    })
}
getUser = (call:any, callback:any) => {
    const users = this.db.collection("users");
    let resp = new messages.VerifyResponse();
    let userId = ObjectId(call.request.getUserId());
    users.findOne({ _id: userId}).then((user: { _id: { toString: () => any; }; name: any; email: any; }) => {
        if (user) {
            resp.setId(user._id.toString());
            resp.setName(user.name);
            resp.setEmail(user.email);
            callback(null, resp);
        } else {
            return callback({
                code: this.grpc.status.UNAUTHENTICATED,
                message: "No user found",
            });
        }
    })
}
};
