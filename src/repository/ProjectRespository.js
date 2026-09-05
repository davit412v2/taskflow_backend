export class ProjectRepository {

    constructor(pool) {
        this.pool = pool;
    }

    async findAll() {
        try {
            const result = await this.pool.query(`
                SELECT * 
                FROM projects;
                `);
            return result.rows;
        } catch (e) {
            throw new Error("Error finding all");
        }
    }

    async findById(id) {
        try {
            const result = await this.pool.query(`
                SELECT * 
                FROM projects
                WHERE id = $1;
                `, [id]);

            return result.rows[0];
        } catch (e) {
            throw new Error("Error finding by id");
        }
    }

    async create(project) {
        try {
            const result = await this.pool.query(`
                INSERT INTO projects
                (name, description)
                VALUES ($1, $2)
                RETURNING *;
                `, [project.name, project.description]);
            return result.rows[0];
        } catch (e) {
            throw new Error("Error created project");
        }
    }

    async update(id, project) {
        try {
            const result = await this.pool.query(`
                UPDATE projects
                SET name = $1,
                description = $2
                WHERE id = $3
                RETURNING *;
                `, [
                project.name,
                project.description,
                id
            ]);
            return result.rows[0];
        } catch (e) {
            throw new Error("Error update project");
        }
    }

    async delete(id) {
        try {
            const result = await this.pool.query(`
                DELETE FROM projects
                WHERE id = $1;
                `, [id]);
            return result.rowCount > 0;
        } catch (e) {
            return false;
        }
    }
}