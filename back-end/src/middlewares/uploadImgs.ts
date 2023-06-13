import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import path from 'path';
import sharp from 'sharp';
import fs from 'fs';

// Define the storage engine configuration for uploaded files
const multerStorage = multer.diskStorage({
  // Set the destination directory for uploaded files
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/images'));
  },
  // Set the filename for uploaded files
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.jpeg');
  },
});

const multerFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: any
) => {
  // Check if the uploaded file is an image
  if (file.mimetype.startsWith('image')) {
    cb(null, true); // Accept the file
  } else {
    cb(
      {
        message: 'Unsupported file format',
      },
      false
    );
  }
};

// Define the middleware function for handling file uploads
export const uploadPhoto = multer({
  // multerStorage define how files should be stored
  storage: multerStorage,

  fileFilter: multerFilter,
  limits: {
    // limit the size of files that can be uploaded.to 2mb
    fileSize: 1000000,
  },
});

export const productImgResize = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  // Check if any files were uploaded
  if (!req.files || !Array.isArray(req.files)) {
    // If no files were uploaded or req.files is not an array, move on to the next middleware in the chain
    return next();
  }

  // Use Promise.all to process each uploaded file in parallel
  await Promise.all(
    // Map over each uploaded file
    req.files.map(async (file) => {
      // Use Sharp to resize the image to 300x300 pixels and convert it to JPEG format with a quality of 90%
      await sharp(file.path)
        .resize(300, 300)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        // Save the resized image to a separate folder called "products" that is located in the "public/images" folder
        .toFile(`public/images/products/${file.fieldname}.jpeg`);
      fs.unlinkSync(`public/images/products/${file.fieldname}.jpeg`)
    })
  );

  // Call the "next" function to move on to the next middleware in the chain
  next();
};


export const blogImgResize = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

  if (!req.files || !Array.isArray(req.files)) {
    return next();
  }

  await Promise.all(
    req.files.map(async (file) => {
      await sharp(file.path)
      .resize(200, 200)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`public/images/blogs/${file.fieldname}.jpeg`);
    fs.unlinkSync(`public/images/blogs/${file.fieldname}.jpeg`)
    })
  )

}