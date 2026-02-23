const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // Authentication Bypass: Allowing all requests for direct access
    req.userData = { userId: 'bypass', username: 'admin' };
    next();
};
