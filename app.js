const express = require('express');
const { connect } = require('http2');
const dotenv = require('dotenv').config();
const passport = require('passport');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/signupRoutes');
const port = process.env.PORT || 2020;
const connectDB = require('./database/db');
const session = require('express-session');
const passportSetup = require('./config/passport-setup');
const bodyParser = require('body-parser');


connectDB();
const app = express();

app.use(session({
    secret: 'process.env.keys',
  //secret: 'keyboard cat',\
   resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,}
   //cookie: { secure: true }
  }))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);

app.get('/', (req, res) => {
  const user = req.user;
  res.render('home',{ user: user });
  // res.render('home');
   console.log('welcome');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/signup', (req, res) => {
  //console.log('');
  
  const username = req.body.username;
  const password = req.body.password;
});



app.listen(port, () => {
    console.log(`listening on http://localhost:${port}`);
});