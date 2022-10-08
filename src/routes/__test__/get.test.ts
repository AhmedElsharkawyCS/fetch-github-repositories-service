import request from "supertest"
import { app } from "../../app"

describe("Test get repositories", () => {
  it("Should return 200 if api called with correct data", async () => {
    const { status } = await request(app).get("/api/repositories?fromDate=2016-05-06&pageSize=10&programmingLanguage=javascript").send()
    expect(status).toBe(200)
  })
  it("Should return 404 if the api is not found", async () => {
    const { status } = await request(app).get("/api/repository?fromDate=2016-05-06&pageSize=10&programmingLanguage=js").send()
    expect(status).toBe(404)
  })
  it("Should return 400 if we didn't pass fromDate/pageSize", async () => {
    await request(app).get("/api/repositories?fromDate=2016-05-06&programmingLanguage=js").send().expect(400)
    await request(app).get("/api/repositories?pageSize=10&programmingLanguage=js").send().expect(400)
  })
  it("Should return 400 if we passed invalid date format", async () => {
    await request(app).get("/api/repositories?fromDate=2016/05/01&pageSize=10&programmingLanguage=js").send().expect(400)
  })
  it("Should return 400 if we passed invalid programming language", async () => {
    await request(app).get("/api/repositories?fromDate=2016-05-06&pageSize=10&programmingLanguage=j").send().expect(400)
  })
  it("Should return 400 if we passed invalid page size", async () => {
    await request(app).get("/api/repositories?fromDate=2016-05-06&pageSize=0&programmingLanguage=js").send().expect(400)
  })
  it("Should return 200 and the same data length of page size", async () => {
    const { body, status } = await request(app).get("/api/repositories?fromDate=2016-05-06&pageSize=10&programmingLanguage=javascript").send()
    expect(body.length).toBe(10)
    expect(status).toBe(200)
  })
})
