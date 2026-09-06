export class TaskController {

    constructor(service) {
        this.service = service;
    }

    async findAll(req, res) {
        const result = await this.service.findAll();
        return res.json(result);
    }

    async findById(req, res) {
        const { id } = req.params;
        const result = await this.service.findById(id);
        return res.json(result);
    }

    async findByProjectId(req, res) {
        const { projectId } = req.params;
        const result = await this.service.findByProjectId(projectId);
        return res.json(result);
    }

    async create(req, res) {
        const { title, description, status, priority } = req.body;
        const task = {
            title: title,
            description: description,
            status: status,
            priority: priority
        }

        const result = await this.service.create(task);
        return res.json(result);
    }

    async update(req, res) {
        // PUT /task/:id
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

    }

    async delete(req, res) {
        // DELETE /task/:id
        const { id } = req.params;
        const result = await this.service.delete(id);
        return res.json(result);
    }
}