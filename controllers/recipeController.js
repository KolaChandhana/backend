const Recipe = require("../models/Recipe");
// CREATE RECIPE
const createRecipe = async (req, res) => {
    try {
        const {
            title,
            description,
            category,
            ingredients,
            steps,
            imageURI,
            cookingTime,
            isPublic,
        } = req.body;
        // VALIDATION
        if (
            !title ||
            !description ||
            !category ||
            !ingredients ||
            !steps ||
            !cookingTime
        ){
            return res.status(400).json({
                message: "All required fields must be filled",
            });
        }
        // CREATE NEW RECIPE
        const newRecipe = new Recipe({
            title,
            description,
            category,
            ingredients,
            steps,
            imageURI,
            cookingTime,
            isPublic,
            createdBy: req.userId,
        });
        await newRecipe.save();
        res.status(201).json({
            message: "Recipe Created Successfully",
            recipe: newRecipe,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
const getPublicRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find({
            isPublic: true,
        })
        .populate("createdBy", "firstName lastName")
        .sort({ createdAt: -1 });
        res.status(200).json(recipes);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
const getMyRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find({
            createdBy: req.userId,
        }).sort({ createdAt: -1 });
        res.status(200).json(recipes);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
const updateRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) {
            return res.status(404).json({
                message: "Recipe not found",
            });
        }
        if (recipe.createdBy.toString() !== req.user.id){
            return res.status(403).json({
                message: "Unauthorized",
            });
        }
        const updatedRecipe = await Recipe.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json({
            message: "Recipe Updated Successfully",
            recipe: updatedRecipe,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
const deleteRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);

        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }

        if (recipe.createdBy.toString() !== req.userId) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        await Recipe.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Recipe Deleted Successfully",
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
const getRecipeById = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id)
            .populate("createdBy", "name");

        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }

        res.status(200).json(recipe);
    } catch (error) {
        res.status(400).json({
            message: "Invalid Recipe ID",
            error: error.message,
        });
    }
};
module.exports = {
    createRecipe,
    getPublicRecipes,
    getMyRecipes,
    updateRecipe,
    deleteRecipe,
    getRecipeById,
};