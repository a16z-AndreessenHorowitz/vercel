const cloudinary = require('cloudinary').v2
const streamifier = require('streamifier')

//cấu hình cloud 
cloudinary.config({ 
cloud_name: process.env.CLOUD_NAME,
api_key: process.env.CLOUD_KEY,
api_secret: process.env.CLOUD_SECRET,
});
//hết cấu hình

module.exports.upload=(req, res, next)=> {
  if(req.file){
    let streamUpload = (req) => {
      return new Promise((resolve, reject) => {
        let stream = cloudinary.uploader.upload_stream(
          (error, result) => {
            if (result) {
              resolve(result);
            } else {
              reject(error);
            }
          }
        );

        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
    };

    async function upload(req) {
      let result = await streamUpload(req);
      req.body[req.file.fieldname]=result.secure_url;// fieldname đại diện cho thumbnail niếu người dùng đổi tên
      //Gán xong data r next, hàm này async r ko lo
      next()
    }
    upload(req);
    ///next() để next dưới này không ăn thua
  }else{
    next()
  }
  
}