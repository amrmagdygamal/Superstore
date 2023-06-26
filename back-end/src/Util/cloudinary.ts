
import { v2 as cloudinary } from 'cloudinary';
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export const cloudinaryUploadImg = async (fileToUploads: any, folderName: any) => {
  return new Promise((resolve: any) => {
    cloudinary.uploader.upload(fileToUploads, {
      resource_type: "auto",
      folder: folderName
    }, (error: any, result: any) => {
      if (error) {
        console.log(error);
        resolve({}); // Return an empty object to indicate failure
      } else {
        resolve({
          url: result?.secure_url,
          asset_id: result?.asset_id,
          public_id: result?.public_id,
        });
      }
    });
  });
};


export const cloudinaryDeleteImg = async (
  fileToDelete: any,
  folderName: any
) => {
  return new Promise((resolve: any) => {
    cloudinary.uploader.destroy(
      fileToDelete,
      {
        
        resource_type: 'auto',
      },
      (error: any, result: any) => {
        if(error) {
          console.log(error)
        } else {

          resolve(
            {
              url: result?.secure_url,
              asset_id: result?.asset_id,
              public_id: result?.public_id,
            }
          );
        }
      }
    );
  });
};
