const message:any = require('./proto/user_pb');
const services = require('./proto/user_grpc_pb');
const grpc = require('@grpc/grpc-js');

function main() {
    const client = new services.UserSvcClient('localhost:8080', grpc.credentials.createInsecure());

    let registerReq = new messages.RegisterRequest();
    registerReq.setName("Hello");
    registerReq.setEmail("hello@world.com");
    registerReq.setPassword("Password");
any:client.register(registerReq, function(err:any, response:any) {
        console.log(response);
    });
}

main();