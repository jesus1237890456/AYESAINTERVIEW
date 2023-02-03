 const sequelize = new require("./db");
 const {DataTypes} = require('sequelize');
 const PostalCodes = sequelize.define(
     "users",
     {
         postalcode_id: {
             type: DataTypes.NUMBER,
             allowNull: false,
             primaryKey: true,
             autoIncrement:true
         },
         postalcode_code: {
             type: DataTypes.NUMBER,
             allowNull: false,
         },
         //Modelos y atributos
         postalcode_name: {
             type: DataTypes.STRING,
             allowNull: false,
             unique: true
         }, 
         state_id: {
             type: DataTypes.STRING,
             allowNull: false,
             unique: false
         }
     }, 
     {
         timestamps: false,
         tableName: "postalcodes"
     //otras opciones de modelo
     }
 );
 
 module.exports = PostalCodes;

