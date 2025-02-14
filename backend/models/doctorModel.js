import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  speciality: { type: String, required: true },
  degree: { type: String, required: true },
  experience: { type: String, required: true },
  about: { type: String, required: true },
  fees: { type: Number, required: true },
  address: { type: String, required: true },
  image: {
    base64: { type: String, required: true },
    mimeType: { type: String, required: true },
  },
  available: { type: Boolean, required: true },
  date: { type: Date, default: Date.now },
});

const doctorModel = mongoose.model('Doctor', doctorSchema);

export default doctorModel;