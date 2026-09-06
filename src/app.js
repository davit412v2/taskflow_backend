import express from "express";
import projectRouter from "../src/routes/ProjectRouter.js";
import taskRouter from "../src/routes/TaskRouter.js";
import { errorMiddleware } from "./errors/ErrorMiddleware.js";


const app = express();

app.use(express.json());

app.use("/projects", projectRouter);
app.use("/tasks", taskRouter);
app.use(errorMiddleware);

export default app;