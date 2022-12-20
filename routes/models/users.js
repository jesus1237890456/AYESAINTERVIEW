const sequelize = new require("./db");
const {DataTypes} = require('sequelize');
const User = sequelize.define(
    "users",
    {
        bureau_id: {
            type: DataTypes.NUMBER,
            allowNull: false,
            primaryKey: true,
        },
        rol_id: {
            type: DataTypes.NUMBER,
            allowNull: false,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.NUMBER,
            allowNull: false,
            primaryKey: true,
        },
        //Modelos y atributos
        user_email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }, 
        user_full_name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        user_password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, 
    {
        timestamps: false,
        tableName: "users"
    //otras opciones de modelo
    }
);

module.exports = User;