const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const User= require('../models/user.models');

const forwardNeedSchema = require('../models/user.models');

const express = require('express');
const bcrypt = require('bcryptjs');
const saltRounds = 10;


const AdminSignup = async (req, res) => {
    try {
        const {userName, email, password} = req.body;
        const existingUser = await User.findOne({ email: email});

        if(existingUser){
           return res.status(400).json({ message: 'Admin already exists'});
        }
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new User({
            userName:userName,
            email:email,
            password:hashedPassword,
            role: 'admin'
          });
          await newUser.save();
          return res.status(201).json({message: 'Admin created successfully'});
          
    } catch (error) {
        console.error(error);
        return res.status(500).json({error:'something went wrong creating admin'});
    }; 
}


const AdminLogin = async (req, res) => {
    try {
        const {userName, password} = req.body;
        const user = await User.findOne({userName: userName});
      if(!user) {
        return res.status(404).json({message:'admin not found'});
      }
      if(user.role!== 'admin'){
        return res.status(401).json({message:'you are not authorized'});
      };

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(404).json({message:'password mismatch'});
      };

      const expirationTime = process.env.expiresIn||'2d';
      const payload = {
        userId: user.id,
      };

      const token = jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {expiresIn: expirationTime}
        );

        const dataInfo = {
            status: 'sucess',
            message: 'admin logged successfully',
            access_token: token
        }
        console.log(dataInfo);
        return res.status(201).json({dataInfo: dataInfo});
    } catch (error) {
        console.error(error);
        return res.status(500).json({error: 'something went wrong logging you in'});
 }
    }



    module.exports = {AdminSignup, AdminLogin};