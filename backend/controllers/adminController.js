import validator from "validator";
import doctorModel from "../models/doctorModel.js";
import dataModel from "../models/dataModel.js";

const addDoctor = async (req, res) => {
  try {
    const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;
    const imageFile = req.file;

    console.log(name, email, password, speciality, degree, experience, about, fees, address, imageFile, "hello");

    if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address || !imageFile) {
      return res.json({ success: false, message: "Missing Details" });
    }

    console.log('hei');

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter a valid email" });
    }

    // Convert image to base64
    const base64Image = imageFile.buffer.toString('base64');
    const mimeType = imageFile.mimetype;

    const doctorData = {
      name,
      email,
      image: {
        base64: base64Image,
        mimeType: mimeType,
      },
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
      available: true, // Ensure the available field is provided
      date: Date.now(),
    };

    const newDoctor = new doctorModel(doctorData);
    console.log(name, email);
    await newDoctor.save();
    res.json({ success: true, message: 'Doctor Added' });
    console.log(name, fees);

  } catch (error) {
    console.error('Error adding doctor:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};


const addData = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        const newData = new dataModel({ name, email, password });
        await newData.save();

        res.json({ success: true, message: 'Data Added' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};




const getDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.find();
    res.json({ success: true, doctors });
  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

export { addDoctor,getDoctors,addData };