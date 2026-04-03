import multer from "multer";


const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, callback) => {
        callback(null, "app_" + Date.now() + "." + file.mimetype.split("/")[1]);
    }
})

class UploadImageService {
    public upload = multer({
        storage,
        fileFilter(req, file, callback) {
            const allowed = ["image/jpeg", "image/png", "image/gif", "image/jpg"];
            if (allowed.includes(file.mimetype)) {
                callback(null, true);
            } else {
                callback(new Error("Invalid file type"));
            }
        }
    });
}

export const uploadImageService = new UploadImageService();