console.log("Init Database");

const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  database: 'postgres',
  username: 'postgres',
  password: 'postgres',
  dialect: 'postgres'
});

(async ()=>{
  try{
    await sequelize.authenticate();
    console.log("Database has successfully connected");
  }catch(err){

    switch(err.name){

      case "SequelizeConnectionError":
        console.log(err)
        break;
      case "SequelizeDatabaseError":
        console.log(err)
        // console.log(err)
        break;
      default:
        console.error(err)
    }
  }


})()

export {sequelize}
