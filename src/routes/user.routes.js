import {Router} from 'express';
import {registerUser} from '../controllers/user.controller.js';
const route = Router();

route.route('/register').post(registerUser)

export default route;