const passport = require('passport');
const express = require('express');
const router = express.Router();
const {userSignup, userLogin} = require("../config/passport-setup");

router.post('/signup', userSignup);
router.post('/login', userLogin);
  
//router.get('/',signup, (req, res) => {
 //   res.render('signup', { user: req.user})
//});


//app.post('/signup', async (req, res) => {
   // try {
      // Extract user data from req.body and handle signup logic
    //  const { userName, password, email } = req.body;
      
   //  res.status(200).send('Signup successful');
   // } catch (error) {
    //  console.error('Signup error:', error);
    //  res.status(500).send('Internal server error');
    //}
  //});
  
    // app.post('/signup', (req, res) => {
    // const { username, password } = req.body;
  
    // Validate user input
    // if (!username || !password) {
      //return res.status(400).json({ error: 'Username and password are required' });
    //}
  
     // const hashedPassword = hashPasswordFunction(password);
  
    // Create a new user document
    //const newUser = new User({
     // username: username,
     // password: hashedPassword,
      // Other user properties here
    //});
  
    // Save the new user to the database
   //  newUser.save((err) => {
     // if (err) {
       // console.error('Error registering user:', err);
       // return res.status(500).json({ error: 'Error registering user' });
      //}
  
      // User registration successful
      // Redirect to the login page or send a success response
     // res.redirect('/login');
   // });
  //});
  


module.exports = router;