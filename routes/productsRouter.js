const express = require("express");
const router = express.Router();
const upload = require("../config/multer-config");
const productModel = require("../models/product-model");
const productController = require("../controllers/productController");

router.post("/create", upload.single("image"), async (req, res) => {
    try {
        // Create a new product using the productModel

        const { name, price, discount, bgcolor, panelcolor, textcolor } = req.body;
        const product = await productModel.create({
            image: req.file.buffer, // Image from multer
            name,
            price,
            discount,
            bgcolor,
            panelcolor,
            textcolor,
        });

        // Raw query to insert a new product
        // const { name, price, discount, bgcolor, panelcolor, textcolor, relatedProductId } = req.body;

        // const [results] = await sequelize.query(
        //     `INSERT INTO products (name, price, discount, bgcolor, panelcolor, textcolor, relatedProductId)
        //      VALUES (?, ?, ?, ?, ?, ?, ?)`,
        //     {
        //         replacements: [
        //             name,
        //             price,
        //             discount || 0.0,
        //             bgcolor || "#FFFFFF",
        //             panelcolor || "#FFFFFF",
        //             textcolor || "#000000",
        //             relatedProductId || null, // Pass null if relatedProductId is not provided
        //         ],
        //     }
        // );

        req.flash("success", "Product created successfully");
        res.redirect("/owners/admin");
    } catch (error) {
        req.flash("error", "Failed to create product: " + error.message);
        res.redirect("/owners/admin");
    }
});




router.get("/with-related", productController.getAllProductsWithRelated);
router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);
router.get("/:id/with-relations", productController.getProductWithRelations);


// // Use controller for other CRUD operations
// router.put("/:id", upload.single("image"), productController.updateProduct); // Update product
// router.delete("/:id", productController.deleteProduct); // Delete product

module.exports = router;
