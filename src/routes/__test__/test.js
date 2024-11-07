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

describe("POST LOGIN AUTH", () => {
    it("should return 200", async () => {
       await supertest.post('/api/v1/users/login').expect(200);
    });
});

describe("POST REGISTER", () => {
    it("should return 200", async () => {
       await supertest.post('/api/v1/users/register').expect(200);
    });
});

describe("POST DOCTORS SLOT", () => {
    it("should return 200", async () => {
       await supertest.post('/api/v1/users//doctors/slots').expect(200);
    });
});