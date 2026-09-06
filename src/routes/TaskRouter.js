import { Router } from "express";
import  pool  from "../config/database.js";
import { TaskService } from "../service/TaskService.js";
import { TasksRepository } from "../repository/TasksRepository.js";
import { ProjectRepository } from "../repository/ProjectRespository.js";
import { TaskController } from "../controller/TaskController.js";


const router = Router()


const repository = new TasksRepository(pool);
const repositoryP = new ProjectRepository(pool);
const service = new TaskService(repository, repositoryP);
const controller = new TaskController(service);

router.get("/", controller.findAll.bind(controller));
router.get("/:id", controller.findById.bind(controller));
router.get("/project/:id", controller.findByProjectId.bind(controller));
router.post("/", controller.create.bind(controller));
router.patch("/:id", controller.update.bind(controller));
router.delete("/:id", controller.delete.bind(controller));

export default router;