import { promisify } from "util";
import { redisClient } from "./redis";

export const redisGetAsync = promisify(redisClient.get).bind(redisClient);
