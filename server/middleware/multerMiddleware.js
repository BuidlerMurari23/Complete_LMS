import multer from 'multer';
import path from 'path';

const upload = multer({
    dest: "uploads/",
    limits: { fileSize: 50 * 1024 * 1024}, // 50 MB max
    storage: multer.diskStorage({
        destination: "uploads/",
        filename: (_req, file, cb) => {
            cb(null, file.originalname);
        }
    }),
    fileFilter: (_req, file, cb) => {
        const ext = path.extname(file.originalname);

        if(
            ext !== ".png" &&
            ext !== ".jpg" &&
            ext !== ".jpeg" &&
            ext !== ".webp" &&
            ext !== ".mp4"
        ){
            cb(new Error(`Unsupported file type! ${ext}`, false))
        }

        cb(null, true);
    }
});

export default upload;