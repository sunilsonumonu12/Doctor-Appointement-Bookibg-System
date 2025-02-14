import express from 'express';
import { addDoctor, getDoctors, addData } from '../controllers/adminController.js';
import upload from '../middlewares/multer.js';

const adminRouter = express.Router();

adminRouter.post('/add-doctor', upload.single('image'), addDoctor);
adminRouter.get('/get-doctors', getDoctors);
adminRouter.post('/add-data', addData);

export default adminRouter;