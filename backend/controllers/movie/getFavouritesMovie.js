import jwt from 'jsonwebtoken';
import UserModel from "../../models/userModel.js";

async function getFavouritesMovie(req, res) {
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
        const user = await UserModel.findOne({ email: decoded.user.email });
        if (!user || !user.favourites) {
            return res.status(200).json({
                qty: 0,
                success: true,
                msg: 'No movies found'
            });
        }
        return res.status(200).json({
            qty: user.favourites.length,
            success: true,
            favourites: user.favourites
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            msg: "Internal server error"
        });
    }
}

export default getFavouritesMovie;
