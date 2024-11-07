// import SuperTest from "supertest";
// import app from '../app';
const SuperTest = require('supertest')
const app = require('../../app');

const supertest = SuperTest(app);

describe("GET HEALTH CHECK", () => {
    it("should return 200", async () => {
       await supertest.get('/api/v1/healthcheck').expect(200);
    });
});