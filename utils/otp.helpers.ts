// import { Transaction } from 'sequelize';
// import OTP from '../models/otp.model';

// export const otpRecord = async (
//     userId: number,
//     type: 'email' | 'phone',
//     otp: string,
//     transaction?: Transaction
// ): Promise<void> => {
//     const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

//     await OTP.update(
//         { isUsed: true },
//         {
//             where: {
//                 userId,
//                 type,
//                 isUsed: false,
//             },
//             transaction
//         }
//     );

//     await OTP.create({
//         userId,
//         otp,
//         type,
//         isUsed: false,
//         expiresAt,
//     }, { transaction });
// };