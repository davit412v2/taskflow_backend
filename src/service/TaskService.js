import { AppError } from "../errors/AppError.js";
export class TaskService {

    constructor(repository, projectRepository) {
        this.repository = repository;
        this.projectRepository = projectRepository;
    }

    async findAll() {
        const result = await this.repository.findAll();
        if (!result) {
            throw new AppError("No tasks were found.", 404);
        }
        return result;
    }

    async findById(id) {
        const result = await this.repository.findById(id);
        if (!result) {
            throw new AppError("Task not found", 404);
        }
        return result;
    }

    async findByProjectId(id) {
        let isProjectReady = await this.validProject(id);
        if (isProjectReady) {
            const result = await this.repository.findByProjectId(id)
            if (!result) {
                throw new AppError("Task not found");
            }
            return result;
        } else {
            throw new AppError("The project does not exist", 404);
        }

    }

    async create(task) {
        const result = await this.repository.create(task);
        if (!result) {
            throw new AppError("The task was not created", 404);
        }
        return result;
    }

    async update(id, task) {
        const isValid = await this.findById(id);
        if (!!isValid) {
            const result = await this.repository.update(id, task);
            if (!result) {
                throw new AppError("The task was not updated", 404);
            }
            return result;
        } else {
            throw new AppError("Task not found", 404);
        }
    }

    async delete(id) {
        const isValid = this.findById(id);
        if (!!isValid) {
            const result = await this.repository.delete(id);
            if (!result) {
                throw new AppError("The task was not delete", 404);
            }
            return result;
        } else {
            throw new AppError("Task not found", 404);
        }
    }

    async validProject(id) {
        const result = this.projectRepository.findById(id);
        return !!result;
    }
}