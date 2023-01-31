import express from 'express';
import { getAllUser, login, signup } from '../controllers/user-controller';

const router = express.Router();

//all user route
router.get('/', getAllUser);

//signup route
router.post('/signup', signup);

//login route
router.post('/login', login);

export default router