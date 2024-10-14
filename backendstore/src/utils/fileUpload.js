const cloudinary = require('cloudinary').v2

const uploadImageToCloudinary = async (file) => {
    try {
      const result = await cloudinary.uploader.upload(file.path);
      return result.secure_url;
    } catch (error) {
      throw new Error('Error uploading image to Cloudinary');
    }
  };

  module.exports = { uploadImageToCloudinary };
