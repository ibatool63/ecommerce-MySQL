const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("../config/mysql-connection"); 


const Owner = sequelize.define('Owner', {
    fullname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [3, 255], // Minimum 3 characters
        },
        trim: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true, // Ensures valid email format
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    products: {
        type: DataTypes.JSON, // Stores array data as JSON
        defaultValue: [],
    },
    picture: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    gstin: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    tableName: 'owners', // Specify table name
    timestamps: false, // Adds createdAt and updatedAt fields
});

module.exports = Owner;
