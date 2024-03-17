import express from "express";
import config from "config";
import AverageNumberService from "./service/averageNumberService";
import logger from "./utils/logger";
import csrngHandler from "./handlers/csrngHandler";

const runServer = (fetchFunction = csrngHandler) => {
  const app = express();
  const service = new AverageNumberService(fetchFunction);

  try {
    service.run();
  } catch (err: any) {
    logger.fatal(err, "Exiting");
    process.exit(1);
  }

  app.get("/", (_, res) => {
    try {
      const number = service.getAverage();
      res.status(200);
      res.send(`${number}`);
    } catch (err: any) {
      res.status(err.status || 500);
      logger.error(err);
      res.send(err);
    }
  });

  const port = config.app.port;
  const server = app.listen(port, () => {
    console.log(`Average Number Service listening on port ${port}`);
  });

  const onClose = () => {
    service.clear();
    server.close();
  };

  [
    "exit",
    "SIGTERM",
    "SIGINT",
    "unhandledException",
    "unhandledRejection",
  ].forEach((evt) => {
    process.on(evt, function () {
      logger.info("Exiting");
      onClose();
    });
  });

  return { app, onClose };
};

export default runServer;
