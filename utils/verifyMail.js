const nodemailer = require("nodemailer")
const jwt = require("jsonwebtoken")

module.exports = {
    sendVerifyEmail: async (accData) => {
        const transport = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: "protagonist170@gmail.com",
                pass: "ijposjynemcdvhjs"
            }
        })

        const tokenVerify = await jwt.sign(accData.toJSON(), process.env.JWT_SECRET_KEY)


        const info = await transport.sendMail({
            from: "protagonist170@gmail.com",
            to: "bernardcalvin2000@gmail.com",
            subject: "Try Verify",
            text: "STUCKoverflow Verify",
            html: `<a href="http://localhost:3000/verifyEmail/${tokenVerify}">Click here to verify</a>`
        })

        console.log("Message Sent: %s", info.messageId)
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info))
    }
}