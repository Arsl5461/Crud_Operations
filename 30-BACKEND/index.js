const express = require("express");
const cors = require("cors");
// require('./database/config');
const dbConnection = require("./database/config.js");
const dotenv = require("dotenv");
const User = require("./database/User");
const app = express();
const bcrypt = require("bcrypt");

app.use(express.json());
app.use(cors());

app.get("/", (req, resp) => {
  resp.send("<h1>This is home page</h1>");
});

app.post("/register", async (req, resp) => {
  let { email, name, password } = req.body;
  const saltRounds = 10;

  const hashedPassword = await bcrypt.hash(password, saltRounds);
  req.body.password = hashedPassword;

  let abc = await User.create(req.body);

  resp.send(abc);
});
app.post("/login", async (req, res) => {
  let { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        console.error("Error comparing passwords:", err);
      } else if (isMatch) {
        res.json({
          status: 200,
          success: true,
          message: "User Logged in successfully",
        });
        // Allow the user to log in or perform the desired action
      } else {
        res.json({
          status: 500,
          success: false,
          message: "Internal Server error",
        });

        // Passwords don't match, reject the login attempt
      }
    });
  } else {
    console.log("User not found");
  }
});

app.get("/registerUser", async (req, res) => {
  let userData = await User.find();
  // let result = userData.json()
  if (userData.length > 0) {
    res.send(userData);
  } else {
    res.send({ msg: "No user Data found in Database", userData: userData });
  }
});

app.delete("/user/:id", async (req, resp) => {
  // resp.send(req.params)
  let user = await User.deleteOne({ _id: req.params.id });
  if (user) {
    resp.send(user);
  } else {
    resp.send({ msg: "No record found" });
  }
});

app.get("/userdetail/:id", async (req, resp) => {
  let result = await User.findOne({ _id: req.params.id });
  if (result) {
    resp.send(result);
  } else {
    resp.send({ msg: "No user found" });
  }
});

app.put("/userupdate/:id", async (req, resp) => {
  const id = req.params.id;
  let data = await User.findOneAndUpdate({ id }, { $set: req.body });
  resp.send(data);
});

PORT = process.env.PORT || 4000;

const startServer = () => {
  try {
    dbConnection();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT} in ${process.env.MODE}`);
    });
  } catch (error) {
    console.log("Error in connection");
  }
};

startServer();
dotenv.config();

// findByIdAndUpdate creates a problem of finding ID while the findOneAndUpdate does not create a error
