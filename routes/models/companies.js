 const sequelize = new require("./db");
 const {DataTypes} = require('sequelize');
 const Companies = sequelize.define(
     "users",
     {
         bureau_id: {
             type: DataTypes.NUMBER,
             allowNull: false,
             primaryKey: true,
         },
         company_id: {
             type: DataTypes.NUMBER,
             allowNull: false,
             primaryKey: true,
             autoIncrement:true
         },
         //Modelos y atributos
         company_fiscal_id: {
             type: DataTypes.STRING,
             allowNull: false,
             unique: true
         }, 
         company_name: {
             type: DataTypes.STRING,
             allowNull: false,
             unique: false
         },
         //regimen
         ssscheme_id: {
             type: DataTypes.NUMBER,
             allowNull: false,
         },
         company_address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        postalcode_id: {
            type: DataTypes.STRING,
            allowNull: false
        },
        company_city: {
            type: DataTypes.STRING,
            allowNull: false
        },
        //
        state_id: {
            type: DataTypes.NUMBER,
            allowNull: false
        },
        //
        country_id: {
            type: DataTypes.STRING,
            allowNull: false
        },
        company_phone: {
            type: DataTypes.STRING,
            allowNull: true
        },
        company_contact: {
            type: DataTypes.STRING,
            allowNull: true
        },
        company_email: {
            type: DataTypes.STRING,
            allowNull: true
        },
        company_status_id: {
            type: DataTypes.NUMBER,
            allowNull: false
        },        
        company_certificate: {
            type: DataTypes.STRING,
            allowNull: false
        }
     }, 
     {
         timestamps: false,
         tableName: "companies"
     //otras opciones de modelo
     }
 );
 
 module.exports = Companies;

