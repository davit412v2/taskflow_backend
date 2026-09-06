import jwt from "jsonwebtoken";

export function authMiddleware(req, res, next) {
    try {
        const authHeader = req.headers.authorization;

        const token = authHeader.split(" ")[1];

        const payload = jwt.verify(token, process.env.JWT_SECRET);

        req.user = payload;

        next();

    } catch (error) {
        return res.status(401).json({
            error: "Invalid or missing token"
        });
    }
}