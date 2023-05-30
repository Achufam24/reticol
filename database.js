const { Sequelize } = require('sequelize');

// Replace the <DATABASE_URL> with your internal database URL
// const sequelize = new Sequelize('<DATABASE_URL>', {
//   dialect: 'postgres',
//   logging: false, // Disable logging for production
// });
let sequelize;
if (process.env.ENV == 'development') {
  sequelize = new Sequelize(process.env.DB_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: true,
      native:true
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }//removed ssl
  });
}else{
  sequelize = new Sequelize("achufam","postgres","Achufam24",{
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: false,
      native:true
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }//removed ssl
  });
}
 
  
  // Test the database connection
  sequelize
    .authenticate()
    .then(() => {
      console.log('Database connection has been established successfully.');
    })
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    });

module.exports = sequelize;
