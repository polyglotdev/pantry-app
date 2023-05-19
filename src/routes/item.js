const express = require('express');
const mongoose = require('mongoose');
const {ItemModel} = require('../models/Items')
const rateLimit = require('express-rate-limit');

const itemRouter = express.Router();

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
});

itemRouter.post('/newItem', limiter, async (req, res) => {
    const item = new ItemModel(req.body)
    try { 
        const response = await item.save()
        res.json(response)
    } catch (err) { 
        res.json(err) 
    }
});

itemRouter.get("/inventory", limiter, async (req, res) => {
    try { 
        const response = await ItemModel.find({})
        res.json(response)
    } catch (err) { 
        res.json(err) 
    }
})

module.exports = itemRouter;