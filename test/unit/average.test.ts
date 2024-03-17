import average from "../../lib/utils/average";

describe("average", () => {
  it("should calculate cumulative average", () => {
    average.calculateNewAverage(1);
    average.calculateNewAverage(2);
    average.calculateNewAverage(3);
    expect(average.calculateNewAverage(4)).toEqual(2.5);
    expect(average.calculateNewAverage(5)).toEqual(3);
  });
});
