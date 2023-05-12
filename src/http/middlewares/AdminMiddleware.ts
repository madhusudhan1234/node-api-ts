import { NextFunction, Request, Response } from "express";
import { Roles } from "../../constants/Role";
import { ResponseUtil } from "../../utils/Response";

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
