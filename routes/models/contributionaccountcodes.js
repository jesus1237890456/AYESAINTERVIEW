 const sequelize = new require("./db");
 const {DataTypes} = require('sequelize');
 const ContributionAccountCodes = sequelize.define(
     "contributionaccountcode",
     {
        contributionaccountcode_id: {
             type: DataTypes.NUMBER,
             allowNull: false,
             primaryKey: true,
             autoIncrement:true
         },
         company_id: {
             type: DataTypes.NUMBER,
             allowNull: false,
             primaryKey: true,
            
         },
         //Modelos y atributos
         contributionaccountcode_code: {
             type: DataTypes.NUMBER,
             allowNull: false,
             unique: true
         }
     }, 
     {
         timestamps: false,
         tableName: "contributionaccountcodes"
     //otras opciones de modelo
     }
 );
 
 module.exports = ContributionAccountCodes;

