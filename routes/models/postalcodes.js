 const sequelize = new require("./db");
 const {DataTypes} = require('sequelize');
const Companies = require('./companies');
 const PostalCodes = sequelize.define(
     "postalcode",
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
 PostalCodes.hasMany(Companies, {foreignKey:"postalcode_id"});
 Companies.belongsTo(PostalCodes, {foreignKey:"postalcode_id"});

 module.exports = PostalCodes;

