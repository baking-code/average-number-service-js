import config from "config";
import csrngHandler from "./csrngHandler";

const getHander = (): (() => Promise<number>) => {
  switch (config.randomNumberHandler) {
    // maybe add more sources here
    case "csrng":
    default:
      return csrngHandler;
  }
};

export default getHander;
