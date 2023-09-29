const express = require('express');
const {AdminSignup, AdminLogin} = require('../config/admin');

const {isAuthenticated} = require('../middleware/jwt');
const router = require('express').Router();


router.post('/signup', AdminSignup);
router.post('/login', AdminLogin);
router.get('/protected-route', isAuthenticated);


module.exports = router;
