import { AppError } from "../errors/AppError.js";
export class ProjectService {

    constructor(repository) {
        this.repository = repository;
    }

    async findAll() {
        const result = await this.repository.findAll();
        if (!result) {
            throw new AppError("No project were found", 404);
        }
        return result;
    }

    async findById(id) {
        const result = await this.repository.findById(id);
        if (!result) {
            throw new AppError("Project not found", 404);
        }
        return result;
    }

    async create(project) {
        const result = await this.repository.create(project);
        if (!result) {
            throw new AppError("The project was not created", 404);
        }
        return result;
    }

    async update(id, project) {
        const isValid = await this.findById(id);
        if (!!isValid) {
            const result = await this.repository.update(id, project);
            if (!result) {
                throw new AppError("The project was not update", 404);
            }
            return result;
        } else {
            throw new AppError("Project not found", 404);
        }
    }

    async delete(id) {
        const isValid = this.findById(id);
        if (!!isValid) {
            const result = await this.repository.delete(id);
            if (!result) {
                throw new AppError("The project was not delete", 404);
            }
            return result;
        } else {
            throw new AppError("Project not found", 404);
        }
    }
}