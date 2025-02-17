import nodemailer from 'nodemailer';

async function SendMail({ to, subject, token }) {
    const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
            user: "whitney85@ethereal.email",
            pass: "8pbQEAkZkgnmZQe9SE",
        },
    });

    const mailOptions = {
        from: '"Prathamesh More" <maddison53@ethereal.email>',
        to,
        subject,
        text: `Here is your JWT Token: ${token}`,
        html: `<div className="flex flex-col items-center space-y-2 p-4 border rounded-lg">
            <p>Here is your JWT Token: <span className="font-mono bg-gray-200 p-1 rounded">${token}</span></p>
            <a 
            href="https://movie-explorer-app-tau.vercel.app/home/${token}" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
            Go to Website
            </a>
            </div>`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
}


export default SendMail;