import jwt from 'jsonwebtoken';

const UserMiddleware = (req, res, next) => {

    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            success: false,
            msg: "No token provided"
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            msg: "Invalid or expired token"
        });
    }
}

export default UserMiddleware;
