const jwt = require('jsonwebtoken');

module.exports.generateToken = (payload) => {
    return jwt.sign(payload,"yamini", { expiresIn:"2w" });
}

module.exports.verify = (token, callback) => {
    jwt.verify(token, 'yamini', (err, user) => {
        if (err) {
            console.error(err);
        }
        callback(user);
    });
}

