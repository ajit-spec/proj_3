require('dotenv').config()
const express = require('express')
const app = express()
const loginroutes = require('./routes/login')
const productroutes = require('./routes/product')
const cartroutes = require('./routes/cart')
const cors = require('cors')
const path = require('path')

app.listen(process.env.PORT)
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true, useUnifiedTopology: true});

app.use(express.json())
app.use(cors())

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, '../dist/client')))

app.use(loginroutes)
app.use(productroutes)
app.use(cartroutes)

app.get(
  '/*',
  (req, res) => {
    res.sendFile(
      path.join(__dirname, '../dist/client/index.html')
    )
  }
)


app.use((req, res) => {
    res.json(
        {
            status: 0,
            msg: '404 error'
        }
    )
})
