import db from "../pg-models/index.js";

export async function getConnection() {
  try {
    db.sequelize.connectionManager.initPools();
    if (db.sequelize.connectionManager.hasOwnProperty("getConnection")) {
      delete db.sequelize.connectionManager.getConnection;
    }
  } catch (err) {
    console.error("Error occurred in getConnection function : ", err);
    db.sequelize.connectionManager.initPools();
    if (db.sequelize.connectionManager.hasOwnProperty("getConnection")) {
      delete db.sequelize.connectionManager.getConnection;
    }
  } finally {
    return db;
  }
}

export async function closeConnection() {
  try {
    await db.sequelize.close();
  } catch (error) {
    console.error("Error occurred in closeConnection function : ", error);
    await db.sequelize.close();
  }
}
