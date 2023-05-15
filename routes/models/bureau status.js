const sequelize = new require("./db");
const {DataTypes} = require('sequelize');
const Bureau = require('./bureau');
const BureauStatus = sequelize.define(
    "bureaustatus",
    {
        
        bureaustatus_id: {
            type: DataTypes.NUMBER,
            allowNull: false,
            primaryKey: true,
        },
        bureaustatus_name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    }, 
    {
        timestamps: false,
        tableName: "bureaustatus"
    //otras opciones de modelo
    }
);
Bureau.hasOne(BureauStatus, {foreignKey:"bureaustatus_id"});
BureauStatus.belongsTo(Bureau, {foreignKey:"bureaustatus_id"});

module.exports = BureauStatus;