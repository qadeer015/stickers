const jwt = require('jsonwebtoken');
require('dotenv').config();

function authenticate(req, res, next) {
    const token = req.cookies?.token;

    if (!token) {
        return res.redirect('/login');
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err || !decoded) {
            return res.redirect('/login');
        }
        req.user = decoded;
        next();
    });
}

module.exports = authenticate;
