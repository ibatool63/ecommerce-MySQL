const express = require("express");
const router = express.Router();
const upload = require("../config/multer-config");
const productModel = require("../models/product-model");
const productController = require("../controllers/productController");

router.post("/create", upload.single("image"), async (req, res) => {
    try {
        const { name, price, discount, bgcolor, panelcolor, textcolor } = req.body;

        // Create a new product using the productModel
        const product = await productModel.create({
            image: req.file.buffer, // Image from multer
            name,
            price,
            discount,
            bgcolor,
            panelcolor,
            textcolor,
        });

        req.flash("success", "Product created successfully");
        res.redirect("/owners/admin");
    } catch (error) {
        req.flash("error", "Failed to create product: " + error.message);
        res.redirect("/owners/admin");
    }
});

// // Use controller for other CRUD operations
// router.get("/", productController.getAllProducts); // Fetch all products
// router.get("/:id", productController.getProductById); // Fetch product by ID
// router.put("/:id", upload.single("image"), productController.updateProduct); // Update product
// router.delete("/:id", productController.deleteProduct); // Delete product

module.exports = router;
