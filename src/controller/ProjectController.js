export class ProjectController {

    constructor(service) {
        this.service = service;
    }

    async findAll(req, res, next) {
        try {
            const result = await this.service.findAll();
            return res.json(result);
        } catch (e) {
            next(e)
        }
    }

    async findById(req, res, next) {
        try {
            const { id } = req.params;
            const result = await this.service.findById(id);
            return res.json(result);
        } catch (e) {
            console.log(`Error ${e}`);
            next(e);
        }
    }

    async create(req, res, next) {
        try {
            const { name, description } = req.body;
            const project = {
                name: name,
                description: description
            }

            const result = await this.service.create(project);
            return res.json(result);
        } catch (e) {
            next(e);
        }
    }

    async update(req, res, next) {
        try {
            const { id } = req.params;
            const { name, description } = req.body;
            const project = {
                name: name,
                description: description
            }
            const result = await this.service.update(id, project);
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