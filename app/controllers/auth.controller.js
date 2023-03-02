const Account = require("../models/account.model");

const login = (req, res) => {
  try {
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

    await Account.create(user);
    return res.status(201).json({
      ok: true,
      message: "Account created sucessfully",
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
