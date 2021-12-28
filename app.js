require("dotenv").config();

const express              = require("express"),
    mongoose             = require("mongoose"),
    methodOverride       = require("method-override"),
    bodyParser           = require("body-parser"),
    passport             = require("passport"),
    LocalStrategy        = require("passport-local"),
    flash                = require("connect-flash"),//flash messages
    cloudinary = require("cloudinary"),
    async = require("async"),
    multer = require("multer"),
    sslRedirect = require("heroku-ssl-redirect");

    
    //include models
    var Textbook = require("./models/textbook"),
        User     = require("./models/user"),
        Comment  = require("./models/comment");   


//create variables for routes
var RegisterRoutes       = require("./routes/index"),
    TextbookRoutes       = require("./routes/textbooks"),
    commentRoutes       = require("./routes/comments"),
    replycommentRoutes = require("./routes/replycomments");

var app = express();
app.set('view engine', 'ejs');
mongoose.connect('mongodb://localhost:27017/selltext', { useNewUrlParser: true });

//mongoose.set('useCreateIndex', true);


//app.use functions
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public")); 
app.use(methodOverride("_method"));
app.use(flash());
app.use(sslRedirect());
//create variable moment that will be used to tell present time for comments and campgrounds posted.
app.locals.moment = require("moment");




// PASSPORT CONFIGURATION

 
    app.use(require("express-session")({
        
        secret: "Roxy and Bella are the best bics",
        resave: false,
        saveUninitialized: false
                
        
    }));
    
    app.use(passport.initialize());
    app.use(passport.session());
    passport.use(new LocalStrategy(User.authenticate()));
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());
   


//******WILL PASS THE "currentUser=req.user" INTO EVERY SINGLE ROUTE (check header.ejs)
app.use(function(req, res, next){
    
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
    
    
});



app.use(RegisterRoutes);
app.use("/UVIC/:id/comments", commentRoutes);
app.use("/UVIC/:id/comments/:comment_id/replycomments", replycommentRoutes);
app.use("/UVIC", TextbookRoutes);
app.use("/camosun/:id/comments", commentRoutes);
app.use("/camosun", TextbookRoutes);

app.listen(process.env.PORT,process.env.IP, function(){
    
    console.log("SERVER STARTING..");
    
    
});