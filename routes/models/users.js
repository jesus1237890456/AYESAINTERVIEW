const sequelize = new require("./db");
const {DataTypes} = require('sequelize');
const User = sequelize.define(
    "usuarios",
    {
        id: {
            type: DataTypes.NUMBER,
            allowNull: false,
            primaryKey: true,
            autoIncrement:true
        },
        dni: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: true,
           
        },
        mail: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        password:{
            type: DataTypes.STRING,
            allowNull: true,
        },
    }, 
    {
        timestamps: false,
        tableName: "usuarios"
    }
);

module.exports = User;