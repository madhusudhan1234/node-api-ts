import { Request, Response } from "express";
import { ResponseUtil } from "../../utils/Response";
import { AppDataSource } from "../database/data-source";
import { Paginator } from "../database/paginator";
import { Author } from "../entities/Author";

export class AuthorsController {
  async getAuthors(req: Request, res: Response) {
    const builder = await AppDataSource.getRepository(Author).createQueryBuilder().orderBy("id", "DESC");
    const { records: authors, paginationInfo } = await Paginator.paginate(builder, req);
    return ResponseUtil.sendResponse(res, "Fetched authors successfully", authors, paginationInfo);
  }

  async getAuthor(req: Request, res: Response) {
    const { id } = req.params;
    const author = await AppDataSource.getRepository(Author).findOneByOrFail({
      id: Number(id),
    });

    return ResponseUtil.sendResponse<Author>(res, "Fetched author successfully", author);
  }
}
