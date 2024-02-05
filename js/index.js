// Kontakt forma
const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: 'gmail.com',
    auth: {
        user: 'megi.markovinovic@gmail.com',
        pass: '20120778'
    }
});
let mailOptions = {
    from: document.querySelector("#email"),
    to: "megi.markovinovic@gmsil.com",
    subject: "Neka poruka",
    text: "Bok megi!"
}
transporter.sendMail(mailOptions, (err, info) => {
    if(err){
        console.log("Error: " + err);
    }else{
        console.log("Email je uspješno poslan a email: " + mailOptions.to);
    }
});
