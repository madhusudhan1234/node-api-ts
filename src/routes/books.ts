import express from "express";
import { BooksController } from "../http/controllers/BooksController";
import { AdminMiddleware } from "../http/middlewares/AdminMiddleware";
import { AuthMiddleware } from "../http/middlewares/AuthMiddleware";
import { ErrorHandler } from "../http/middlewares/ErrorHandler";
import { FileUploader } from "../http/middlewares/FileUploader";

const router = express.Router();

const booksController = new BooksController();

router.get("/", ErrorHandler.catchErrors(booksController.get));
router.get("/:id", ErrorHandler.catchErrors(booksController.getBook));
router.post(
  "/",
  ErrorHandler.catchErrors(AuthMiddleware.authenticate),
  ErrorHandler.catchErrors(AdminMiddleware.check),
  FileUploader.upload("image", "books", 2 * 1024 * 1024),
  ErrorHandler.catchErrors(booksController.create)
);
router.put(
  "/:id",
  ErrorHandler.catchErrors(AuthMiddleware.authenticate),
  ErrorHandler.catchErrors(AdminMiddleware.check),
  ErrorHandler.catchErrors(booksController.update)
);
router.delete(
  "/:id",
  ErrorHandler.catchErrors(AuthMiddleware.authenticate),
  ErrorHandler.catchErrors(AdminMiddleware.check),
  ErrorHandler.catchErrors(booksController.delete)
);

export default router;
