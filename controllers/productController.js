const productModel = require("../models/product-model");

// Fetch all products
module.exports.getAllProducts = async (req, res) => {
    try {
        const products = await productModel.findAll(); // Sequelize's method to fetch all rows
        res.status(200).json(products); // Respond with products in JSON format
    } catch (error) {
        res.status(500).send(`Error fetching products: ${error.message}`);
    }
};

// Fetch a product by ID
module.exports.getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await productModel.findByPk(id); // Fetch product by primary key

        if (!product) {
            return res.status(404).send("Product not found");
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).send(`Error fetching product: ${error.message}`);
    }
};
