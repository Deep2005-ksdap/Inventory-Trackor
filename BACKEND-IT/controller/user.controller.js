const userModel = require("../model/user.model");
const { validationResult, check } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const passwordHashing = async (password) => {
  const hashPass = await bcrypt.hash(password, 12);
  return hashPass;
};

const comparePassword = (password, hash) => {
  return bcrypt
    .compare(password, hash)
    .then((isMatch) => {
      return isMatch;
    })
    .catch((err) => {
      console.error("Error comparing password:", err);
      throw err;
    });
};

exports.registerUser = [
  check("fullname.firstname")
    .isLength({ min: 3 })
    .withMessage("First name should be at least 3 characters long"),
  check("email").isEmail().withMessage("Invalid email format"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),

  async (req, res) => {
    try {
      const { fullname, email, password } = req.body;
      const firstname = fullname?.firstname;
      const lastname = fullname?.lastname;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          message: "Validation failed",
          errors: errors.array(),
        });
      }

      const existingUser = await userModel.User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          message: "Invalid email or password",
        });
      }

      const hassPassword = await passwordHashing(password);
      const newUser = new userModel.User({
        fullname: {
          firstname,
          lastname,
        },
        email,
        password: hassPassword,
      });

      const user = await userModel.User.create(newUser);
      if (user) {
        res.status(200).json({
          message: "User has been Created",
        });
      }
    } catch (error) {
      console.error("Error in Registration:", error);
      return res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },
];

exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  
  const user = await userModel.User.findOne({ email });
  if (!user) {
    return res.status(400).json({
      message: "Email or Password is incorrect",
    });
  }

  const isMatch = comparePassword(password, user.password);
  if (!isMatch) {
    return res.status(400).json({
      message: "Email or Password is incorrect",
    });
  }

  jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" },
    (err, token) => {
      if (err) {
        console.error("Error signing JWT:", err);
        return res.status(500).json({
          message: "Internal server error",
          error: err.message,
        });
      }
      res.cookie("token", token, { httpOnly: true }); //prevent from xss attack
      return res.status(200).json({
        isLoggedIn: true,
        message: "Login successful",
      });
    }
  );
};

exports.logoutUser = (req, res, next) => {
  res.clearCookie("token");
  return res.status(200).json({
    message: "Logout successful",
  });
};
