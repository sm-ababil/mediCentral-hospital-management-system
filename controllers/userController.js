const userModel = require("../models/userModels");
const useravatarModel = require("../models/useravatarModels");
const docavatarModel = require("../models/docavatarModels");
const doctorModel = require("../models/doctorModels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const uploadAvatarController = async (req, res) => {
  if (!req.file) {
    return res
      .status(400)
      .send({ success: false, message: "No file uploaded" });
  }

  try {
    const avatarUrl = `http://localhost:3000/uploads/${req.file.filename}`;
    const userId = req.body.userId;
    await useravatarModel.findOneAndUpdate(
      { userId },
      { avatarUrl, uploadedAt: new Date() },
      { upsert: true, new: true }
    );

    res.send({
      success: true,
      avatarUrl,
      message: "Avatar uploaded successfully",
    });
  } catch (error) {
    console.error("Error updating avatar:", error);
    res.status(500).send({ success: false, message: "Error updating avatar" });
  }
};

const getAvatarController = async (req, res) => {
  try {
    const avatar = await useravatarModel.findOne({ userId: req.params.userId });
    const doctorAvatar = await docavatarModel.findOne({ userId: req.params.userId });
    if (!avatar && !doctorAvatar) {
      return res
        .status(404)
        .send({ success: false, message: "Avatar not found" });
    } else if (avatar) {
      res.send({ success: true, avatarUrl: avatar.avatarUrl, avatar: avatar });
    } else if (doctorAvatar) {
      res.send({ success: true, avatarUrl: doctorAvatar.avatarUrl, avatar: doctorAvatar });
    }
  } catch (error) {
    console.error("Error fetching avatar:", error);
    res.status(500).send({ success: false, message: "Error fetching avatar" });
  }
};

const registerController = async (req, res) => {
  try {
    const emailDomain = req.body.email.split('@')[1];
    if (emailDomain == 'medicentral.com') {
      return res.status(200).send({
        success: false,
        message: "Invalid Email",
      });
    }

    const existingUser = await userModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "User already exists",
      });
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    const newUser = new userModel(req.body);
    await newUser.save();
    const avatarUrl =
      newUser.gender === "male"
        ? `http://localhost:3000/uploads/1734481486687.jpg`
        : `http://localhost:3000/uploads/1734482760992.jpg`;
    await useravatarModel.create({
      userId: newUser._id,
      avatarUrl,
      uploadedAt: new Date(),
    });

    res.status(201).send({
      success: true,
      message: "User created successfully",
      data: newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `  Register Controller ${error.message}`,
    });
  }
};

const docregisterController = async (req, res) => {
  try {
    const emailDomain = req.body.email.split('@')[1];
    if (emailDomain !== 'medicentral.com') {
      return res.status(200).send({
        success: false,
        message: "Invalid Email",
      });
    }

    const existingUser = await doctorModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "User already exists",
      });
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    const newDoctor = new doctorModel(req.body);
    await newDoctor.save();
    const avatarUrl =
      newDoctor.gender === "male"
        ? `http://localhost:3000/uploads/1735245937844.jpg`
        : `http://localhost:3000/uploads/1735245810572.jpg`;
    await docavatarModel.create({
      userId: newDoctor._id,
      avatarUrl,
      uploadedAt: new Date(),
    });

    res.status(201).send({
      success: true,
      message: "User created successfully",
      data: newDoctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `  Register Controller ${error.message}`,
    });
  }
};

const loginController = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(200).send({
        success: false,
        message: "Invalid Email or Password",
      });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(200).send({
        success: false,
        message: "Invalid Email or Password",
      });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2d",
    });
    res.status(200).send({
      success: true,
      message: "Login Successfully",
      token,
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Login Controller ${error.message}`,
    });
  }
};


const docloginController = async (req, res) => {
  try {
    const user = await doctorModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(200).send({
        success: false,
        message: "Invalid Email or Password",
      });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(200).send({
        success: false,
        message: "Invalid Email or Password",
      });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2d",
    });
    res.status(200).send({
      success: true,
      message: "Login Successfully",
      token,
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Login Controller ${error.message}`,
    });
  }
};


const authUserController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    const doctor = await doctorModel.findOne({ _id: req.body.userId });
    if (!user && !doctor) {
      return res.status(200).send({
        success: false,
        message: "User not found",
      });
    } else if (user) {
      res.status(200).send({
        success: true,
        message: "User fetched successfully",
        data: user,
      });
    } else if (doctor) {
      res.status(200).send({
        success: true,
        message: "User fetched successfully",
        data: doctor,
      });
    };
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Auth User Controller ${error.message}`,
    });
  }
};

module.exports = {
  loginController,
  docloginController,
  registerController,
  docregisterController,
  authUserController,
  uploadAvatarController,
  getAvatarController,
};
