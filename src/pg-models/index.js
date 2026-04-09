"use strict";

import path from "path";
import Sequelize from "sequelize";
import process from "process";
import { getModels } from "../helpers/getModels.js"; // Assuming this is a valid path to your helper function
import config from '../config/config.cjs';

const env = process.env.NODE_ENV || "development";

const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(
    process.env[config[env].use_env_variable],
    config[env]
  );
} else {
  sequelize = new Sequelize(
    config[env].database,
    config[env].username,
    config[env].password,
    config[env]
  );
}

Object.assign(db, await getModels(sequelize, Sequelize));
Object.keys(db).forEach(async (modelName) => {
  if (db[modelName].associate) {
    await db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
