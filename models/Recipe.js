const mongoose = require("mongoose");
const recipeSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        category: {
            type: String,
            enum: [
                "Breakfast",
                "Lunch",
                "Dinner",
                "Snack",
                "Dessert",
            ],
            default: "Breakfast",
        },
        ingredients: {
            type: [String],
            required: true,
        },
        steps: {
            type: [String],
            required: true,
        },
        imageURI: {
            type: String,
            default: "",
        },
        cookingTime: {
            type: Number,
            required: true,
        },
        isPublic: {
            type: Boolean,
            default: true,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);
module.exports = mongoose.model("Recipe", recipeSchema);