import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import path from 'path';
import sharp from 'sharp';

import fs from 'fs';


const multerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../public/images/'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.jpeg');
  },
});

const multerFilter = (
  req: any,
  file: any,
  cb: any
) => {
  if (file.mimetype.startsWith('image/webp')) {
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


export const uploadPhoto = multer({
  storage: multerStorage,

  fileFilter: multerFilter,
  limits: {
    fileSize: 1000000,
  },
});

export const productImgResize = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  if (!req.files || !Array.isArray(req.files)) {
    return next();
  }

  await Promise.all(
    req.files.map(async (file) => {
      if (file.mimetype === 'image/webp') {
        // Convert webp image to jpeg
        const convertedFile = `${file.path}.jpeg`;
        await sharp(file.path)
          .jpeg({ quality: 90 })
          .toFile(convertedFile);
        file.path = convertedFile;
      }
      await sharp(file.path)
        .resize(400, 400)
        .toFormat('jpeg')
        .jpeg({ quality: 90 }) 
        .toFile(`public/images/products/${file.filename}`);
      fs.unlinkSync(`public/images/products/${file.filename}`);
    })
  );

  next();
};


export const blogImgResize = async (req: Request, res: Response, next: NextFunction): Promise<any> => {

  if (!req.files || !Array.isArray(req.files)) {
    return next();
  }

  await Promise.all(
    req.files.map(async (file) => {
      if (file.mimetype === 'image/webp') {
        // Convert webp image to jpeg
        const convertedFile = `${file.path}.jpeg`;
        await sharp(file.path)
          .jpeg({ quality: 90 })
          .toFile(convertedFile);
        file.path = convertedFile;
      }
      await sharp(file.path)
      .resize(400, 400)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`public/images/blogs/${file.filename}`);
    fs.unlinkSync(`public/images/blogs/${file.filename}`)
    })
  )
  next();

}