import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  image: {
    base64: { type: String, required: true, default: "iVBORw0KGgoAAAANSUhEUgAAAPAAAADwCAYAAAA+VemSAAAACXBIWXMAABCcAAAQnAEmzTo0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAA5uSURBVHgB7d0JchvHFcbxN+" }, // Shortened default base64
    mimeType: { type: String, required: true, default: "image/png" }
  },
  gender: { type: String, default: "Not Selected" },
  dob: { type: String, default: "Not Selected" },
  phone: { type: String, default: "00000000000" },
  bloodGroup: { type: String, default: "Not Provided" },
  age: { type: Number, default: 0 },
  emergencyContact: { type: String, default: "Not Provided" },
  allergies: { type: String, default: "None" },
  vaccinationHistory: { type: String, default: "None" },
  healthInsurancePolicy: { type: String, default: "None" },
  doctorAssigned: { type: String, default: "None" },
  prescriptionPdf: { 
    data: Buffer, 
    contentType: String 
  }
});

const userModel = mongoose.models.user || mongoose.model('user', userSchema);
export default userModel;