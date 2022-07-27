// 'Required modules' section start

//'Downloaded modules' section start

const express = require("express");
const multer = require("multer");
const cors = require("cors");
var bodyParser = require("body-parser");
//'Downloaded modules' section end

//'Developer-defined modules' section start
const connectDB = require("./config/db");
//'Developer-defined modules' section end

// 'Required modules' section end.

//'Connect to Database' section start
connectDB();
// 'Connect to Database' section end

// 'initialization' section start
app = express();
//'Initialize MIDDLEWARES' section starts
// Cors;
// create application/json parser
let jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
let urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(
  cors({
    origin: function (origin, callback) {
      const regularEx = RegExp("localhost:3000$", "i");

      if (regularEx.test(origin)) {
        callback(null, true);
      } else {
        callback(null, false);
      }
    },
  })
);

app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: true }));
//'Initialize MIDDLEWARES' section ends
PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started at port: ${PORT}`);
});
//'initialization' section end

//'Define Routes' section start


app.use("/api/user", require("./routes/api/user"));
app.use("/api/auth", require("./routes/api/auth"));

//'Define Routes ' section end
