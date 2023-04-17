import config from "./index";

const { secrets } = config();

module.exports = {
  development: {
    username: secrets.username,
    password: secrets.password,
    database: secrets.name,
    host: secrets.host,
    port: 5432,
    dialect: "postgres",
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
  test: {
    username: secrets.username,
    password: secrets.password,
    database: secrets.name,
    host: secrets.host,
    port: 5432,
    dialect: "postgres",
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
  production: {
    username: secrets.username,
    password: secrets.password,
    database: secrets.name,
    host: secrets.host,
    port: secrets.port,
    dialect: "postgres",
    logging: false,
    dialectOptions: {
      bigNumberStrings: true,
      ssl: {
        require: true,
        rejectUnauthorized: false, // <<<<<<< YOU NEED THIS
      },
    },
  },
};
