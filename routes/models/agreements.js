 const sequelize = new require("./db");
 const {DataTypes} = require('sequelize');
 const Agreements = sequelize.define(
     "users",
     {
        agreements_id: {
             type: DataTypes.NUMBER,
             allowNull: false,
             primaryKey: true,
         },
         agreements_code: {
             type: DataTypes.DECIMAL,
             allowNull: false,
         },
         //Modelos y atributos
         agreements_name: {
             type: DataTypes.STRING,
             allowNull: false,
             unique: true
         }
     }, 
     {
         timestamps: false,
         tableName: "agreements"
     //otras opciones de modelo
     }
 );
 
 module.exports = Agreements;

