const User = require("../models/user");
const config = require("../config.js");
const jwt = require("jwt-simple");

exports.login = async function (req, res) {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const payload = { 
      id: user.id, 
      expire: Date.now() + 1000 * 60 * 60 * 24 * 7 
    };

    const token = jwt.encode(payload, config.jwtSecret);
    res.json({ token: token });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


exports.register = function (req, res) {
  User.register(
    new User({ 
      email: req.body.email, 
      username: req.body.username 
    }), req.body.password, function (err, msg) {
      if (err) {
        res.send(err);
      } else {
        res.send({ message: "Successful" });
      }
    }
  );
};

exports.profile = function(req, res) {
  res.json({
    message: 'You made it to the secured profile',
    user: req.user,
    token: req.query.secret_token
  })
}