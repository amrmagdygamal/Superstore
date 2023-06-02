import asyncHandler from 'express-async-handler';
import validateEnv from '../Util/validateEnv';
import nodemailer from 'nodemailer';

interface EmailData {
  to: string;
  subject: string;
  text: string;
  html: string;
}

export const sendEmail = async (data: EmailData) => {

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: validateEnv.EMAIL_ID,
      pass: validateEnv.MP,
    },
  });

  const info = await transporter.sendMail({
    from: '"Hey 👻" abc@gmail.com',
    to: data.to,
    subject: data.subject,
    text: data.text,
    html: data.html,
  });

  console.log("Message sent: %s", info.messageId);

  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
};