const express = require('express')
const app = express()
const port = 4000

const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')

const Post = require('./models/post-model')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
mongoose.connect("mongodb://127.0.0.1:27017/posts", {useNewUrlParser: true})
const connection = mongoose.connection

connection.once('open', () => console.log('mongoose is connected'))

app.get('/', (req, res) => {
  Post.find((err, posts) => {
    if (err) res.send('err')
    else res.send(posts)
  })
})

app.listen(port, () => {console.log('running on port ' + port)})