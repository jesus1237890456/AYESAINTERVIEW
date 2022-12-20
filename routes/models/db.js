import localDatabase from "../../ENV";

const {Sequelize} = require("sequelize");

const sequelize = new Sequelize(localDatabase.database, localDatabase.user, localDatabase.password, {
    host: "localhost",
    dialect: "mysql",
});

(async ()=>{
    try {
        await sequelize.authenticate();
        console.log("Connection has been established succesfully.");
    }catch(error){
        console.error("Unable to connect to the database:", error);
    }
    await sequelize.sync({force:false});
})();

module.exports = sequelize;

