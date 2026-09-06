export class ProjectController {

    constructor(service) {
        this.service = service;
    }

    async findAll(req, res) {
        // GET /projects
        const result = await this.service.findAll();
        return res.json(result);

    }

    async findById(req, res) {
        // GET /projects/:id
        const { id } = req.params;
        const result = await this.service.findById(id);
        return res.json(result);

    }

    async create(req, res) {
        const { name, description } = req.body;
        const project = {
            name: name,
            description: description
        }

        const result = await this.service.create(project);
        return res.json(result);
    }

    async update(req, res) {
        // PUT /projects/:id
        const { id } = req.params;
        const { name, description } = req.body;
        const project = {
            name: name,
            description: description
        }

        const result = await this.service.update(id, project);
        return res.json(result);

    }

    async delete(req, res) {
        // DELETE /projects/:id
        const { id } = req.params;
        const result = await this.service.delete(id);
        return res.json(result);
    }
}