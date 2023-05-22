const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const userRouter = require('../src/routes/users')
const itemRouter = require('../src/routes/item')

dotenv.config()

const app = express()


app.use(cors())
app.use(express.json())
app.use("/auth", userRouter)
app.use("/item", itemRouter)


mongoose.connect(`mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD_NAME}@cluster0.hfturxs.mongodb.net/${process.env.TEST}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB Atlas')
})
  .catch(error => {
    console.error(error)
  })


const port = process.env.PORT || 3001
app.listen(port, () => {
  console.log(`🚀 listening on port ${port}`)
})