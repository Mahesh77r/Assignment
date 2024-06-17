const AdminSchema = require("../models/UserSchema.js");
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");


const registerAdmin = async (req, res) => {
  
};


const loginAdmin = async (req, res) =>{
    try {
        // take a value from user end
  const { email, password } = req.body;

  // Validate user input
  if (!(email && password)) {
    res.status(400).send("All input is required");
    return;
  }

  const userExist = await AdminSchema.findOne({ email: email });

  if (userExist && (await bcrypt.compare(password, userExist.password))) {
    // generate jwt token
    const token = jwt.sign(
      {
        user_id: userExist._id,
        email,
      },
      process.env.TOKEN_KEY
    );

    // save user token
    userExist.token = token;

    // save user token in data base but there is no need to save it
    await userExist.save();

    return res.status(200).json({
      user: userExist,
      success: true,
      message: "login Successfull",
    });
  } else {
    return res.status(202).json({
      success: false,
      message: "Login failed",
    });
  }
    } catch (error) {
        return res
        .status(500)
        .json({ success: false, error: `Error in logging Admin ${error}` });
    
    }
}


module.exports = { registerAdmin,loginAdmin };
