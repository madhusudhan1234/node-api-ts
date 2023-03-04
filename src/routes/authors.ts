import express from "express";
import { ErrorHandler } from "../../utils/ErrorHandler";
import { AuthorsController } from "../controllers/AuthorsController";
import { FileUploader } from "../middlewares/FileUploader";

const router = express.Router();

const authorsController = new AuthorsController();

router.get("/", ErrorHandler.handleErrors(authorsController.getAuthors));
router.get("/:id", ErrorHandler.handleErrors(authorsController.getAuthor));
router.post(
  "/",
  FileUploader.upload("image", "authors", 2 * 1024 * 1024),
  ErrorHandler.handleErrors(authorsController.create)
);

export default router;
