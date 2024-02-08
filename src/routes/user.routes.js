import {Router} from 'express';
import {loginUser, registerUser} from '../controllers/user.controller.js';
import {upload} from '../middlewares/muter.middleware.js';
const route = Router();

route.route('/register').post(upload.fields([{name:'avatar',maxCount:1},{name:'coverImg',maxCount:1}]),registerUser)
route.route('/login').post(loginUser)
export default route;