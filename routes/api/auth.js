// 'Required modules' section start

//'Downloaded modules' section start
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
//'Downloaded modules' section end

//'Developer-defined modules' section start
const auth = require("../../middleware/auth");
const config = require("config");
const jwt_secret = config.get("jwtSecret");
const User = require("../../models/User");
//'Developer-defined modules' section end

// 'Required modules' section end.



//@route    POST api/auth
//desc      Authenticate user and get token (Login)
//access    public (NO user authentication required)
router.post(
  "/",
  [
    check("email", "Valid email adress is required.").isEmail(),
    check("password", "Please enter a correct password").exists(),
  ],
  async (req, res) => {
    //'name,email and password validation' section starts
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //'name,email and password validation' section ends

    const { email, password } = req.body;

    try {
      //'See the user exists or not' section starts
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ errors: [{ msg: "Invalid email!" }] });
      }
      //'See the user exists or not' section ends
      //'See if the password is correct' section starts
      isMatched = await bcrypt.compare(password, user.password);
      if (!isMatched) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Incorrect password!" }] });
      }
      //'See if the password is correct' section ends

      //'Return jsonwebtocken' section starts
      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        jwt_secret,
        { expiresIn: 3600 * 24 * 30 },
        (err, token) => {
          if (err) {
            throw err;
          }
          res.json({ token }); //here I can response the user_id too
        }
      );
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
