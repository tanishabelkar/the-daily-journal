//jshint esversion:6

const express = require('express')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const mongoose = require('mongoose')
const lodash = require('lodash')

const app = express()

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))

mongoose.connect('mongodb://localhost:27017/blogDB')

const ingredientSchema = {
  name: String,
  quantity: Number,
  unit: String
}

const recipeSchema = {
  title: {
    type: String,
    required: true
  },
  content: String
}

const Post = mongoose.model('Post', recipeSchema)

app.get('/', function (req, res) {
  Post.find({}, function (err, posts) {
    res.render('home', { posts: posts })
  })
})

app.get('/about', function (req, res) {
  res.render('about')
})

app.get('/compose', function (req, res) {
  res.render('compose')
})

app.get('/posts/:x', function (req, res) {
  Post.findById(req.params.x, function (err, foundPost) {
    res.render('post', { post: foundPost })
  })
})

app.post('/compose', function (req, res) {
  Post.create({
    title: req.body.titleText,
    content: req.body.postText
  })
  res.redirect('/')
})

app.listen(3000, function () {
  console.log('Server started on port 3000')
})
