const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
    createRecipe,
    getPublicRecipes,
    getMyRecipes,
    updateRecipe,
    deleteRecipe,
    getRecipeById,
} = require("../controllers/recipeController");
router.get("/public", getPublicRecipes);
router.post("/create", authMiddleware, createRecipe);
router.get("/myrecipes", authMiddleware, getMyRecipes);
router.put("/update/:id", authMiddleware, updateRecipe);
router.delete("/:id", authMiddleware, deleteRecipe);
router.get("/", getPublicRecipes);
router.get("/:id", getRecipeById);
module.exports = router;