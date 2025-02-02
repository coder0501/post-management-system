const multer = require("multer");
const path = require("path");

const fileUploadStorage = multer.diskStorage({
    destination: "./Files/",
    filename: (req, file, cb) => {
        console.log("file:", req.file, file)

        return cb(null, file.fieldname + "-" + Date.now() + "-" + path.extname(file.originalname));
    }
});

exports.fileUpload = multer({
    storage: fileUploadStorage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    }
}).single("file");

const checkFileType = (file, cb) => {
    const fileTypes = /pdf|jpg|doc|jpeg|png/;

    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());

    const mimeType = fileTypes.test(file.mimetype);
    
    // console.log("mimeType:", mimeType, "extname:", extname)
    if (mimeType && extname) {
        return cb(null, true);
    }
    else {
        return cb("Only Files are Allowed!")
    }
};