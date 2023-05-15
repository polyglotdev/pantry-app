const mongoose = require('mongoose');
const express = require('express');
// const jwt = require('jsonwebtoken');
const { ItemModel } = require('../models/Items');
// const bcrypt = require('bcrypt');
// const dotenv = require('dotenv');

// dotenv.config();

const itemRouter = express.Router();

itemRouter.post('/newItem', async (req, res) => {
    const item = new ItemModel(req.body)

    try { const response = item.save() 
        res.json(response)
    } catch { res.json(err) }
});

item.Router.get("/inventory", async (req, res) => { 
    try { const response = await ItemModel.find({})
        res.json(response)
} catch { res.json(err) } 

})
    //let item = await UserModel.findOne({ item });

    /*if (item) {
        return res.status(400).json({ error: 'Username already exists' });
    }*/
    
module.export = itemRouter