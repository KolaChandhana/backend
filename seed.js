const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Recipe = require("./models/Recipe");
dotenv.config();
const userId = new mongoose.Types.ObjectId();
const seedRecipes = [
    {
        title: "Fluffy Pancakes",
        description: "Soft, golden pancakes with maple syrup.",
        category: "Breakfast",
        ingredients: [
            "1 cup flour",
            "1 tbsp sugar",
            "1 tsp baking powder",
            "1 egg",
            "3/4 cup milk"
        ],
        steps: [
            "Sift flour, sugar, and baking powder into a bowl",
            "In another bowl, whisk egg and milk until smooth",
            "Slowly mix wet ingredients into dry mixture",
            "Let batter rest for 5–10 minutes",
            "Heat pan and pour batter in small circles",
            "Cook until bubbles form, then flip",
            "Cook until golden brown",
            "Serve hot with maple syrup and butter"
        ],
        imageURI: "/images/BreakFast.png",
        cookingTime: 20,
        isPublic: true,
        createdBy: userId
    },

    {
        title: "Greek Salad Bowl",
        description: "Fresh veggies, olives, feta cheese.",
        category: "Lunch",
        ingredients: [
            "Cucumber",
            "Tomato",
            "Olives",
            "Feta cheese",
            "Olive oil"
        ],
        steps: [
            "Wash all vegetables thoroughly",
            "Chop cucumber, tomato, and onion into bite-sized pieces",
            "Add olives and feta cheese cubes",
            "Prepare olive oil dressing with salt and pepper",
            "Toss everything gently in a bowl",
            "Serve fresh and chilled"
        ],
        imageURI: "/images/Lunch.png",
        cookingTime: 15,
        isPublic: true,
        createdBy: userId
    },

    {
        title: "Mango Cheesecake",
        description: "No-bake mango cheesecake with biscuit base.",
        category: "Dessert",
        ingredients: [
            "Biscuit crumbs",
            "Butter",
            "Cream cheese",
            "Mango puree",
            "Sugar"
        ],
        steps: [
            "Crush biscuits and mix with melted butter",
            "Press mixture into cake mold and refrigerate",
            "Beat cream cheese until smooth and fluffy",
            "Add sugar and mango puree, mix well",
            "Pour mixture over base layer",
            "Refrigerate for at least 4–6 hours",
            "Garnish with mango slices before serving"
        ],
        imageURI: "/images/Dessert.png",
        cookingTime: 45,
        isPublic: true,
        createdBy: userId
    },

    {
        title: "Spicy Chicken Curry",
        description: "Rich and spicy Indian chicken curry.",
        category: "Dinner",
        ingredients: [
            "Chicken",
            "Onion",
            "Tomato",
            "Spices",
            "Garlic"
        ],
        steps: [
            "Heat oil in a pan and sauté onions until golden",
            "Add ginger-garlic paste and cook well",
            "Add tomatoes and spices, cook until oil separates",
            "Add chicken pieces and mix well",
            "Cook on medium heat for 10–15 minutes",
            "Add water and simmer until chicken is tender",
            "Garnish with coriander leaves and serve hot"
        ],
        imageURI: "/images/Dinner.jpg",
        cookingTime: 50,
        isPublic: true,
        createdBy: userId
    }
];
const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDB Connected");
        await Recipe.deleteMany();
        await Recipe.insertMany(seedRecipes);
        console.log("🌱 RecipeBook Seed Data Inserted Successfully");
        process.exit();
    } catch (error) {
        console.log("Seed Error:", error.message);
        process.exit(1);
    }
};
seedDB();