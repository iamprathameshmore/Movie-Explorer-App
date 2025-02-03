import { Router } from 'express';

// import all controllers
import UserLoginController from '../controllers/user/loginController.js';
import UserSignUpController from '../controllers/user/signupController.js';

const userRoute = new Router();

// Add userRoute
userRoute.post('/log-in', UserLoginController);
userRoute.post('/sign-up', UserSignUpController);


export default userRoute;
