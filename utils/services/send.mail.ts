// import nodemailer, { SentMessageInfo } from 'nodemailer';
// import dotenv from 'dotenv';
// import { message } from '../response.constants';

// dotenv.config();

// interface SendMailParams {
//     sendMailto: any;
//     mailSubject: string;
//     mailHTMLBody: string;
// }

// async function sendMail({
//     sendMailto,
//     mailSubject,
//     mailHTMLBody
// }: SendMailParams): Promise<boolean> {
//     try {
//         const transporter = nodemailer.createTransport({
//             service: 'gmail',
//             port: 587,
//             secure: false,
//             auth: {
//                 user: process.env.MAIL_FROM,
//                 pass: process.env.MAIL_PASSKEY,
//             },
//             tls: {
//                 rejectUnauthorized: false,
//             },
//         });

//         const info: SentMessageInfo = await transporter.sendMail({
//             from: `"noreply" <${process.env.MAIL_FROM}>`,
//             to: sendMailto,
//             subject: mailSubject,
//             text: mailSubject,
//             html: mailHTMLBody,
//         });
//         console.log(`✅ ${message.emailSent} to ${sendMailto} about ${mailSubject}`);
//         return true;
//     } catch (error: any) {
//         console.error(`>>>>$$$$ Error Sending Mail to ${sendMailto} about ${mailSubject}, Error: ${error?.message}`, error);
//         return false;
//     }
// }

// export default sendMail;


import dotenv from 'dotenv';
const SibApiV3Sdk: any = require("sib-api-v3-sdk");
import { message } from '../response.constants';

dotenv.config();

interface SendMailParams {
    sendMailto: any;
    mailSubject: string;
    mailHTMLBody: string;
}

async function sendMail({
    sendMailto,
    mailSubject,
    mailHTMLBody
}: SendMailParams): Promise<boolean> {
    try {
        // Setup Brevo client
        const defaultClient = SibApiV3Sdk.ApiClient.instance;
        const apiKey = defaultClient.authentications['api-key'];
        apiKey.apiKey = process.env.BREVO_API_KEY as string;

        const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

        // Prepare email
        const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
        sendSmtpEmail.sender = { name: "Addvey", email: "no-reply@addvey.com" };
        sendSmtpEmail.to = [{ email: sendMailto }];
        sendSmtpEmail.subject = mailSubject;
        sendSmtpEmail.htmlContent = mailHTMLBody;

        // Send email
        const data = await apiInstance.sendTransacEmail(sendSmtpEmail);

        console.log(`✅ ${message.emailSent} to ${sendMailto} about ${mailSubject}`);
        return true;
    } catch (error: any) {
        console.error(
            `>>>>$$$$ Error Sending Mail to ${sendMailto} about ${mailSubject}, Error: ${error?.message}`,
            error
        );
        return false;
    }
}

export default sendMail;
