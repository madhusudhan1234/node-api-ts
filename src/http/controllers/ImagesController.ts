import { ResponseUtil } from "@/utils/Response";
import { NextFunction, Request, Response } from "express";
import fs from "fs";
import path from "path";

export class ImagesController {
  async get(req: Request, res: Response, next: NextFunction) {
    const { type, id } = req.params;
    const imageTypes = ["auhtors", "books"];

    if (!imageTypes.includes(type)) {
      return ResponseUtil.sendError(res, "Invalid Image Type", 500, null);
    }

    let filePath = path.join(__dirname, "../../../", "uploads", type, id);
    console.log(filePath);

    if (!fs.existsSync(filePath)) {
      return ResponseUtil.sendError(res, "Invalid Image", 404, null);
    }

    fs.readFile(filePath, (err, data) => {
      if (err) {
        return ResponseUtil.sendError(res, "Invalid Image / image read error", 404, null);
      }
      res.set("Content-Type", "image/jpeg");
      res.send(data);
    });
  }
}
