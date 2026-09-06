import { describe, jest, test, expect } from "@jest/globals";
import { ProjectController } from "../../src/controller/ProjectController.js";

const serviceMock = {
    findAll: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn()
}

const controller = new ProjectController(serviceMock);

describe("ProjectController", () => {

    describe("FindAll", () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });

        test("GET project all", async () => {
            serviceMock.findAll.mockResolvedValue([{
                id: 1,
                name: "Proyecto Test"
            }]);

            const req = {};
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            await controller.findAll(req, res);

            expect(res.json).toHaveBeenCalledWith([{
                id: 1,
                name: "Proyecto Test"
            }]);
        });
    });

    describe("FindById", () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });

        test("GET project by id", async () => {
            serviceMock.findById.mockResolvedValue({
                id: 1,
                name: "Proyecto Test"
            });

            const req = { params: { id: 1 } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            await controller.findById(req, res);

            expect(res.json).toHaveBeenCalledWith({
                id: 1,
                name: "Proyecto Test"
            });
        });
    });

    describe("Create", () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });

        test("POST create project ", async () => {
            serviceMock.create.mockResolvedValue({
                id: 1,
                name: "Proyecto Test"
            });

            const req = {
                body: {
                    id: 1,
                    name: "Proyecto Test"
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            await controller.create(req, res);

            expect(res.json).toHaveBeenCalledWith({
                id: 1,
                name: "Proyecto Test"
            });
        });
    });

    describe("Update", () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });


        test("PUT update project ", async () => {
            serviceMock.update.mockResolvedValue({
                id: 1,
                name: "Proyecto Test"
            });

            const req = {
                params: { id: 1 },
                body: {
                    id: 1,
                    name: "Proyecto Test"
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            await controller.update(req, res);

            expect(res.json).toHaveBeenCalledWith({
                id: 1,
                name: "Proyecto Test"
            });
        });
    });

    describe("Delete", () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });


        test("DELETE delete project ", async () => {
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