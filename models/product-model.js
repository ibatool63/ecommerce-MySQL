const { DataTypes } = require("sequelize");
const sequelize = require("../config/mysql-connection"); // Import your Sequelize connection

const Product = sequelize.define("Product", {
    image: {
        type: DataTypes.BLOB("long"), // For storing binary image data
        allowNull: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    discount: {
        type: DataTypes.FLOAT,
        defaultValue: 0, // Default discount is 0
    },
    bgcolor: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    panelcolor: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    textcolor: {
        type: DataTypes.STRING,
        allowNull: true,
    },
   
}, {
    tableName: "products", // Name of the table in MySQL
    timestamps: false,      // Adds createdAt and updatedAt fields
});

module.exports = Product;
