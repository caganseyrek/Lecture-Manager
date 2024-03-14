const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const authHeader = req.headers.Auth
    const token = authHeader && authHeader.split(' ')[1]
    if (token) {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_KEY)
        req.userData = decoded
    }
    next()
}