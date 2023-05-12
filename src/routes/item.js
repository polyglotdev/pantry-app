const express = require('express');
const mongoose = require('mongoose');
const {ItemModel} = require('../models/Items')

const itemRouter = express.Router();

itemRouter.post('/newItem', async (req, res) => {
    const item = new ItemModel(req.body)
    try { 
        const response = await item.save()
        res.json(response)
    } catch (err) { 
        res.json(err) 
    }
});

itemRouter.get("/inventory", async (req, res) => {
    try { 
        const response = await ItemModel.find({})
        res.json(response)
    } catch (err) { 
        res.json(err) 
    }
})

module.exports = itemRouter;