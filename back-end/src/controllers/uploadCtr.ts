import { NextFunction, Request, Response } from 'express';
import {cloudinaryUploadImg, cloudinaryDeleteImg } from '../Util/cloudinary';
import asyncHandler from 'express-async-handler';

import fs from 'fs';









export const uploadImages = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {

    try {
      const uploader = (path: any) => cloudinaryUploadImg(path, "images");

      const urls = [];
    const files: any = req.files;
    for (const file of files) {
      const { path } = file;
      const newpath: any = await uploader(path);
      urls.push(newpath);
      
      fs.unlinkSync(path);
    }
      const images = urls.map((file) => {
        return file;
      });
      res.json(images)
    } catch (error) {
      next(error);
    }
  }
);


export const deleteImages = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const {id} = req.params;
    try {
      const deleted = cloudinaryDeleteImg(id, "images");

      res.json({ message: "Deleted"});
    } catch (error) {
      next(error);
    }
  }
);