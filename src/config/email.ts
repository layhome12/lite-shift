import nodemailer, { Transporter } from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const email: Transporter = nodemailer.createTransport({
  name: process.env.MAILER_NAME,
  host: process.env.MAILER_HOST,
  port: parseInt(process.env.MAILER_PORT ? process.env.MAILER_PORT : ""),
  auth: {
    user: process.env.MAILER_USER,
    pass: process.env.MAILER_PASS,
  },
});

export default email;
