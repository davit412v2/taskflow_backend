import { describe, jest, test, expect } from "@jest/globals";
import { TaskService } from "../../src/service/TaskService.js";

const repositoryMock = {
    findAll: jest.fn(),
    findById: jest.fn(),
    findByProjectId: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn()
};

const respositoryProjectMock = {
    findById: jest.fn()
}

const service = new TaskService(repositoryMock, respositoryProjectMock);

describe("TaskService", () => {

    describe("FindAll", () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });

        test('When the answer is correct', async () => {
            repositoryMock.findAll.mockResolvedValue([{
                id: 1,
                title: "Tarea Test",
                status: "TODO",
                project_id: 1,
                priority: 1
            }]);

            const result = await service.findAll();
            expect(result.length).toEqual(1);
        });

        test("No tasks were found", async () => {
            repositoryMock.findAll.mockResolvedValue(null);

            await expect(service.findAll())
                .rejects
                .toThrow("No tasks were found.");
        });
    });

    describe("FindById", () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });

        test('When the answer is correct', async () => {
            repositoryMock.findById.mockResolvedValue({
                id: 1,
                title: "Tarea Test",
                status: "TODO",
                project_id: 1,
                priority: 1
            });
            const result = await service.findById(1);
            expect(result.title).toEqual("Tarea Test");
        });

        test("Task not found", async () => {
            repositoryMock.findById.mockResolvedValue(null);
            try {
                await service.findById(999);
            } catch (error) {
                expect(error.message).toBe("Task not found");
                expect(error.statusCode).toBe(404);
            }
        });
    });

    describe("FindByProjectId", () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });

        test('When the answer is correct', async () => {
            respositoryProjectMock.findById.mockResolvedValue({
                id: 1,
                name: "Proyecto Test"
            });
            repositoryMock.findByProjectId.mockResolvedValue([{
                id: 1,
                title: "Tarea Test",
                status: "TODO",
                project_id: 1,
                priority: 1
            }]);
            const result = await service.findByProjectId(1);
            expect(result.length).toEqual(1);
        });

        test("Tasks not found", async () => {
            respositoryProjectMock.findById.mockResolvedValue({
                id: 1,
                name: "Proyecto Test"
            });
            repositoryMock.findByProjectId.mockResolvedValue(null);
            await expect(service.findByProjectId(1))
                .rejects
                .toThrow("Tasks not found");
        });
    });

    describe("Create", () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });

        const task = {
            id: 1,
            title: "Tarea Test",
            status: "TODO",
            project_id: 1,
            priority: 1
        }

        test('When the answer is correct', async () => {
            repositoryMock.create.mockResolvedValue({
                id: 1,
                title: "Tarea creada Test",
                status: "TODO",
                project_id: 1,
                priority: 1
            });

            const result = await service.create(task);
            expect(result.title).toEqual("Tarea creada Test");
        });

        test("When the answer isn't correct", async () => {
            repositoryMock.create.mockResolvedValue(null);
            await expect(service.create(task))
                .rejects
                .toThrow("The task was not created");
        });
    });

    describe("Update", () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });

        const task = {
            id: 1,
            title: "Tarea Test",
            status: "TODO",
            project_id: 1,
            priority: 1
        }

        test('When the answer is correct', async () => {
            repositoryMock.findById.mockResolvedValue({
                id: 1,
                title: "Tarea Test",
                status: "TODO",
                project_id: 1,
                priority: 1
            });
            repositoryMock.update.mockResolvedValue({
                id: 1,
                title: "Tarea actualizada Test",
                status: "TODO",
                project_id: 1,
                priority: 1
            });
            const result = await service.update(1, task);
            expect(result.title).toEqual("Tarea actualizada Test");
        });

        test("When the answer isn't correct", async () => {
            repositoryMock.update.mockResolvedValue(null);
            await expect(service.update(1, task))
                .rejects
                .toThrow("The task was not update");
        });

        test("When the task not found", async () => {
            repositoryMock.findById.mockResolvedValue(null);
            repositoryMock.update.mockResolvedValue(null);
            await expect(service.update(1, task))
                .rejects
                .toThrow("Task not found");
        });
    });

    describe("Delete", () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });
        test('When the answer is correct', async () => {
            repositoryMock.findById.mockResolvedValue({
                   id: 1,
                title: "Tarea actualizada Test",
                status: "TODO",
                project_id: 1,
                priority: 1
            });
            repositoryMock.delete.mockResolvedValue(true);
            const result = await service.delete(1);
            expect(result).toEqual(true);
        });

        test("When the answer isn't correct", async () => {
            repositoryMock.delete.mockResolvedValue(null);
            await expect(service.delete(1))
                .rejects
                .toThrow("The task was not delete");
        });
    });

});