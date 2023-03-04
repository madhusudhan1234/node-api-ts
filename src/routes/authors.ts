import express from "express";
import { ErrorHandler } from "../../utils/ErrorHandler";
import { AuthorsController } from "../controllers/AuthorsController";

const router = express.Router();

const authorsController = new AuthorsController();

router.get("/", ErrorHandler.handleErrors(authorsController.getAuthors));
router.get("/:id", ErrorHandler.handleErrors(authorsController.getAuthor));

export default router;
