import userModel from '../models/userModel.js';
import validator from 'validator';
import upload from '../middlewares/multer.js';

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const imageFile = req.file;

    if (!name || !email || !password || !imageFile) {
      return res.status(400).json({ 
        success: false, 
        message: "All fields are required" 
      });
    }

    // Convert image to base64
    const base64Image = imageFile.buffer.toString('base64');
    const mimeType = imageFile.mimetype;

    const userData = {
      name,
      email,
      password,
      image: {
        base64: base64Image,
        mimeType: mimeType,
      }
    };

    const newUser = new userModel(userData);
    await newUser.save();
    res.json({ success: true, message: 'Signup successful' });

  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during signup"
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const { email, ...updatedData } = req.body;

    console.log("Request body:", req.body);
    if (req.file) {
      console.log("File details:", req.file);
      if (!req.file.mimetype.startsWith('image/')) {
        return res.status(400).json({
          success: false,
          message: "Images Only!"
        });
      }
      updatedData.prescriptionPdf = {
        data: req.file.buffer,
        contentType: req.file.mimetype
      };
    }

    const updatedUser = await userModel.findOneAndUpdate(
      { email },
      updatedData,
      { new: true }
    );

    if (!updatedUser) {
      console.log("Current logged-in user details:", { email });
      console.log("Data trying to match with:", updatedData);
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({
      success: false,
      message: "Error updating user",
      error: error.message
    });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await userModel.find({}, 'name email password image');
    res.json({ success: true, users });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching users"
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found"
      });
    }

    if (user.password !== password) {
      return res.status(401).json({
        success: false,
        message: "Invalid password"
      });
    }

    res.json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        image: user.image
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};

export { signup, login , getUsers, updateUser};