import express from 'express';
import { login,getUsers,signup , updateUser} from '../controllers/userController.js';
import upload from '../middlewares/multer.js';
const userRouter = express.Router();

userRouter.post('/signup', upload.single('image'), signup);
userRouter.post('/login', login);
userRouter.get('/get-users', getUsers);
userRouter.put('/update', upload.single('prescriptionImage'), updateUser);

export default userRouter;