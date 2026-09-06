import { Router } from "express";
import { AuthService } from "../service/AuthService.js";
import { AuthController } from "../controller/AuthController.js"


const router = Router();

const service = new AuthService();
const controller = new AuthController(service);

router.post("/", controller.login.bind(controller));

export default router;
