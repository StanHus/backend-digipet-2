"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const model_1 = require("../digipet/model");
const server_1 = __importDefault(require("../server"));
describe("When a user ignors a digipet repeatedly,everything decreases by 10 each time until it eventually maxes out at 100", () => {
    beforeAll(() => {
        // setup: give an initial digipet
        const startingDigipet = {
            happiness: 15,
            nutrition: 15,
            discipline: 20,
        };
        model_1.setDigipet(startingDigipet);
    });
    test("GET /digipet informs them that they have a digipet with expected stats", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield supertest_1.default(server_1.default).get("/digipet");
        expect(response.body.message).toMatch(/your digipet/i);
        expect(response.body.digipet).toHaveProperty("happiness", 15);
        expect(response.body.digipet).toHaveProperty("discipline", 20);
        expect(response.body.digipet).toHaveProperty("nutrition", 15);
    }));
    test("1st GET /digipet/ignore informs them about the ignore and shows decrease everything", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield supertest_1.default(server_1.default).get("/digipet/ignore");
        expect(response.body.digipet).toHaveProperty("happiness", 5);
        expect(response.body.digipet).toHaveProperty("discipline", 10);
        expect(response.body.digipet).toHaveProperty("nutrition", 5);
    }));
    test("2nd GET /digipet/ignore shows continued stats change", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield supertest_1.default(server_1.default).get("/digipet/ignore");
        expect(response.body.digipet).toHaveProperty("happiness", 0);
        expect(response.body.digipet).toHaveProperty("discipline", 0);
        expect(response.body.digipet).toHaveProperty("nutrition", 0);
    }));
});
