const sequelize = new require("./db");
const {DataTypes} = require('sequelize');
const User = sequelize.define(
    "users",
    {
        refreshtoken_id: {
            type: DataTypes.NUMBER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: false,
        },
        user_id: {
            type: DataTypes.NUMBER,
            allowNull: false,
            primaryKey: true,
        },
        refreshtoken_token: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true
        }
    }, 
    {
        timestamps: false,
        tableName: "refreshtokens"
    //otras opciones de modelo
    }
);

module.exports = User;