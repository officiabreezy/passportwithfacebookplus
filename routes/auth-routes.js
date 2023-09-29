const router = require('express').Router();
const passport = require('passport');
const express = require('express');
const {userDetails, userSignup} = require("../config/passport-setup");

router.get('/login', (req, res) => {
    res.render('login',{user: req.user});
    
});

//router.get('/signup', (req, res) => {
   // res.render('signup');
//});

router.post("/signup", userSignup);  


router.get('/logout', (req, res) => {
    req.logout();
    
res.redirect('/');
});

    router.get('/google', passport.authenticate('google',{
    scope: ['profile']
    }));

    router.get('/facebook', passport.authenticate('facebook',{scope:['profile']} ));

    router.get('/google/redirect',passport.authenticate('google'),(req, res) => {
        res.redirect('/profile/');
    });
    router.get('/facebook/redirect',passport.authenticate('facebook'),(req, res) => {
        res.redirect('/profile/');
    });


module.exports = router;