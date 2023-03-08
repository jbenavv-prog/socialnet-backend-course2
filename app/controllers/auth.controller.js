const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Account = require("../models/account.model");
const saltRounds = 10;
const { PRIVATE_KEY } = process.env;

const login = async (req, res) => {
  try {
    const user = req.body;

    const userDB = await Account.findOne({ email: user.email });

    if (!userDB) {
      return res.status(404).json({
        ok: false,
        message: "User doesn´t exist, please signup",
      });
    }

    console.log(userDB);

    const passwordMatch = await bcrypt.compare(user.password, userDB.password);
    console.log(passwordMatch);

    if (!passwordMatch) {
      return res.status(401).json({
        ok: false,
        message: "Invalid password",
      });
    }

    const token = jwt.sign(
      {
        email: userDB.email,
        fullName: userDB.fullName,
      },
      PRIVATE_KEY
    );

    return res.status(200).json({
      ok: true,
      token,
    });
    
  } catch (error) {
    res.send(error.message);
  }
};

const signup = async (req, res) => {
  try {
    const user = req.body; // { fullName, password, email }

    const exists = await Account.exists({ email: user.email });

    if (exists) {
      return res.status(409).json({
        ok: false,
        message: "Account already exist",
      });
    }

    const passwordHash = await bcrypt.hash(user.password, saltRounds);

    user.password = passwordHash;
    await Account.create(user);

    const token = jwt.sign(
      {
        email: user.email,
        user: user.fullName,
      },
      PRIVATE_KEY
    );

     return res.status(201).json({
      ok: true,
      token,
    });

  } catch (error) {
    return res.status(400).json({
      ok: false,
      message: error.message,
    });
  }
};

module.exports = {
  login,
  signup,
};
