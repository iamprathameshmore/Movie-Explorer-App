import { UserModel } from "../../models/userModel";
import SendMail from "../../utils/sendMail.js"
import getToken from '../../utils/jwtToken.js'

async function UserLogInController(req, res) {
    const { email } = req.body

    if (!email) return res.status(400).json({
        success: false,
        msg: "email not be null"
    });


    try {
        const user = await UserModel.findOne({ email: email })
        if (!user) return res.status(400).json({
            success: false,
            msg: "please signup first"
        });

        const token = getToken({ id: user.id, name: user.name, email })

        await SendMail({
            to: email,
            subject: "login To movie App",
            token: token

        })

        return res.status(200).json({
            success: true,
            msg: "mail send successfully",
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: "internal server error"
        });


    }

}

export default UserLogInController;