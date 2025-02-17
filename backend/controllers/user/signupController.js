import UserModel from "../../models/userModel.js";
import SendMail from "../../utils/sendMail.js";
import { getToken } from '../../utils/jwtToken.js';

async function UserSignUpController(req, res) {
    const { name, email } = req.body;

    if (!email || !name) {
        return res.status(400).json({
            success: false,
            msg: "Name & email cannot be null"
        });
    }

    try {
       
        const userExists = await UserModel.findOne({ email: email });
        if (userExists) {
            return res.status(400).json({
                success: false,
                msg: "User already exists"
            });
        }

        
        const newUser = new UserModel({
            name: name,
            email: email
        });

       
        await newUser.save();

     
        const token = getToken({ id: newUser.id, name: newUser.name, email: newUser.email });

       
        await SendMail({
            to: email,
            subject: "Sign Up To Movie App",
            token: token
        });

        
        return res.status(200).json({
            success: true,
            msg: "Mail sent successfully",
        });

    } catch (error) {
        console.error(error); 
        return res.status(500).json({
            success: false,
            msg: "Internal server error"
        });
    }
}

export default UserSignUpController;
