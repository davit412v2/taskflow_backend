import express from "express";
import projectRouter from "../src/routes/ProjectRouter.js";
import taskRouter from "../src/routes/TaskRouter.js";

const app = express();

app.use(express.json());

app.use("/projects", projectRouter);
app.use("/tasks", taskRouter);

export default app;