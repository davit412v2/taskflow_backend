import { Router } from "express";
import pool from "../config/database.js";
import { ProjectRepository } from "../repository/ProjectRespository.js";
import { ProjectService } from "../service/ProjectService.js";
import { ProjectController } from "../controller/ProjectController.js";

const router = Router();

const repository = new ProjectRepository(pool);
const service = new ProjectService(repository);
const controller = new ProjectController(service);

router.get("/", controller.findAll.bind(controller));
router.get("/:id", controller.findById.bind(controller));
router.post("/", controller.create.bind(controller));
router.put("/:id", controller.update.bind(controller));
router.delete("/:id", controller.delete.bind(controller));

export default router;