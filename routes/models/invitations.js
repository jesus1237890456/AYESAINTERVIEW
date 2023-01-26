const sequelize = new require("./db");
const {DataTypes} = require('sequelize');
const User = sequelize.define(
    "users",
    {

        user_id: {
            type: DataTypes.NUMBER,
            allowNull: false,
            primaryKey: true,
        },
        invitation_token: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true
        }
    }, 
    {
        timestamps: false,
        tableName: "invitations"
    //otras opciones de modelo
    }
);

module.exports = User;