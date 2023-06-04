import validateEnv from './validateEnv';
import { v2 as cloudinary } from "cloudinary";
cloudinary.config({
  cloud_name: validateEnv.CLOUD_NAME,
  api_key: validateEnv.API_KEY,
  api_secret: validateEnv.API_SECRET,
});




export const cloudinaryUploadImg = async (fileToUploads: string) => {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(fileToUploads, (result) => {
      resolve(
        {
          url: result?.secure_url,
          asset_id: result?._id,
          public_id: result?.public_id
        }
      );
    });
  });
};


export const cloudinaryDeleteImg = async (fileToDelete: string) => {
  return new Promise((resolve) => {
    cloudinary.uploader.destroy(fileToDelete, (result) => {
      resolve(
        {
          url: result?.secure_url,
          asset_id: result?._id,
          public_id: result?.public_id
        }
      );
    });
  });
};