import config from "config";
import average, { Average } from "../utils/average";
import getHandler from "../handlers";
import logger from "../utils/logger";

const INTERVAL = config.period; // 1s by default

/**
 * AverageNumberService coordinates calls to the given data fetching function and maintains
 * the average via an instance of the Average class
 */
class AverageNumberService {
  private counter: Average;
  fetchFunction: () => Promise<number>;
  private runnable: boolean = true;
  private timer: NodeJS.Timeout;
  // allow dependency injection for mocking
  constructor(fetchFunction = getHandler()) {
    this.counter = average;
    this.fetchFunction = fetchFunction;
  }

  async getData() {
    try {
      logger.debug(
        `Fetching random number, iteration ${this.counter.getCount()}`
      );
      const randomNumber = await this.fetchFunction();
      // verify the data is correct
      if (Number.isNaN(+randomNumber)) {
        throw new Error("Supplied number is not a number"); // to be caught below
      }
      return this.counter.calculateNewAverage(randomNumber);
    } catch (err: any) {
      // rethrow any http errors for the express app to handle
      logger.error(err);
      this.clear();
      throw err;
    }
  }

  run() {
    if (this.runnable) {
      this.getData();
      this.timer = setTimeout(this.run.bind(this), INTERVAL);
    }
  }

  clear() {
    this.runnable = false;
    clearTimeout(this.timer);
  }

  getAverage() {
    return this.counter.getAverage();
  }
}

export default AverageNumberService;
