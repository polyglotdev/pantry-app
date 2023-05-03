import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const serverapp = express();

serverapp.use(cors());
serverapp.use(express.json());

mongoose.connect('mongodb+srv://cevandonica:TJxAYqNTxOwer1ld@cluster0.hfturxs.mongodb.net/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

serverapp.listen(3001, () => console.log('SERVER IS RUNNING'));