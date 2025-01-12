import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/User.model.js";

const maxAge = 3 * 24 * 60 * 60 * 1000; // 3 days

const createToken = (email, userId) => {
  return jwt.sign({ email, userId }, process.env.JWT_KEY, {
    expiresIn: maxAge,
  });
};

export const signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Please enter all fields" });
    }
    const user = await User.create({ email, password });
    res.cookie("jwt", createToken(email, user._id), {
      maxAge: maxAge,
      secure: true,
      sameSite: "none",
    });
    res.status(201).json({
      user: {
        id: user._id,
        email: user.email,
        profileSetup: user.profileSetup,
      },
    });
  } catch (error) {
    console.log("error in signup", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Please enter all fields" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const auth = await bcrypt.compare(password, user.password);

    if (!auth) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.cookie("jwt", createToken(email, user._id), {
      maxAge,
      secure: true,
      sameSite: "none",
    });

    res.status(200).json({
      user: {
        id: user._id,
        email: user.email,
        profileSetup: user.profileSetup,
        firstName: user.firstName,
        lastName: user.lastName,
        color: user.color,
        Image: user.Image,
      },
    });
  } catch (error) {
    console.log("error in login", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getUserInfo = async (req, res, next) => {
  const userData = await User.findById(req.userId);
  if (!userData) {
    return res.status(404).json({ message: "User does not exist" });
  }

  return res.status(200).json({
    id: userData._id,
    email: userData.email,
    profileSetup: userData.profileSetup,
    firstName: userData.firstName,
    lastName: userData.lastName,
    color: userData.color,
    Image: userData.Image,
  });
};

export const updateProfile = async (req, res, next) => {
  const { userId } = req;
  const { firstName, lastName, color } = req.body;

  if (!firstName || !lastName) {
    return res
      .status(400)
      .json({ message: "Firstname, lastName is required. " });
  }

  const userData = await User.findByIdAndUpdate(
    userId,
    {
      firstName,
      lastName,
      color,
      profileSetup: true,
    },
    { new: true, runValidators: true }
  );

  return res.status(200).json({
    id: userData._id,
    email: userData.email,
    profileSetup: userData.profileSetup,
    firstName: userData.firstName,
    lastName: userData.lastName,
    color: userData.color,
    Image: userData.Image,
  });
};

export const logout = async (req, res, next) => {
  try {
    res.cookie("jwt", "", { maxAge: 1, secure: true, sameSite: "none" });
    res.status(200).send("Logout Succesfull")
  } catch (error) {}
};
