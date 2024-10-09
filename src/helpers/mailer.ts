import User from '@/models/userModel';
import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs';
export const sendEmail = async({email,emailType,userId}:any) => {
    try{
        const hashedToken = await bcryptjs.hash(userId.toString(),10)
        console.log("MAIL",userId);
        console.log("EMAIL TYPE",emailType);
        console.log(typeof emailType);

        if(emailType === "VERIFY") {
            console.log("verify section");
            const Updateduser =await User.findByIdAndUpdate(userId,{$set:{verifyToken:hashedToken,verifyTokenExpiry:Date.now()+3600000}});
            console.log("updated user for verify",Updateduser);
        }else if(emailType === "RESET"){
            await User.findByIdAndUpdate(userId,{$set:{forgotPasswordToken:hashedToken,forgotPassowrdTokenExpiry:Date.now()+3600000}});
        }

        console.log("out side of else");

        
        var transport = nodemailer.createTransport({
            host:"sandbox.smtp.mailtrap.io",
            port: 2525,
            secure: true,
            auth: {
                user:"9b668d322fecb3",
                pass:"********85ec"
            }
        });

        const mailOptions = {
            from:"shreyash@shreyash.ai",
            to:email,
            subject: emailType == 'VERIFY' ?"verify your email":"reset your password",
            html:'<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a>to $ {emailType === "VERIFY"? "verify your email":"reset your password"}or copy and paste the link in your browser</br>${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>',
        }
        const mailResponse =await transport.sendMail
        (mailOptions);
        return mailResponse;
    } catch(error:any) {
        throw new Error(error.message);
    }
}