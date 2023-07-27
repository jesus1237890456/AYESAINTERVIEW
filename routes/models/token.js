const sequelize = new require("./db");
const {DataTypes} = require('sequelize');
const Token = sequelize.define(
    "tokens",
    {
        id: {
            type: DataTypes.NUMBER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        token: {
            type: DataTypes.STRING,
            allowNull: true,
          
        },
        activation_token: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        id_usuario:{
            type: DataTypes.NUMBER,
            allowNull: false,
            primaryKey: true,
        }
    }, 
    {
        timestamps: false,
        tableName: "token"
    //otras opciones de modelo
    }
);

module.exports = Token;