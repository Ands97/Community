import { Sequelize } from "sequelize";
import config from "../../config";

export const sequelize = new Sequelize({
    dialect: 'postgres',
    host: config.db.host,
    port: config.db.port,
    database: config.db.dbName,
    username: config.db.user,
    password: config.db.password,
    define: {
        underscored: true
    }
})