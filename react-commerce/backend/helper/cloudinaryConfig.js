const cloudinary=require("cloudinary").v2;

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET,  
});

const uploadImage=(filePath)=>{
    return cloudinary.uploader.upload(filePath)
}

module.exports={ cloudinary,uploadImage}