const express = require("express");
const router = express.Router();
const User = require("../models/user");
const AppError = require("../controlError/AppError");
const wrapAsync = require("../controlError/wrapasync");
const passport = require("passport");
const { body,check } = require('express-validator');
const {isLoggedIn}=require("../middleware");
const { defaultMaxListeners } = require("events");
router.get("/", async (req, res) => {
   res.render("home",{
     user:req.user
   });
});

router.get(
  "/register",
  wrapAsync(async (req, res, next) => {
    const name="";
    const email="";
    
    res.render("register", {name,email});
  })
);

router.post(
  "/register",
  wrapAsync(async (req, res, next) => {
    try {
      const {name,email,password,password2} = req.body;
      if (password != password2) {
        // errors.push({ msg: 'Passwords do not match' });
      return res.render("register",{name,email,password,password2});
      }
      if (password.length < 6) {
        return res.render("register",{name,email,password,password});
      }
    
      const user = new User({ name,username:email,email });
      const registeredUser = await User.register(user, password);
      // req.login(registeredUser, (err) => {
      //   if (err) return next(err);
        
      //   res.redirect("/login");
      // });
      if(typeof registeredUser!="undefined"){
        res.redirect("/login");
      }
      else{

        res.redirect("/register");
      }
    } catch (e) {
      req.flash("error", e.message);
      res.redirect("/register");
    }
  })
);
router.get("/login", (req, res) => {
  res.render("login");
});
router.post(
  "/login",
  passport.authenticate("local", {
    failureFlash: true, 
    failureRedirect: "/login",
  }),
  (req, res) => {
    req.flash("success", "welcome back!");
      const redirectUrl ="/detail/addmoreinformation";
      delete req.session.returnTo;
      res.redirect(redirectUrl);
    }
  
);
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success", "You have Logged out successfully!");
  res.redirect("/login");
});
module.exports = router;
