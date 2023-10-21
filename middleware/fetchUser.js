const jwt = require("jsonwebtoken")

const verifyToken = async (req, res, next) => {
    const token = req.cookies.accessToken
    if (!token) {
        return res.status(401).json("You are not authenticated")
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
        if (err) {
            return res.status(401).json("Token is not valid")
        }
        req.userId = data.id
        req.isAdmin = data.isAdmin
        req.didWork = data.didWork
        next()
    })
}
module.exports = verifyToken