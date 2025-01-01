const { DataTypes } = require("sequelize");
const sequelize = require("../config/mysql-connection");

const User = sequelize.define("User", {
    fullname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cart: {
        type: DataTypes.JSON, // Using JSON to store product references or cart details
        defaultValue: [],
    },
    orders: {
        type: DataTypes.JSON, // Using JSON for order details
        defaultValue: [],
    },
    picture: {
        type: DataTypes.STRING,
    },
    contact: {
        type: DataTypes.BIGINT, // Use BIGINT for phone numbers
        allowNull: true,
    },
}, {
    tableName: 'users', // Table name in the database
    timestamps: false,   // Automatically adds createdAt and updatedAt columns
});



module.exports = User;
