const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mongoose =  require('mongoose');

const app = express();

app.set('view engine', 'ejs');

const db = require('./config/DB').mongoURI;
const Blog = require('./models/blogs');

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('mongodb connected'))
  .catch(err => console.log(err));

app.use(express.static('public'));
app.use(morgan('dev'));


app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'about' });
});

app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'blogs' });
});

app.get('/blogs', (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then(result => res.render('index', { title: 'All Blogs', blogs: result }))
    .catch(err => console.log(err));
});

app.use((req, res) => {
  res.status(404).render('404', { title: 'Not found' });
});

app.listen(5000, () => console.log('server running on port 5000')); 