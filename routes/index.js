const express     = require("express");
const router      = express.Router();
const passport    = require("passport");
const User        = require("../models/user");
const Textbook = require("../models/textbook");
const  nodemailer      = require("nodemailer");
const  crypto          = require("crypto"); //comes with it, dont have to install
const middleware     = require("../middleware"); 
const async = require("async");
const multer = require("multer");
const {cloudinary, storage} = require("../cloudinary/profile.js");
const upload = multer({storage});
const { errorHandler } = require("../middleware/promisehandler");
const request = require("request");

const { 
    
  updatePic,    
  destroyPic
  
} 

= require("../controllers/user")
//main page

router.get("/", function(req, res){
    

                    
    
    res.render("home.ejs");
    
    
})


router.get("/about", function(req, res){

    res.render("about.ejs");
    
})

router.get("/contact", function(req, res) {
    
    res.render("contact.ejs");
    
})

router.get("/privacy", function(req, res) {
    
    res.render("privacy.ejs");
    
})

router.get("/terms", function(req, res) {
    
    res.render("terms.ejs");
    
})

//show register form

router.get("/register", function(req, res) {
    
    res.render("register.ejs", {page: 'register'});
    
})


//handle sign up logic

router.post("/register", upload.array("avatar", 1), function(req, res){
    
    
    var newUser = new User({
        
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
         
    })
    
   User.findOne({ email: req.body.email }, function(err, user) {
        if (user) {
          req.flash('error', 'Account with that email address already exists.');
          return res.redirect("/register");
        }
   });
    
    User.register(newUser, req.body.password, function(err, user){
        
        if(err){

                //will display whether username is taken, no username was given, etc.
             req.flash("error", err.message);
            return res.redirect("/register");
            
        }
        
        passport.authenticate("local")(req, res, function(){
            
             req.flash("success", "Welcome to SellText, " +user.username);
            res.redirect("/");
            
            
        })
        
        
    })
    
})


//USER PROFILE


router.get("/users/:id", function(req, res) {
    
    
    User.findById(req.params.id, function(err, foundUser){
        
        if(err){
            
            req.flash("error", "Something went wrong :(");
            return res.redirect("/");
            
        }
        
        //finds where authorid equals user
        Textbook.find().where("author.id").equals(foundUser._id).populate({path: 'comments', populate: { path: 'replycomments' }}).exec(function(err, textbooks) {
        if(err){
            
            req.flash("error", "Something went wrong :(");
            return res.redirect("/");
            
        }
         
         res.render("users/show.ejs", {user: foundUser, textbooks: textbooks});
            
        
        })
        
        
    })
    
    
})

//place new updated info into database and over write it.
router.put("/users/:id", middleware.isLoggedIn, upload.array("avatar", 1), errorHandler(updatePic));
router.delete("/users/:id", middleware.isLoggedIn, errorHandler(destroyPic));

//show login form

router.get("/login", function(req, res) {

    res.render("login.ejs", {page: 'login'});
    
})


//handling login logic

router.post("/login", passport.authenticate("local", 
    
   { successRedirect: "/", successFlash: "Successfully Logged In",
     failureRedirect: "/login", failureFlash: "Incorrect username or password"
       
   }),  function(req, res) {
   

    
})

//logout route

router.get("/logout", function(req, res) {
    
    req.logout();
    req.flash("success", "Successfully Logged Out");
    res.redirect("/");
    
})


// forgot password
router.get('/forgot', function(req, res) {
  res.render('forgot.ejs');
});

router.post('/forgot', function(req, res, next) {
  async.waterfall([
    function(done) {
      crypto.randomBytes(20, function(err, buf) {
        var token = buf.toString('hex');
        done(err, token);
      });
    },
    function(token, done) {
      User.findOne({ email: req.body.email }, function(err, user) {
        if (!user) {
          req.flash('error', 'No account with that email address exists.');
          return res.redirect('/forgot');
        }
        
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

        user.save(function(err) {
          done(err, token, user);
        });
      });
    },
    function(token, user, done) {
      var smtpTransport = nodemailer.createTransport({
        service: 'Gmail', 
        auth: {
          user: 'selltextinfo@gmail.com',
          pass: process.env.GMAILPW
        }
      });
      var mailOptions = {
        to: user.email,
        from: 'selltextinfo@gmail.com',
        subject: 'SellText Password Reset',
        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          'http://' + req.headers.host + '/reset/' + token + '\n\n' +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n'
      };
      smtpTransport.sendMail(mailOptions, function(err) {
        console.log('mail sent');
        req.flash('success', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
        done(err, 'done');
      });
    }
  ], function(err) {
    if (err) return next(err);
    res.redirect('/forgot');
  });
});

router.get('/reset/:token', function(req, res) {
  User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
    if (!user) {
      req.flash('error', 'Password reset token is invalid or has expired.');
      return res.redirect('/forgot');
    }
    res.render('reset', {token: req.params.token});
  });
});

router.post('/reset/:token', function(req, res) {
  async.waterfall([
    function(done) {
      User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
        if (!user) {
          req.flash('error', 'Password reset token is invalid or has expired.');
          return res.redirect('back');
        }
        if(req.body.password === req.body.confirm) {
          user.setPassword(req.body.password, function(err) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;

            user.save(function(err) {
              req.logIn(user, function(err) {
                done(err, user);
              });
            });
          })
        } else {
            req.flash("error", "Passwords do not match.");
            return res.redirect('back');
        }
      });
    },
    function(user, done) {
      var smtpTransport = nodemailer.createTransport({
        service: 'Gmail', 
        auth: {
          user: 'selltextinfo@gmail.com',
          pass: process.env.GMAILPW
        }
      });
      var mailOptions = {
        to: user.email,
        from: 'selltextinfo@mail.com',
        subject: 'SellText Password Reset',
        text: 'Hello,\n\n' +
          'This is a confirmation that the password for your account ' + user.username + ' has just been changed.\n'
      };
      smtpTransport.sendMail(mailOptions, function(err) {
        req.flash('success', 'Success! Your password has been changed.');
        done(err);
      });
    }
  ], function(err) {
    res.redirect('/');
  });
});



module.exports = router;