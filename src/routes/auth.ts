import express from "express";
import { AuthController } from "../http/controllers/AuthController";
import { ErrorHandler } from "../http/middlewares/ErrorHandler";

const router = express.Router();

const authController = new AuthController();

router.post("/register", ErrorHandler.catchErrors(authController.register));

export default router;
