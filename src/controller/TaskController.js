export class TaskController {

    constructor(service) {
        this.service = service;
    }

    async findAll(req, res, next) {
        try {
            const result = await this.service.findAll();
            return res.json(result);
        } catch (e) {
            next(e);
        }
    }

    async findById(req, res, next) {
        try {
            const { id } = req.params;
            const result = await this.service.findById(id);
            return res.json(result);
        } catch (e) {
            next(e)
        }
    }

    async findByProjectId(req, res, next) {
        try {
            const { projectId } = req.params;
            const result = await this.service.findByProjectId(projectId);
            return res.json(result);
        } catch (e) {
            next(e);
        }
    }

    async create(req, res, next) {
        try {
            const { title, description, status, priority } = req.body;
            const task = {
                title: title,
                description: description,
                status: status,
                priority: priority
            }
            const result = await this.service.create(task);
            return res.json(result);
        } catch (e) {
            next(e);
        }
    }

    async update(req, res, next) {
        try {
            const { id } = req.params;
            const { title, description, status, priority } = req.body;
            const task = {
                title: title,
                description: description,
                status: status,
                priority: priority
            }
            const result = await this.service.update(id, task);
            return res.json(result);
        } catch (e) {
            next(e);
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params;
            const result = await this.service.delete(id);
            return res.json(result);
        } catch (e) {
            next(e);
        }
    }
}