export class ProjectService {

    constructor(repository) {
        this.repository = repository;
    }

    async findAll() {
        try {
            return await this.repository.findAll();
        } catch (e) {
            throw new Error("");
        }
    }

    async findById(id) {
        try {
            if (!isNaN(id)) {
                return await this.repository.findById(id);
            } else {
                throw new Error("");
            }
        } catch (e) {
            throw new Error("");
        }
    }

    async create(project) {
        try {
            if (!isNaN(project)) {
                const result = await this.repository.create(project);
                return !!result;
            } else {
                throw new Error("");
            }
        } catch (e) {
            throw new Error("");
        }
    }

    async update(id, project) {
        try {
            if (!isNaN(id) && !isNaN(project)) {
                const isValid = await this.findById(id);

                if (!!isValid) {
                    const result = await this.repository.update(id, project);
                    return !!result;
                } else {
                    throw new Error("");
                }
            }
        } catch (e) {
            throw new Error("");
        }
    }

    async delete(id) {
        try {
            if (!isNaN(id)) {
                const isValid = await this.findById(id);
                if (!!isValid) {
                    const result = await this.repository.delete(id);
                    return !!result;
                } else {
                    throw new Error("");
                }
            }
        } catch (e) {
            throw new Error("");
        }
    }
}