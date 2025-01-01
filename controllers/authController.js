const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/generateToken");
const User = require("../models/user-model"); // Sequelize User model

module.exports.registerUser = async function (req, res) {
    try {
        const { email, password, fullname } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            req.flash("error", "You already have an account, please login");
            return res.redirect("/");
        }

        // Hash the password
        bcrypt.genSalt(10, async (err, salt) => {
            if (err) return res.status(500).send(err.message);

            bcrypt.hash(password, salt, async (err, hashedPassword) => {
                if (err) return res.status(500).send(err.message);

                // Create the new user
                const newUser = await User.create({
                    email,
                    password: hashedPassword,
                    fullname,
                });

                // Generate a token and set it in cookies
                const token = generateToken(newUser);
                res.cookie("token", token);
                res.send("User created successfully");
            });
        });
    } catch (err) {
        res.status(500).send(err.message);
    }
};

module.exports.loginUser = async function (req, res) {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await User.findOne({ where: { email } });
        if (!user) {
            req.flash("error", "Email or Password incorrect");
            return res.redirect("/");
        }

        // Compare the provided password with the stored hashed password
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) return res.status(500).send(err.message);

            if (isMatch) {
                // Generate a token and set it in cookies
                const token = generateToken(user);
                res.cookie("token", token);
                res.redirect("/shop");
            } else {
                req.flash("error", "Email or Password incorrect");
                res.redirect("/");
            }
        });
    } catch (err) {
        res.status(500).send(err.message);
    }
};

module.exports.logout = function (req, res) {
    // Clear the token from cookies
    res.cookie("token", "");
    res.redirect("/");
};
