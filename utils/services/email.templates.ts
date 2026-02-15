// import OTP from "../../models/otp.model";
// import sendMail from "./send.mail";

// export const sendAccountVerificationEmail = async (
//   email: string,
//   otp: string
// ): Promise<boolean> => {
//   try {
//     const mailContent = `
//       <div style="font-family: Arial, sans-serif; color: #333; background-color: #f9f9f9; padding: 20px;">
//         <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
//           <h2 style="color: #1a73e8;">Welcome to Addvey</h2>
//           <p>Hello,</p>
//           <p>Thank you for signing up on <strong>Addvey</strong> — a modern dual-platform that bridges Users (demand) and Vendors (supply) across various services.</p>
//           <p>Your one-time verification code is:</p>
          
//           <div style="font-size: 24px; font-weight: bold; color: #1a73e8; margin: 20px 0; text-align: center;">
//             ${otp}
//           </div>

//           <p>This code will expire in 10 minutes. Do not share it with anyone.</p>

//           <p>If you did not request this account, feel free to ignore this message.</p>
          
//           <hr style="margin: 30px 0;" />

//           <p style="font-size: 14px; color: #666;">
//             Managed by the Addvey Admin Dashboard — enabling secure KYC, user/vendor onboarding, and real-time analytics.
//           </p>

//           <p style="font-size: 14px; color: #666;">
//             Need help? Contact our support team at 
//             <a href="mailto:support@addvey.com" style="color: #1a73e8;">support@addvey.com</a>
//           </p>

//           <div style="text-align: center; margin-top: 30px;">
//             <img src="https://addvey.com/wp-content/uploads/2025/05/addvey-brand-logo-main.png" alt="Addvey Logo" style="width: 100px;" />
//           </div>
//         </div>
//       </div>
//     `;

//     const isMailSent = await sendMail({
//       sendMailto: email,
//       mailSubject: 'Addvey – Your OTP Code',
//       mailHTMLBody: mailContent,
//     });

//     return isMailSent || false;
//   } catch (error) {
//     return false;
//   }
// };

// export const sendForgotPasswordOTP = async (
//   email: string,
//   resetLink: string
// ): Promise<boolean> => {
//   try {
//     const mailContent = `
//       <div style="font-family: Arial, sans-serif; color: #333; background-color: #f9f9f9; padding: 20px;">
//         <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
//           <h2 style="color: #1a73e8;">Reset Your Password</h2>
//           <p>Hello,</p>
//           <p>We received a request to reset your password for your <strong>Addvey</strong> account.</p>
//           <p>Click the button below to reset your password:</p>

//           <div style="text-align: center; margin: 20px 0;">
//             <a href="${resetLink}" style="display: inline-block; padding: 12px 24px; background-color: #1a73e8; color: #ffffff; text-decoration: none; border-radius: 6px; font-size: 16px;">
//               Reset Your Password
//             </a>
//           </div>

//           <p>This link will expire shortly. Please do not share it with anyone.</p>
//           <p>If you did not request a password reset, you can safely ignore this email.</p>

//           <hr style="margin: 30px 0;" />

//           <p style="font-size: 14px; color: #666;">
//             Managed by the Addvey Admin Dashboard — enabling secure KYC, user/vendor onboarding, and real-time analytics.
//           </p>

//           <p style="font-size: 14px; color: #666;">
//             Need help? Contact our support team at 
//             <a href="mailto:support@addvey.com" style="color: #1a73e8;">support@addvey.com</a>
//           </p>

//           <div style="text-align: center; margin-top: 30px;">
//             <img src="https://addvey.com/wp-content/uploads/2025/05/addvey-brand-logo-main.png" alt="Addvey Logo" style="width: 100px;" />
//           </div>
//         </div>
//       </div>
//     `;

//     const isMailSent = await sendMail({
//       sendMailto: email,
//       mailSubject: 'Addvey – Password Reset Request',
//       mailHTMLBody: mailContent,
//     });

//     return isMailSent || false;
//   } catch (error) {
//     console.error('Failed to send password reset email:', error);
//     return false;
//   }
// };

// export const sendResendOtpEmail = async (
//   email: string,
//   otp: string
// ): Promise<boolean> => {
//   try {
//     const mailContent = `
//       <div style="font-family: Arial, sans-serif; color: #333; background-color: #f9f9f9; padding: 20px;">
//         <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
//           <h2 style="color: #1a73e8;">Resend OTP</h2>
//           <p>Hello,</p>
//           <p>We received a request to resend your OTP for your <strong>Addvey</strong> account.</p>
//           <p>Your one-time password (OTP) to proceed with the reset is:</p>

//           <div style="font-size: 24px; font-weight: bold; color: #1a73e8; margin: 20px 0; text-align: center;">
//             ${otp}
//           </div>

//           <p>This code will expire in 10 minutes. Please do not share it with anyone.</p>
//           <p>If you did not request a password reset, you can safely ignore this email.</p>

//           <hr style="margin: 30px 0;" />

//           <p style="font-size: 14px; color: #666;">
//             Managed by the Addvey Admin Dashboard — enabling secure KYC, user/vendor onboarding, and real-time analytics.
//           </p>

//           <p style="font-size: 14px; color: #666;">
//             Need help? Contact our support team at 
//             <a href="mailto:support@addvey.com" style="color: #1a73e8;">support@addvey.com</a>
//           </p>

//           <div style="text-align: center; margin-top: 30px;">
//             <img src="https://addvey.com/wp-content/uploads/2025/05/addvey-brand-logo-main.png" alt="Addvey Logo" style="width: 100px;" />
//           </div>
//         </div>
//       </div>
//     `;

//     const isMailSent = await sendMail({
//       sendMailto: email,
//       mailSubject: 'Addvey – Resend OTP',
//       mailHTMLBody: mailContent,
//     });

//     return isMailSent || false;
//   } catch (error) {
//     console.error('Failed to send resend OTP email:', error);
//     return false;
//   }
// };

// export const verifyEmail = async (email: string, otp: string): Promise<boolean> => {
//   try {
//     const mailContent = `
//       <div style="font-family: Arial, sans-serif; color: #333; background-color: #f9f9f9; padding: 20px;">
//         <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
//           <h2 style="color: #1a73e8;">Verify Your Email Address</h2>
//           <p>Hello,</p>
//           <p>Thank you for signing up on <strong>Addvey</strong> — a modern dual-platform that bridges Users (demand) and Vendors (supply) across various services.</p>
//           <p>Your one-time verification code is:</p>
          
//           <div style="font-size: 24px; font-weight: bold; color: #1a73e8; margin: 20px 0; text-align: center;">
//             ${otp}
//           </div>

//           <p>This code will expire in 10 minutes. Do not share it with anyone.</p>

//           <hr style="margin: 30px 0;" />

//           <p style="font-size: 14px; color: #666;">
//             Managed by the Addvey Admin Dashboard — enabling secure KYC, user/vendor onboarding, and real-time analytics.
//           </p>

//           <p style="font-size: 14px; color: #666;">
//             Need help? Contact our support team at 
//             <a href="mailto:support@addvey.com" style="color: #1a73e8;">support@addvey.com</a>
//           </p>

//           <div style="text-align: center; margin-top: 30px;">
//             <img src="https://addvey.com/wp-content/uploads/2025/05/addvey-brand-logo-main.png" alt="Addvey Logo" style="width: 100px;" />
//           </div>
//         </div>
//       </div>
//     `;

//     const isMailSent = await sendMail({
//       sendMailto: email,
//       mailSubject: 'Addvey – Your OTP Code',
//       mailHTMLBody: mailContent,
//     });

//     return isMailSent || false;
//   } catch (error) {
//     return false;
//   }
// };