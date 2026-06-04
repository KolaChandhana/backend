const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// REGISTER USER
const registerUser = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            phone,
            addressLine1,
            addressLine2,
            pincode,
            city
        } = req.body;
        if (!firstName || !lastName || !email || !password || !phone) {
            return res.status(400).json({
                message: "All required fields are required",
            });
        }
        const pinRegex = /^[0-9]{6}$/;
        if (!pinRegex.test(pincode)) {
            return res.status(400).json({
                message: "Pincode must be 6 digits",
            });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists",
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            phone,
            addressLine1,
            addressLine2,
            pincode,
            city,
        });
        await newUser.save();
        res.status(201).json({
            message: "User Registered Successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
// LOGIN USER
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required",
            });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "User not found",
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid password",
            });
        }
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );
        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phone: user.phone,
                city: user.city,
            },
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
module.exports = {
    registerUser,
    loginUser,
};