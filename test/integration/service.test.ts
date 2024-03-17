import supertest from "supertest";
import runServer from "../../lib/server";

describe("integration test", () => {
  it("should return random number (mock)", async () => {
    const mockNumbersFn = jest.fn();
    mockNumbersFn.mockImplementation(() => {
      return 1;
    });
    const { app, onClose } = runServer(mockNumbersFn);
    const resp = await supertest(app).get("/");
    expect(resp.text).toEqual("1");
    onClose();
  });

  it("should return random number (real)", async () => {
    const { app, onClose } = runServer();
    const resp = await supertest(app).get("/");
    const number = parseFloat(resp.text);
    expect(Number.isNaN(number)).toBe(false);
    onClose();
  });
});
