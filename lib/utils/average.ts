/**
 * Simple class to store a cumulative average so we don't have to keep all received numbers in memory
 */
export class Average {
  private count: number;
  private average: number;
  private latestValue: number;
  constructor() {
    this._reset();
  }

  _reset() {
    this.count = 0;
    this.average = 0;
  }

  getAverage() {
    return this.average;
  }

  getLatest() {
    return this.latestValue;
  }

  getCount() {
    return this.count;
  }

  calculateNewAverage(next: number) {
    this.latestValue = next;
    this.average = this.getNextAverage(next);
    this.count++;
    return this.average;
  }

  /**
   * getNextAverage calculates the next average by:
   * 1. multiplying the previous average with the number of numbers contributing to that average,
   * 2. adding the next number to contribute to the average
   * 3. dividing by the new count
   * @param previous - the previous average
   * @param next - the next number to process
   * @param count - the number of numbers we've calculated
   * @returns the new average
   */
  getNextAverage = (next: number): number => {
    if (this.count < 0) {
      throw new Error("Cannot divide by zero");
    }
    return (this.average * this.count + next) / (this.count + 1);
  };
}

export default new Average();
