import { describe, jest, test, expect } from "@jest/globals";
import { ProjectService } from "../../src/service/ProjectService.js";

const repositoryMock = {
    findAll: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn()
};

const service = new ProjectService(repositoryMock);


describe("ProjectService", () => {


    describe("FindAll", () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });

        test('When the answer is correct', async () => {
            repositoryMock.findAll.mockResolvedValue([{
                id: 1,
                name: "Proyecto Test"
            }]);

            const result = await service.findAll();
            expect(result.length).toEqual(1);
        });

        test("No project were found", async () => {
            repositoryMock.findAll.mockResolvedValue(null);

            await expect(service.findAll())
                .rejects
                .toThrow("No project were found");
        });
    });

    describe("FindById", () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });

        test('When the answer is correct', async () => {
            repositoryMock.findById.mockResolvedValue({
                id: 1,
                name: "Proyecto Test"
            });
            const result = await service.findById(1);
            expect(result.name).toEqual("Proyecto Test");
        });

        test("project not found", async () => {
            repositoryMock.findById.mockResolvedValue(null);
            try {
                await service.findById(999);
            } catch (error) {
                expect(error.message).toBe("Project not found");
                expect(error.statusCode).toBe(404);
            }
        });
    });

    describe("Create", () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });

        const project = {
            id: 1,
            name: "Proyecto creado Test"
        };

        test('When the answer is correct', async () => {
            repositoryMock.create.mockResolvedValue({
                id: 1,
                name: "Proyecto creado Test"
            });

            const result = await service.create(project);
            expect(result.name).toEqual("Proyecto creado Test");
        });

        test("When the answer isn't correct", async () => {
            repositoryMock.create.mockResolvedValue(null);
            await expect(service.create(project))
                .rejects
                .toThrow("The project was not created");
        });
    });

    describe("Update", () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });

        const project = {
            id: 1,
            name: "Proyecto actualizado Test"
        };

        test('When the answer is correct', async () => {
            repositoryMock.findById.mockResolvedValue({
                id: 1,
                name: "Proyecto actualizado Test"
            });
            repositoryMock.update.mockResolvedValue({
                id: 1,
                name: "Proyecto actualizado Test"
            });
            const result = await service.update(1, project);
            expect(result.name).toEqual("Proyecto actualizado Test");
        });

        test("When the answer isn't correct", async () => {
            repositoryMock.update.mockResolvedValue(null);
            await expect(service.update(1, project))
                .rejects
                .toThrow("The project was not update");
        });

        test("When the project not found ", async () => {
            repositoryMock.findById.mockResolvedValue(null);
            repositoryMock.update.mockResolvedValue(null);
            await expect(service.update(1, project))
                .rejects
                .toThrow("Project not found");
        });
    });

    describe("Delete", () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });

        test('When the answer is correct', async () => {
            repositoryMock.findById.mockResolvedValue({
                id: 1,
                name: "Proyecto eliminado Test"
            });
            repositoryMock.delete.mockResolvedValue(true);
            const result = await service.delete(1);
            expect(result).toEqual(true);
        });

        test("When the answer isn't correct", async () => {
            repositoryMock.delete.mockResolvedValue(null);
            await expect(service.delete(1))
                .rejects
                .toThrow("The project was not delete");
        });
    });
});


