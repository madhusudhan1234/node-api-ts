import { Paginator } from "@/database/Paginator";
import { AppDataSource } from "@/database/data-source";
import { Book } from "@/database/entities/Book";
import { CreateBookDTO, UpdateBookDTO } from "@/http/dtos/BookDTO";
import { ResponseUtil } from "@/utils/Response";
import { validate } from "class-validator";
import { Request, Response } from "express";

export class BooksController {
  async get(req: Request, res: Response) {
    const builder = await AppDataSource.getRepository(Book)
      .createQueryBuilder("book")
      .leftJoinAndSelect("book.author", "author")
      .orderBy("book.id", "DESC");
    const { records: books, paginationInfo } = await Paginator.paginate(builder, req);
    const bookData = books.map((book: Book) => {
      return book.toPayload();
    });
    return ResponseUtil.sendResponse(res, "Fetched books successfully", bookData, paginationInfo);
  }

  async getBook(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const book = await AppDataSource.getRepository(Book).findOneByOrFail({
      id: Number(id),
    });

    return ResponseUtil.sendResponse<Partial<Book>>(res, "Fetched book successfully", book.toPayload(), null);
  }

  async create(req: Request, res: Response): Promise<Response> {
    const bookData = req.body;
    bookData.image = req.file?.filename;

    const dto = new CreateBookDTO();
    Object.assign(dto, bookData);
    dto.price = parseInt(bookData.price);
    dto.authorid = parseInt(bookData.authorid);

    const errors = await validate(dto);
    if (errors.length > 0) {
      return ResponseUtil.sendError(res, "Invalid data", 422, errors);
    }

    const repo = AppDataSource.getRepository(Book);
    const book = repo.create(bookData);

    await repo.save(book);

    return ResponseUtil.sendResponse(res, "Successfully created new book", book, null);
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const bookData = req.body;

    const dto = new UpdateBookDTO();
    Object.assign(dto, bookData);
    dto.id = parseInt(id);

    const errors = await validate(dto);
    if (errors.length > 0) {
      return ResponseUtil.sendError(res, "Invalid Data", 422, errors);
    }

    const repo = AppDataSource.getRepository(Book);
    const book = await repo.findOneByOrFail({
      id: Number(id),
    });

    repo.merge(book, bookData);
    await repo.save(book);

    return ResponseUtil.sendResponse(res, "Successfully updated the book", book.toPayload(), null);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const repo = AppDataSource.getRepository(Book);

    const book = await repo.findOneByOrFail({
      id: Number(id),
    });

    await repo.remove(book);
    return ResponseUtil.sendResponse(res, "Successfully deleted the book", null);
  }
}
