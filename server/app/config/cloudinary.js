const cloudinary = require('cloudinary').v2;
require('dotenv').config()
cloudinary.config({
    cloud_name: "duci74a6p",
    api_key: "525823762996924",
    api_secret: "NyDe_4_HDnVrTmdHdHypmKhhZlQ",
    secure: true
});
module.exports = cloudinary;

