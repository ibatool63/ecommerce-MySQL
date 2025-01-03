const productModel = require("../models/product-model");
const { sequelize, DataTypes } = require("sequelize");

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


module.exports.getAllProductsWithRelated = async (req, res) => {
    try {
        const products = await productModel.findAll({
            include: [
                {
                    model: productModel,
                    as: "relatedProduct", // Alias for the self-join
                    attributes: ["id", "name", "price"], // Columns from related product
                },
            ],
        });

        res.status(200).json(products);
    } catch (error) {
        res.status(500).send(`Error fetching products with related data: ${error.message}`);
    }
};



module.exports.getProductWithRelations = async (req, res) => {
    try {
        const { id } = req.params;

        const [results] = await sequelize.query(
            `WITH RECURSIVE related_products AS (
                SELECT id, name, price, relatedProductId
                FROM products
                WHERE id = ?
                UNION ALL
                SELECT p.id, p.name, p.price, p.relatedProductId
                FROM products p
                INNER JOIN related_products rp ON p.id = rp.relatedProductId
            )
            SELECT * FROM related_products;`,
            { replacements: [id] }
        );

        res.status(200).json(results);
    } catch (error) {
        res.status(500).send(`Error fetching related products: ${error.message}`);
    }
};
