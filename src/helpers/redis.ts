import redis from "redis";
import config from "@config";

const redisClient = redis.createClient(config().redisUrl);

redisClient.on("connect", () => {
  console.log("REDIS CONNECTED");
});

redisClient.on("error", function (error: Error) {
  console.error(error);
});

export { redisClient };
