const multer = require("multer");
const path = require("path");
const moment = require("moment"); // moment library working with date and times

const allowedTypes = ["image/png", "image/jpg", "image/jpeg", "image/webp"];
// for category image inserting
// Multer is a middleware for handling multipart/form-data, which is primarily used for uploading files in Node.js applications
const storage = multer.diskStorage({
  // this specifies how files should be stored on disk
  destination: (req, file, cb) => {
    // destination function within diskStorage determines the directory where the uploaded files will be stored based on the fieldname of the file

    if (file.fieldname === "image") {
      cb(null, "uploads/profile/");
    } else if (file.fieldname === "category_image") {
      cb(null, "uploads/categories/");
    } else if (file.fieldname === "product_video") {
      cb(null, "uploads/products/");
    } else if (file.fieldname === "product_image") {
      cb(null, "uploads/productImages/");
    } else if (file.fieldname === "brand_image") {
      cb(null, "uploads/Brands/BrandImage/");
    } else if (file.fieldname === "brand_logo") {
      cb(null, "uploads/Brands/BrandLogo/");
    } else if (file.fieldname === "BannerImage") {
      cb(null, "uploads/banners/");
    }
  },
  filename: (req, file, cb) => {
    if (!allowedTypes.includes(file.mimetype)) {
      cb(new Error("Invalid File type!")); // explain in note.txt
    }
    // filename function determines the name of the file to be saved
    const ext = path.extname(file.originalname); // extracts original file extension
    // cb(null, Date.now() + ext); // constructs the new filename by appending the current timestamp to the file extension, ensuring a unique filename
    cb(null, `image-${Date.now()}${ext}`); // constructs the new filename by appending the current timestamp to the file extension, ensuring a unique filename

    // using moment (timestamp)
    // const timestamp=moment().format('YYYYMMDDHHmmss');
    // const ext=path.extname(file.originalname);
    // cb(null,`image-${timestamp}${ext}`)
  },
});

const upload = multer({
  storage: storage,
  fileFilter(req, file, cb) {
    // every time it's called when a file is uploaded
    if (file.size > 5 * 1024 * 1024) {
      return cb(new Error("File size exceeds 5MB"));
    }
    cb(null, true); // here true means indicate that the file is valid
  },
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
    files: 10, // maximum 10 files
    fields: Infinity, //  infinity non-file fields (default infinity)
  },
});
 // The upload constant is created using multer({storage: storage}), which initializes Multer with the defined storage configuration.

module.exports = upload;
