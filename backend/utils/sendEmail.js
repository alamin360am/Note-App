import nodemailer from "nodemailer";

export const sendOtpToEmail = async (email, template) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"Note App" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Your OTP for signup",
    html: template
  };

  await transporter.sendMail(mailOptions);
};