import validateEnv from './validateEnv';
import { v2 as cloudinary } from "cloudinary";
cloudinary.config({
  cloud_name: validateEnv.CLOUD_NAME,
  api_key: validateEnv.API_KEY,
  api_secret: validateEnv.API_SECRET,
});




export const cloudinaryUploadImg = async (fileToUploads: any,folderName: string) => {
  return new Promise((resolve: any) => {
    cloudinary.uploader.upload(fileToUploads, (result:any) => {
      resolve(
        {
          url: result?.secure_url,
          asset_id: result?._id,
          public_id: result?.public_id
        },
        {
          resource_type: "auto",
          folder: folderName,
        }
      );
    });
  });
};


export const cloudinaryDeleteImg = async (fileToDelete: any,folderName: string) => {
  return new Promise((resolve: any) => {
    cloudinary.uploader.destroy(fileToDelete, (result: any) => {
      resolve(
        {
          url: result?.secure_url,
          asset_id: result?._id,
          public_id: result?.public_id
        },
        {
          resource_type: "auto",
          folder: folderName,
        }
      );
    });
  });
};