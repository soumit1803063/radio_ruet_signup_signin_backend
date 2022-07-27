// 'Required modules' section start

//'Downloaded modules' section start
const jwt = require("jsonwebtoken");
//'Downloaded modules' section end

//'Developer-defined modules' section start
const config = require("config");
const jwt_secret = config.get("jwtSecret");
//'Developer-defined modules' section end

// 'Required modules' section end.

//'Export' section start
module.exports = function (req, res, next) {
  const token = req.header("x-auth-token"); //Get token from the header
  if (!token) {
    //check if there is no token
    return res.status(400).json({ msg: "No token.Authorization denied!" });
  }

  //'Verify the token' section starts
  try {
    const decoded = jwt.verify(token, jwt_secret);
    req.user = decoded.user;
  } catch (err) {
    return res.status(401).json({ msg: "Token is not valid!" }); //Token is not valid
  }
  //'Verify the token' section ends

  next();
};
//'Export' section end
