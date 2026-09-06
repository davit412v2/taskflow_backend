import express from "express";
import projectRouter from "../src/routes/ProjectRouter.js";
import taskRouter from "../src/routes/TaskRouter.js";
import AuthRouter from "../src/routes/AuthRouter.js";
import { errorMiddleware } from "./middleware/ErrorMiddleware.js";
import { authMiddleware } from "./middleware/AuthMiddleware.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173"
}));
app.use("/auth", AuthRouter);
app.use(authMiddleware);
app.use("/projects", projectRouter);
app.use("/tasks", taskRouter);
app.use(errorMiddleware);

export default app;
