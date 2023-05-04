const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();


app.use(cors());
app.use(express.json());

mongoose.connect(`mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD_NAME}@cluster0.hfturxs.mongodb.net/test`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch(error => {
    console.error(error);
  });
;

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});