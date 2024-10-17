const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken")

// signup controller
exports.signup = async (req, res) => {
  try {
    // fetch data
    const { email, password } = req.body;

    // validations
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "all fields are required",
      });

      // if already registered
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return res.status(401).json({
          success: false,
          message: "user is already registered please login",
        });
      }

      //   hash password and register
      const hashedPassword = await bcrypt.hast(password, 10);

      const user = new User({ email: email, password: hashedPassword });
      user.save();

      // register and return response
      return res.status(200).json({
        success: true,
        message: "User registered successgully",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      success: false,
      message: "Error occured",
    });
  }
};

// login Controller
exports.login = async (req, res) => {
  try {
    // fetch data
    const { email, password } = req.body;

    // validations
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).josn({
        success: false,
        message: "The user is not registered please regiter first",
      });
    }
    const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(200).json({
      success: true,
      message: "Login Successfully",
      jwtToken,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      success: false,
      message: "Cant login user",
    });
  }
};
