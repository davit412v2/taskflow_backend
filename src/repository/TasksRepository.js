export class TasksRepository {

    constructor(pool) {
        this.pool = pool;
    };

    async findAll() {
        try {
            const result = await this.pool.query(`
        SELECT *
        FROM tasks;
        `);
            return result.rows;
        }
        catch (e) {
            throw new Error(`Error finding all task`);
        }
    }

    async findById(id) {
        try {
            const result = await this.pool.query(`
        SELECT * 
        FROM tasks
        WHERE id = $1;    
        `, [id]);
            return result.rows[0];
        }
        catch (e) {
            throw new Error("Error finding by id");

        }
    }

    async findByProjectId(projectId) {
        try {
            const result = await this.pool.query(`
            SELECT * 
            FROM tasks
            WHERE project_id = $1
            `, [projectId]);

            return result.rows;
        }
        catch (e) {
            throw new Error("Error finding by projectId");
        }
    }

    async create(task) {
        try {
            const result = await this.pool.query(`
        INSERT INTO tasks (
            project_id,
            title,
            description,
            status,
            priority
        )
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
    `, [
                task.projectId,
                task.title,
                task.description,
                task.status,
                task.priority
            ]);

            return result.rows[0];
        }
        catch (e) {
            throw new Error(`Error created task ${e}`);
        }
    }

    async update(id, task) {
        const fields = Object.keys(task);
        const values = Object.values(task);

        const set = fields
            .map((field, index) => `${field} = $${index + 1}`)
            .join(", ");

        values.push(id);

        const result = await this.pool.query(
            `UPDATE tasks
         SET ${set}
         WHERE id = $${values.length}
         RETURNING *`,
            values
        );

        return result.rows[0];
    }

    async delete(id) {
        try {
            const result = this.pool.query(`
            DELETE FROM tasks
            WHERE id = $1
            `, [
                id
            ]);

            return true;
        }
        catch (e) {
            return false;
        }
    }
}