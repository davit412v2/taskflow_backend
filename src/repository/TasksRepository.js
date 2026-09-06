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
        console.log(`==id ${projectId}`);
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

        try {
            const result = await this.pool.query(`
            UPDATE tasks
            SET title = $1,
            description = $2,
            status = $3,
            priority = $4
            WHERE id = $5
            RETURNING *;
            `, [
                task.title,
                task.description,
                task.status,
                task.priority,
                id
            ]);

            return result.rows[0];
        }
        catch (e) {
            throw new Error("Error Update task");
        }

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