const express = require('express');
const morgan = require('morgan');
const mongoose =  require('mongoose');

const app = express();
app.set('view engine', 'ejs');

const db = require('./config/DB').mongoURI;

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('mongodb connected'))
  .catch(err => console.log(err));

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'about' });
});

// Blog routes

app.use('/', require('./routes/blogRoutes'));


app.use((req, res) => {
  res.status(404).render('404', { title: 'Not found' });
}); 

app.listen(5000, () => console.log('server running on port 5000')); 