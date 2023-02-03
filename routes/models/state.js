 const sequelize = new require("./db");
 const {DataTypes} = require('sequelize');
 const State = sequelize.define(
     "users",
     {
         state_id: {
             type: DataTypes.NUMBER,
             allowNull: false,
             primaryKey: true,
             autoIncrement:true
         },
         state_code: {
             type: DataTypes.STRING,
             allowNull: false,
         },
         //Modelos y atributos
         state_name: {
             type: DataTypes.STRING,
             allowNull: false,
             unique: true
         }, 
         country_id: {
             type: DataTypes.NUMBER,
             allowNull: false,
             unique: false
         }
     }, 
     {
         timestamps: false,
         tableName: "state"
     //otras opciones de modelo
     }
 );
 
 module.exports = State;

