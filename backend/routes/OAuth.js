// OAuth imports
// const partials = require('express-partials');
// const session = require('express-session');
// const passport = require('passport');
// const GitHubStrategy = require('passport-github2').Strategy;

// // OAuth variable declarations
// const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
// const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

// Passport Configuration
// passport.use(
//   new GitHubStrategy({
//     clientID: process.env.GITHUB_CLIENT_ID,
//     clientSecret: process.env.GITHUB_CLIENT_SECRET,
//     callbackURL: "http://localhost:3000/auth/github/callback",
//   },
//   (accessToken, refreshToken, profile, done) => {
//     done(null, profile);
//   })
// );

// passport.serializeUser((user, done) => {
//   done(null, user);
// });

// passport.deserializeUser((user, done) => {
//   done(null, user);
// });

// // Express Projects Setup
// app.use(partials());

// app.use(
//   session({
//     secret: 'sportsGalore',
//     resave: false,
//     saveUninitialized: false,
//   })
// );

// app.use(passport.initialize());
// app.use(passport.session());

// // OAuth Routes
// app.get('/auth/github', 
//   passport.authenticate('github')
// );

// app.get('auth/github/callback', 
//   passport.authenticate('github', {
//     failureRedirect: '/login',
//     successRedirect: '/',
//   })
// );

// Ensure Authentication Callback Function
// function ensureAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) {
//     return next();
//   } else {
//     res.redirect('/login');
//   }
// }


// Sign in handle submit remove later

const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
        setErrorMessage('All fields are required.');
    }
    try {
        setLoading(true);
        setErrorMessage(null);
        const res = await fetch('http://localhost:3001/users/login', {
            method: "POST",
            headers: {
                "Content-type" : "application/json",
            },
            body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (data.success === false) {
            setErrorMessage(data.message);
        }
        setLoading(false);

        if (res.ok) {
            navigate("/profile");
        }
    } catch (error) {
        setErrorMessage(error.message);
        setLoading(false);
    }
};