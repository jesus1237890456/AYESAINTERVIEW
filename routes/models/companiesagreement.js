 const sequelize = new require("./db");
 const {DataTypes} = require('sequelize');
 const CompaniesAgreements = sequelize.define(
     "companies_agreements",
     {
         company_id: {
             type: DataTypes.NUMBER,
             allowNull: false,
             primaryKey: true,
         },
         //Modelos y atributos
         agreement_id: {
             type: DataTypes.NUMBER,
             allowNull: false,
             primaryKey: true,
         }
     }, 
     {
         timestamps: false,
         tableName: "companies_agreements"
     //otras opciones de modelo
     }
 );
 
 module.exports = CompaniesAgreements;

