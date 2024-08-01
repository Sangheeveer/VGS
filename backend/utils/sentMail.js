const nodemailer=require('nodemailer');

const sendmail=async (data)=>{
    const transporter=nodemailer.createTransport(
        {
            service:"gmail",
            //port:597,
            //secure:false,
            auth:{
                user:'veerpuppala@gmail.com',
                pass:'wsokwjzjrvyeshje'
            }
        }
    )

    const emailOptions={
        from:'veerpuppala@gmail.com',
        to:data.email,
        subject:data.subject,
        text:data.message,
    }

    const info = await transporter.sendMail(emailOptions);
    console.log("Message sent: %s", info.messageId);

};

module.exports=sendmail;