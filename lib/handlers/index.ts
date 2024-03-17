import config from "config";
import csrngHandler from "./csrngHandler";

const getHander = (): (() => Promise<number>) => {
  switch (config.randomNumberHandler) {
    case "csrng":
    default:
      return csrngHandler;
  }
};

export default getHander;
