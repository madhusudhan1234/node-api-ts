import { NextFunction, Request, Response } from "express";
import { ResponseUtil } from "../../../utils/Response";
import { Roles } from "../../constants/Role";

export class AdminMiddleware {
  static async check(req: Request, res: Response, next: NextFunction) {
    // @ts-ignore
    const user = req.user as User;
    if (user.role != Roles.ADMIN) {
      ResponseUtil.sendError(res, "Unauthorized", 403, null);
    }
    next();
  }
}
