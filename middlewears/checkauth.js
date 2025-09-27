import jwt from "jsonwebtoken"

export const authCheck = (req, res, next) => {
    try {
        let token = req.cookies.token
        if (!token) {
            res.status(401).json({ message: "User is not Authenticated" })
        }
        let decoded = jwt.verify(token, process.env.JWT)
        req.userId = decoded.id
        next()
    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
}