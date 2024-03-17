import average from "../../lib/utils/average";

describe("average", () => {
  it("should calculate cumulative average", () => {
    average.addNewNumber(1);
    average.addNewNumber(2);
    average.addNewNumber(3);
    expect(average.addNewNumber(4)).toEqual(2.5);
    expect(average.addNewNumber(5)).toEqual(3);
  });

  it("should calculate cumulative average (negative)", () => {
    average.addNewNumber(1);
    average.addNewNumber(2);
    average.addNewNumber(-3);
    expect(average.addNewNumber(4)).toEqual(1);
    expect(average.addNewNumber(6)).toEqual(2);
  });

  it("should calculate cumulative average (zero)", () => {
    average.addNewNumber(0);
    average.addNewNumber(0);
    average.addNewNumber(0);
    expect(average.addNewNumber(0)).toEqual(0);
  });
});
