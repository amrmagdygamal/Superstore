import { NextFunction, Request, Response } from 'express';
import {cloudinaryUploadImg, cloudinaryDeleteImg } from '../Util/cloudinary';
import asyncHandler from 'express-async-handler';

import fs from 'fs';









export const uploadImages = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {

    try {
      const uploader = (path: any) => cloudinaryUploadImg(path, "images");

      const urls = [];
      const files = req.files;
      if (Array.isArray(files)) {
        for (const file of files) {
          const { path } = file;
          const newPath = await uploader(path);
          urls.push(newPath);
          fs.unlinkSync(path);
        }
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
      const deleted = cloudinaryDeleteImg(id, "imgages");

      res.json({ message: "Deleted"});
    } catch (error) {
      next(error);
    }
  }
);