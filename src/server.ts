import "module-alias/register";
import { testSequelize } from "./connection";
import logger from "./logger";
import app from "./app";
import config from "@config";

const { port } = config();
const apiURL = `/api/${config().version}`;

app.listen(port, async function onListen() {
  testSequelize(); // test the sequelize connection.'
  logger.info(`Server is up and running at ${apiURL} on port ${port}`);
});
