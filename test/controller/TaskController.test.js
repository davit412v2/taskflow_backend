import { describe, jest, test, expect } from "@jest/globals";
import { TaskController } from "../../src/controller/TaskController";

const serviceMock = {
    findAll: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn()
}

const controller = new TaskController(serviceMock);

describe("TaskController", () => {

    describe("FindAll", () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });

        test("GET tasks all", async () => {
            serviceMock.findAll.mockResolvedValue([{
                id: 1,
                title: "Tarea Test",
                status: "TODO",
                project_id: 1,
                priority: 1
            }]);

            const req = {};
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            await controller.findAll(req, res);

            expect(res.json).toHaveBeenCalledWith([{
                id: 1,
                title: "Tarea Test",
                status: "TODO",
                project_id: 1,
                priority: 1
            }]);
        });
    });

    describe("FindById", () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });

        test("GET task by id", async () => {
            serviceMock.findById.mockResolvedValue({
                id: 1,
                title: "Tarea Test",
                status: "TODO",
                project_id: 1,
                priority: 1
            });

            const req = { params: { id: 1 } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            await controller.findById(req, res);

            expect(res.json).toHaveBeenCalledWith({
                id: 1,
                title: "Tarea Test",
                status: "TODO",
                project_id: 1,
                priority: 1
            });
        });
    });

    describe("Create", () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });

        test("POST create task ", async () => {
            serviceMock.create.mockResolvedValue({
                id: 1,
                title: "Tarea Test",
                status: "TODO",
                project_id: 1,
                priority: 1
            });

            const req = {
                body: {
                    id: 1,
                    title: "Tarea Test",
                    status: "TODO",
                    project_id: 1,
                    priority: 1
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            await controller.create(req, res);

            expect(res.json).toHaveBeenCalledWith({
                id: 1,
                title: "Tarea Test",
                status: "TODO",
                project_id: 1,
                priority: 1
            });
        });
    });

    describe("Update", () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });


        test("PUT update task ", async () => {
            serviceMock.update.mockResolvedValue({
                id: 1,
                title: "Tarea Test",
                status: "TODO",
                project_id: 1,
                priority: 1
            });

            const req = {
                params: { id: 1 },
                body: {
                    id: 1,
                    title: "Tarea Test",
                    status: "TODO",
                    project_id: 1,
                    priority: 1
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            await controller.update(req, res);

            expect(res.json).toHaveBeenCalledWith({
                id: 1,
                title: "Tarea Test",
                status: "TODO",
                project_id: 1,
                priority: 1
            });
        });
    });

    describe("Delete", () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });


        test("DELETE delete task ", async () => {
            serviceMock.delete.mockResolvedValue(true);

            const req = {
                params: { id: 1 },
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            await controller.delete(req, res);

            expect(res.json).toHaveBeenCalledWith(true);
        });
    });
});