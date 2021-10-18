const multer = require('multer');
const path = require("path");
const util = require('util');
const fs = require('fs');

const fsMkdirPromise = util.promisify(fs.mkdir);


const FILE_TYPES = {
    'image/jpeg': 'image/jpeg',
    'image/png': 'image/png',
    'application/pdf': 'application/pdf'
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const path = 'src/uploads';
        // directory does not exist create otherwise save
        fsMkdirPromise(path, {recursive: true})
            .then(function () {
                cb(null, path);
            }).catch(function (err) {
            console.log(err);
        });

    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${path.extname(file.originalname)}`);
    }
});

const fileFilter = (req, file, cb) => {
    if (!!FILE_TYPES[file.mimetype]) {
        return cb(null, true);
    }

    cb(null, false);
};

//re use in middlewares
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 50 * 1024 * 1024 //Maximum file size is 10MB
    }
});

module.exports = upload;