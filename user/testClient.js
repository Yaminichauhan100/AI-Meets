const messages = require('./proto/user_pb');
const services = require('./proto/user_grpc_pb');
const grpc = require('@grpc/grpc-js');

function main() {
    const client = new services.UserSvcClient('localhost:50051', grpc.credentials.createInsecure());

    let registerReq = new messages.RegisterRequest();
    registerReq.setName("Hello");
    registerReq.setEmail("hh@hh.com");
    registerReq.setPassword("Hash");
    client.register(registerReq, function(err, response) {
        console.log(response);
    });

    let req = new messages.LoginRequest();
    req.setEmail("hh@hh.com");
    req.setPassword("Hash");
    client.login(req, function(err, response) {
        console.log(response);
    });

    let req1 = new messages.VerifyRequest();
    req1.setToken(  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSGVsbG8iLCJlbWFpbCI6ImhoQGhoLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJGxELnk1TzFmL1FiYlhLVDFBQU1XRk94RDlLeUJnN3VENExibmU3V3diQk5DbEs1YVU4SndtIiwiX2lkIjoiNjJjMmI2MWY4NGU1YjY1ODEyNDdiYzA5IiwiaWF0IjoxNjU2OTI3Nzc1LCJleHAiOjE2NTgxMzczNzV9.ecUB3jvlSi05LUgon3soNUI16TqIyJ-iYwDZNAazz0U' );
    client.verify(req1, function(err, response) {
        if (err) {
            console.error(err);
        }
        console.log(response);
    });
    let req2= new messages.GetUserRequest();
    req2.setUserId("62c2b8f5cfbbbf45f978b63d");
    client.getUser(req2, function(err, response) {
        if (err) {
            console.error(err);
        }
        console.log(response);
    });
}
main()