import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
    dialect: 'postgres',
    host: '192.168.3.100',
    port: 5432,
    database: 'community_dev',
    username: 'postgres',
    password: 'community',
    define: {
        underscored: true
    }
})