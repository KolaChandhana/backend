const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
{
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: function(value) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            },
            message: "Enter valid email",
        },
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        validate: {
            validator: function(value) { 
                
                return /^[0-9]{10}$/.test(value);
            },
            message: "Phone must be exactly 10 digits",
        },
    },
    addressLine1: String,
    addressLine2: String,
    pincode: {
        type: String,
        validate: {
            validator: function(value) {
                return /^[0-9]{6}$/.test(value);
            },
            message: "Pincode must be 6 digits",
        },
    },
    city: String,
},
{
    timestamps: true,
});
module.exports = mongoose.model("User", userSchema);