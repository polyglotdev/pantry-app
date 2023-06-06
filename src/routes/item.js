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

itemRouter.get("/inventory/:user", limiter, async (req, res) => {
    try { 
        const response = await ItemModel.find({userOwner: req.params.user})
        res.json(response)
    } catch (err) { 
        res.json(err) 
    }
})

itemRouter.get('/:id', limiter, async (req, res) => {
    const itemId = req.params.id;
    try{
        const response = await ItemModel.findById(itemId)
        res.json(response)
    }
    catch (err) {
        res.json(err)
    }
})

itemRouter.put('/:id', limiter, async (req, res) => {
    const itemId = req.params.id;
    const updateData = req.body;
  
    try {
      const updatedItem = await ItemModel.findByIdAndUpdate(itemId, updateData, { new: true });
  
      if (!updatedItem) {
        return res.status(404).json({ error: 'Item not found' });
      }
  
      res.json(updatedItem);
    } catch (err) {
      res.status(500).json({ error: 'Internal server error' });
    }
});

itemRouter.delete('/:id', limiter, async (req, res) => {
    const itemId = req.params.id;

    try {
        const deletedItem = await ItemModel.findByIdAndDelete(itemId);

        if (!deletedItem) {
            return res.status(404).json({ error: 'Item not found' });
        }

        res.json(deletedItem);
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = itemRouter;