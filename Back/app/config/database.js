require('dotenv').config();
const { Sequelize } = require('sequelize');


const sequelize = new Sequelize("pokedex", "alex", "alex", {
    host: 'localhost',
    dialect: 'postgres',
    define: { timestamps: false }
});

module.exports = sequelize;