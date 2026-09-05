export class TaskService {

    constructor(repository, projectRepository) {
        this.repository = repository;
        this.projectRepository = projectRepository;
    }

    async findAll() {
        try {
            return await this.repository.findAll();
        } catch (e) {
            throw new Error();
        }
    }

    async findById(id) {
        try {
            if (!isNaN(id)) {
                return await this.repository.findById(id);
            } else {
                throw new Error();
            }
        } catch (e) {
            throw new Error();
        }
    }

    async findByProjectId(id) {
        try {
            if (!isNaN(id)) {
                let isExistProject = await this.validProject(id);
                if (isExistProject) {
                    return await this.repository.findByProjectId(id)
                } else {
                    throw new Error("");
                }
            } else {
                throw new Error("");
            }

        } catch (e) {
            throw new Error();
        }

    }

    async create(task) {
        try {
            const result = await this.repository.create(task);
            return !!result;
        } catch (e) {
            throw new Error();
        }

    }

    async update(id, task) {
        try {
            const isValid = await this.findById(id);
            if (!!isValid) {
                const result = await this.repository.update(id, task);
                return !!result;
            } else {
                throw new Error("");
            }
        } catch (e) {
            throw new Error();
        }

    }

    async delete(id) {
        try {
            const isValid = this.findById(id);
            if (!!isValid) {
                return this.repository.delete(id);
            }
        } catch (e) {
            throw new Error();
        }

    }

    async validProject(id) {
        try {
            const result = this.projectRepository.findById(id);
            return !!result;
        } catch (e) {
            return false;
        }
    }
}