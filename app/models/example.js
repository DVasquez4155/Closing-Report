// Dependencies
// =============================================================

// Sequelize (capital) references the standard library
var Sequelize = require("sequelize");
var connection = require("../config/connection.js");

// Creates a "connection" model that matches up with DB
var Example = connection.define(
    "example", 
    {
        id: { type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
        name: { type: Sequelize.STRING(30) },
    }
);

// Syncs with DB
Example.sync();

// Makes the Example Model available for other files (will also create a table)
module.exports = Example;
