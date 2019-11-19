var express = require("express");
var User = require("../models/user");
var { registerValidator,loginValidator } = require("../validators/authValidator");
var bcrypt = require('bcrypt');
var router = express.Router();

router.post("/register", async (req, res) => {
  const {name,email,password} = req.body;

  const emailExists = await User.findOne({email});

  //Check if email already exists.
  if(emailExists){
    return res.status(400).send('Email already exists.');
  };

  //hash the password using bcrypt.
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password,salt);

  //create a new user if the email does not exist.
  var newUser = new User({
    name,
    email,
    password:hashedPassword
  });

  //validate the entered information.
  const { error } = registerValidator(req.body);

  // if failed validation.
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  //if success validation.
  try {
    var savedUser = await newUser.save();
    res.send({user:savedUser._id});
  } catch (err) {
    res.status(400).send(err);
  }
});

//LOGIN

router.post('/login',async (req,res)=>{
  // what is the data which is coming in?
  const {email,password} = req.body;

  //validate the information.
  var {error} = loginValidator(req.body);

  //validation errors.
  if(error){
    return res.status(400).send(error.details[0].message);
  }

  //check if the is there in the database.
  var userExists = await User.findOne({email});
  if(!userExists){
    return res.status(400).send("User doesn't exist, Please register before logging in.");
  }
  //compare the passwords.
  const passwordMatch = await bcrypt.compare(password,userExists.password);
  if(!passwordMatch){
   return res.status(400).send("Incorrect password.");
  }

  //if no error.
  res.status(200).send('Logged in successfully.');

});


module.exports = router;
