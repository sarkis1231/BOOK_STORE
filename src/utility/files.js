const multer  = require('multer');
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/uploads');
    },
    filename: (req, file, cb) => {
        console.log(file); //TODO check the path error
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    //TODO util object json format
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'application/pdf') {
        return cb(null, true);
    }

    cb(null, false);
};

//re use in middlewares
const upload = multer({ storage: storage, fileFilter: fileFilter });

module.exports = upload;