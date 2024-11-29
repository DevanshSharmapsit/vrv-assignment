import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import UserModel from '../model/user.js';

const secret = 'secret';

export const signup = async (req, res) => {
  const { employee_id, password, phone, role } = req.body;

  try {
    // Check if user already exists
    // console.log("1");
    const oldUser = await UserModel.findOne({ employee_id });
    if (oldUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    // console.log("2");
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);
    // console.log("3");
    // Create the user
    const newUser = await UserModel.create({
      employee_id,
      password: hashedPassword,
      phone,
      role,
    });
    // console.log("4");
    // Generate JWT token
    const token = jwt.sign(
      { employee_id: newUser.employee_id, role: newUser.role },
      secret,
      { expiresIn: "1h" }
    );
    // console.log("5");
    // Respond with user details and token
    res.status(201).json({ role: newUser.role, employee_id: newUser.employee_id, token });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signin = async (req, res) => {
  const { employee_id, password } = req.body;

  try {
    // Find user by employee_id
    const oldUser = await UserModel.findOne({ employee_id });

    if (!oldUser) {
      return res.status(404).json({ message: "User does not exist" });
    }

    // Check if the password is correct
    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { employee_id: oldUser.employee_id, role: oldUser.role },
      secret,
      { expiresIn: "1h" }
    );

    // Respond with user details and token
    res.status(200).json({ role: oldUser.role, employee_id: oldUser.employee_id, token });
  } catch (error) {
    console.error("Error during signin:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
