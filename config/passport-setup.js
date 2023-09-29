const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const dotenv = require('dotenv').config();
const User = require('../models/user.models');
const ForwardNeeded = require('../models/user.models');
const nodemailer = require('nodemailer'); // Corrected the import
const bcrypt = require('bcryptjs');
const saltRounds = 10

passport.use(
    new GoogleStrategy({
        clientID: "501482956175-iab06c9e1i30njes1bcrc4pi88o2nbf7.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: '/auth/google/redirect'
    }, async (accessToken, refreshToken, profile, done) => {
        User.findOne({ googleId: profile.id }).then((currentUser) => {
            if (currentUser) {
                // User already exists, return the user
                done(null, currentUser);
            } else {
                // If not, create a new user in your database
                new User({
                    googleId: profile.id,
                    username: profile.displayName,
                    thumbnail: profile._json.picture
                }).save().then((newUser) => {
                    done(null, newUser);
                });
            }
        });
    })
);

passport.use(
    new FacebookStrategy({
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: '/auth/facebook/redirect',
        profileFields: ['emails', 'displayName', 'name', 'picture']
    }, async (accessToken, refreshToken, profile, done) => {
        User.findOne({ facebookId: profile.id }).then((currentUser) => {
            if (currentUser) {
                done(null, currentUser);
            } else {
                new User({
                    facebookId: profile.id,
                    username: profile.displayName,
                    thumbnail: profile.photos[0].value // Use photos array for Facebook
                }).save().then((newUser) => {
                    done(null, newUser);
                });
            }
        });
    })
);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});

const userSignup = async (req, res) => {
    try {
        const { userName, password, email } = req.body;
        const existingUser = await User.findOne({ email: email });

        if (existingUser) {
            return res.status(409).json({ error: 'User already exists' }); // Changed status code to 409 for conflict
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new User({
            userName: userName,
           password: hashedPassword,
             email: email
        });
        await newUser.save();
        console.log(newUser);
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.USER_EMAIL,
                pass: process.env.USER_PASSWORD,
            },
        });

        const mailOptions = {
            from: process.env.USER_EMAIL,
            to: newUser.email,
            subject: "Welcome to Schoolie Platform",
            text: "If you wish to find out more about Schoolie Platform, please reach out to us via the app chat. - The Schoolie Team",
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Error occurred:", error);
            } else {
                console.log("Email sent:", info.response);
            }
        });

        return res.status(201).json({ message: "User created" });
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ error: "Internal server error" }); // Changed status code to 500 for internal server error
    }
};


const userLogin = async (req, res) => {
    const { userName, password } = req.body;
    try {
       const user = await User.findOne({userName, password});
       if (!user) {
        return res.status(401).json({message: "invalid userName or password"});
       }
        const passwordMatch = await bcrypt.compare(user.password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({message: "invalid password or password"});
        }

        const token = jwt.sign({ userId : user.id}, process.env.JWT_SECRET, { expiresIn: process.env.expiresIn });
        res.status(200).json({ token });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'something went wrong logging in' });
    }
};


module.exports = { userSignup, userLogin};
