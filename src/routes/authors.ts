import express from "express";
import { AuthorsController } from "../http/controllers/AuthorsController";
import { ErrorHandler } from "../http/middlewares/ErrorHandler";
import { FileUploader } from "../http/middlewares/FileUploader";

const router = express.Router();

const authorsController = new AuthorsController();

router.get("/", ErrorHandler.catchErrors(authorsController.getAuthors));
router.get("/:id", ErrorHandler.catchErrors(authorsController.getAuthor));
router.post(
  "/",
  FileUploader.upload("image", "authors", 2 * 1024 * 1024),
  ErrorHandler.catchErrors(authorsController.create)
);
router.put("/:id", ErrorHandler.catchErrors(authorsController.update));
router.delete("/:id", ErrorHandler.catchErrors(authorsController.delete));

export default router;
