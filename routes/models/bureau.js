const sequelize = new require("./db");
const {DataTypes} = require('sequelize');
const User = sequelize.define(
    "bureau",
    {
        bureau_id: {
            type: DataTypes.NUMBER,
            allowNull: false,
            primaryKey: true,
        },
        bureaustatus_id: {
            type: DataTypes.NUMBER,
            allowNull: false,
            primaryKey: true,
        },
        bureau_fiscal_id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
        bureau_name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
       
        bureau_observation: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, 
    {
        timestamps: false,
        tableName: "bureaus"
    //otras opciones de modelo
    }
);

module.exports = User;