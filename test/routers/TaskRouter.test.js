import app from "../../src/app.js";
import request from "supertest";
import jwt from "jsonwebtoken";


describe("TaskRouter", () => {

    const token = jwt.sign(
        { id: 1 },
        process.env.JWT_SECRET
    );

    test("GET /tasks/ returns all tasks", async () => {
        const response = await request(app)
            .get("/tasks/")
            .set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body.length).toBe(3);
    });

    test("GET /tasks/:id returns only task", async () => {
        const response = await request(app)
            .get("/tasks/1")
            .set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body).toStrictEqual({
            id: 1,
            title: "Actividad1",
            description: "Actividad1desc",
            created_at: "2026-09-05T13:32:29.653Z",
            status: "TODO",
            project_id: 1,
            priority: "1",
            updated_at: "2026-09-05T13:32:29.653Z",
        });
    });
});