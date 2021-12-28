const crypto = require("crypto");
const cloudinary = require("cloudinary");


cloudinary.config({
    
    cloud_name: "manvirm",
    api_key: "596947456331528",
    api_secret: process.env.CLOUDINARY_SECRET
    
    
});

const cloudinaryStorage = require("multer-storage-cloudinary");
const storage = cloudinaryStorage({
  cloudinary,
  folder: 'sell-text-profile',
  transformation: [ {angle: 0, width: 150, height: 160, radius: "max", crop: "scale", type: "facebook"} ],
  allowedformats: ['jpeg', 'jpg', 'png'], 
  filename: function (req, file, cb){
      let buf = crypto.randomBytes(16);
      buf = buf.toString('hex');
      let uniqFileName = file.originalname.replace(/\.jpeg|\.jpg|\.png/ig, '');
      uniqFileName += buf;
      cb(undefined, uniqFileName);
  }
});

module.exports = {
    cloudinary,
    storage
}