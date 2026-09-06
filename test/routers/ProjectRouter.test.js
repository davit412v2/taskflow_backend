import app from "../../src/app.js";
import request from "supertest";
import jwt from "jsonwebtoken";


describe("ProjectRouter", () => {

    const token = jwt.sign(
        { id: 1 },
        process.env.JWT_SECRET
    );

    test("GET /projects/ returns all tasks", async () => {
        const response = await request(app)
            .get("/projects/")
            .set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body.length).toBe(1);
    });

    test("GET /projects/:id returns only task", async () => {
        const response = await request(app)
            .get("/projects/1")
            .set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body).toStrictEqual({
            id:1,
            name: "Tarea1",
            description: "Tarea1desc",
            created_at: "2026-09-05T13:29:36.621Z",
        });
    });
});