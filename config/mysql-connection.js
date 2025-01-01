const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('ecommerce', 'root', 'Ismat.13040', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
