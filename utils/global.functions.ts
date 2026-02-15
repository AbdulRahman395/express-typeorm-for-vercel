// import crypto from "crypto";
// import Junk from '../models/junk.model';
// import pushBulkNotifications from "../config/firebase";
// import { Device } from "../models/devices.model";
// import User from "../models/user.model";
// import Notification from "../models/notification.model";

// // Generates a random OTP
// export const generateOTP = (): string => {
//     let otp = "";
//     while (otp.length < 6) {
//         const byte = crypto.randomBytes(1);
//         const digit = byte[0] % 10; // get a digit between 0-9
//         otp += digit.toString();
//     }
//     return otp;
// };

// // Marks an image as in use in the Junk table
// export const markImageInUse = async (imagePath?: string): Promise<void> => {
//     if (!imagePath) return;

//     await Junk.update(
//         { inUse: true },
//         { where: { path: imagePath } }
//     );
// };

// // Generate a random partner ID (7-digit number)
// export const generatePartnerId = (): number => {
//     let partnerId = "";
//     while (partnerId.length < 7) {
//         const byte = crypto.randomBytes(1);
//         const digit = byte[0] % 10; // get a digit between 0-9
//         partnerId += digit.toString();
//     }
//     return Number(partnerId);
// };

// // Generate a random order ID (7-digit number)
// export const generateOrderId = (): number => {
//     let orderId = "";
//     while (orderId.length < 7) {
//         const byte = crypto.randomBytes(1);
//         const digit = byte[0] % 10; // get a digit between 0-9
//         orderId += digit.toString();
//     }
//     return Number(orderId);
// };

// export const notifyAdmin = async (title: string, message: string, type: any, Ids: any, metadata: any, senderId: any) => {
//     try {

//         const notification = await Notification.create({
//             userId: null,
//             senderId: senderId ? parseInt(senderId) : null,
//             title: title,
//             message: message,
//             type: type,
//             isRead: false,
//             targeted: 'superAdmin',
//             isGlobal: false,
//             ...Ids,
//             metadata,
//         });

//         const users = await User.findAll({ where: { role: 'superAdmin' } });
//         const userIds = users.map((u) => u.id);

//         const devices = await Device.findAll({
//             where: { userId: userIds },
//             attributes: ['token'],
//         });

//         // Extract all tokens
//         const tokens = devices.map((d) => d.token).filter(Boolean);

//         if (tokens.length > 0) {
//             await pushBulkNotifications(tokens, title, message);
//         }
//         return notification;

//     } catch (error) {
//         console.log(error)
//     }
// }