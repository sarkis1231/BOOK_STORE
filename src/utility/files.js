const multer = require('multer');
const path = require("path");
const util = require('util');
const fs = require('fs');

const fsAccessPromise = util.promisify(fs.access);
const fsMkdirPromise = util.promisify(fs.mkdir);


const FILE_TYPES = {
    'image/jpeg': 'image/jpeg',
    'image/png': 'image/png',
    'application/pdf': 'application/pdf'
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const path = 'src/uploads';

        fsAccessPromise(path).then(function () {
            // console.log('I only should work');
            cb(null, path);
        }).catch(function (err) {
            return fsMkdirPromise(path)
        }).then(function (mkdirData) {
            // console.log(mkdirData);
            // console.log('If catch is not there');
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