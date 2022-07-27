// 'Required modules' section start

//'Downloaded modules' section start
const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//'Downloaded modules' section end

//'Developer-defined modules' section start
const User = require("../../models/User");
const config = require("config");
const jwt_secret = config.get("jwtSecret");
//'Developer-defined modules' section end

// 'Required modules' section end.

//'Routes' section

//@route    POST api/user
//desc      register a user
//access    public (NO user authentication required)
router.post(
  "/",
  [
    check("name", "Name is required.").not().isEmpty(),
    check("email", "Valid email adress is required.").isEmail(),
    check(
      "password",
      "Please enter a password with atleast 6 characters."
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const { name, email, password } = req.body;

    //'name,email and password validation' section starts
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //'name,email and password validation' section ends
    try {
      //'See an user already exists or not' section starts
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }
      //'See an user already exists or not' section ends

 

      //'Creating User instance' section starts
      user = new User({
        name,
        email,
        password,

      });
      //'Creating User instacne section' ends

      //'Encrypt Password' section starts
      salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      //'Encrypt Password' section ends

      //'Save User' section starts
      await user.save();
      //'Save User' section ends

      //'Return jsonwebtocken' section starts
      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(payload, jwt_secret, { expiresIn: 36000000 }, (err, token) => {
        if (err) {
          throw err;
        }
        res.json({ token }); //here I can response the user_id too
      });
      //'Return jsonwebtocken' section ends
    } catch (err) {
      console.error(err.message);

      //'Send Response for error' section starts
      return res.status(500).send("Server Error!");
      //'Send Response for error' section ends
    }
  }
);

//'Routes' section end

//'Export' section start
module.exports = router;
//'Export' section end
