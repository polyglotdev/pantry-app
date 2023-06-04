const express = require('express');
const mongoose = require('mongoose');
const { type } = require('os');
const { useHref } = require('react-router');
import itemModel from "./Items"
const axios = require("axios")

const RecipeSchema = new mongoose.Schema({
    id: {type: Number, required: true, unique: true},
    title: {type: string, required: true},
    image: {type: string, required: false},
    usedIngredientCount: {type: Number, required: true},
    missedIngredientCount: {type: Number, required: true},
    likes: {type: Number, required: true},
});

RecipeSchema.methods.findRecipe() = async function() {
    if(ItemSchema.methods.isBelowMinimum === true) { 
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
    }
}