// BES2402KM6017
// MUHAMMAD AMMAR IZZUDIN
// BEJS

const multer = require('multer');

const generateFileFilter = (mimetypes) => {
    return (req, file, callback) => {
        if (mimetypes.includes(file.mimetype)) {
            callback(null, true);
        } else {
            let err = new Error(`cuman file ${mimetypes} yang bisa di-upload!`);
            callback(err, false);
        }
    };
};

const maxSize = 5 * 1024 * 1024;

module.exports = {
    gambar: multer({
        fileFilter: generateFileFilter([
            'image/png',
            'image/jpg',
            'image/jpeg',
            'image/gif',
            'image/bmp',
            'image/webp',
            'image/svg+xml',
            'image/tiff'
        ]),

        // limits: { fileSize: maxSize },

        onError: (err, next) => {
            next(err);
        }
    })
};
