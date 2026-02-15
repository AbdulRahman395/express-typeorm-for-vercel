// import multer, { FileFilterCallback } from 'multer';
// import path from 'path';
// import fs from 'fs';
// import { Request } from 'express';

// const uploadsPath = path.join(__dirname, '../uploads');
// if (!fs.existsSync(uploadsPath)) {
//     fs.mkdirSync(uploadsPath, { recursive: true });
// }

// const storage = multer.diskStorage({
//     destination: (_req, _file, cb) => {
//         cb(null, uploadsPath);
//     },
//     filename: (_req, file, cb) => {
//         const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
//         const ext = path.extname(file.originalname);
//         cb(null, `${uniqueSuffix}${ext}`);
//     },
// });

// const fileFilter = (
//     _req: Request,
//     _file: Express.Multer.File,
//     cb: FileFilterCallback
// ) => {
//     cb(null, true);
// };

// export const upload = multer({
//     storage,
//     fileFilter,
//     limits: {
//         fileSize: 100 * 1024 * 1024,
//     },
// });
