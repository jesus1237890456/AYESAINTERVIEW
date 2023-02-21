 const sequelize = new require("./db");
 const {DataTypes} = require('sequelize');
 const Agreements = sequelize.define(
     "agreement",
     {
        agreement_id: {
             type: DataTypes.NUMBER,
             allowNull: false,
             primaryKey: true,
         },
         agreement_code: {
             type: DataTypes.DECIMAL,
             allowNull: false,
         },
         //Modelos y atributos
         agreement_name: {
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

