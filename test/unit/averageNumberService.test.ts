import AverageNumberService from "../../lib/service/averageNumberService";

const mockNumbersFn = jest.fn();

const MOCK_MAX = 10;

beforeEach(() => {
  mockNumbersFn.mockReset();
  mockNumbersFn.mockResolvedValue(Math.round(Math.random() * MOCK_MAX));
});
describe("AverageNumberService", () => {
  let service;
  beforeAll(() => {
    service = new AverageNumberService(mockNumbersFn);
  });

  afterEach(() => {
    service.clear();
  });

  it("should return a random number", async () => {
    const number = await service.getData();
    expect(number).toBeLessThan(MOCK_MAX); // based on mock implementation
    expect(number).toBeGreaterThan(0);
  });

  it("should error if a number is not returned", async () => {
    mockNumbersFn.mockResolvedValueOnce("oh no");
    await expect(service.getData()).rejects.toThrowErrorMatchingInlineSnapshot(
      `"Supplied number is not a number"`
    );
  });

  it("should error if fetch fails", async () => {
    mockNumbersFn.mockRejectedValueOnce(new Error("oh no"));
    await expect(service.getData()).rejects.toThrowErrorMatchingInlineSnapshot(
      `"oh no"`
    );
  });

  describe("AverageNumberService run", () => {
    jest.useFakeTimers();
    it("should fetch number every second", async () => {
      service = new AverageNumberService(mockNumbersFn);
      service.run();
      const numberOfRuns = 5;
      expect(mockNumbersFn).toHaveBeenCalledTimes(1); // called immediately
      jest.advanceTimersByTime(1000 * numberOfRuns);
      expect(mockNumbersFn).toHaveBeenCalledTimes(numberOfRuns + 1);
    });
  });
});
