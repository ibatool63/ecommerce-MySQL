const jwt = require("jsonwebtoken");
const User = require("../models/user-model"); // Assuming Sequelize is now being used

module.exports = async function (req, res, next) {
    try {
        // Check if the token exists in cookies
        if (!req.cookies.token) {
            req.flash("error", "You need to login first");
            return res.redirect("/");
        }

        // Verify the JWT token
        const decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);

        // Find the user in the database (adapted for Sequelize)
        const user = await User.findOne({
            where: { email: decoded.email },
            attributes: { exclude: ["password"] }, // Exclude the password field
        });

        // If no user is found, redirect to login
        if (!user) {
            req.flash("error", "User not found, please login again");
            return res.redirect("/");
        }

        // Attach the user to the request object for downstream middleware
        req.user = user;
        next();
    } catch (err) {
        console.error("Authentication Error:", err.message);
        req.flash("error", "Something went wrong. Please login again.");
        res.redirect("/");
    }
};
