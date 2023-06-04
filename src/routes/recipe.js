const express = require('express');
const mongoose = require('mongoose');
const {ItemModel} = require('../models/Items')
const rateLimit = require('express-rate-limit');
const { default: Recipe } = require('../Recipe');

const itemRouter = express.Router();

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
});


recipeRouter.get("/recipe", limiter, async (req, res) => {
    const options = {
        method: 'GET',
        url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients',
        params: {
          ingredients: 'apples,flour,sugar',
          number: '5',
          ignorePantry: 'true',
          ranking: '1'
        },
        headers: {
          'X-RapidAPI-Key': 'c883edf72cmsh691365ccd2a6265p1994ccjsn53773d84f5d8',
          'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
        }
      };
      
      try {
          const response = await axios.request(options);
          console.log(response.data);
      } catch (error) {
          console.error(error);
      }
    };

    module.exports = recipeRouter