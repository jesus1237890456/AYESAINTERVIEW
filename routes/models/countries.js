 const sequelize = new require("./db");
 const {DataTypes} = require('sequelize');
 const Countries = sequelize.define(
     "users",
     {
         country_id: {
             type: DataTypes.NUMBER,
             allowNull: false,
             primaryKey: true,
             autoIncrement:true
         },
         country_code: {
             type: DataTypes.STRING,
             allowNull: false,
         },
         //Modelos y atributos
         country_name: {
             type: DataTypes.STRING,
             allowNull: false,
             unique: true
         }
     }, 
     {
         timestamps: false,
         tableName: "countries"
     //otras opciones de modelo
     }
 );
 
 module.exports = Countries;

