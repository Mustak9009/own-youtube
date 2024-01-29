import {Router} from 'express';
import {registerUser} from '../controllers/user.controller.js';
import {upload} from '../middlewares/muter.middlesare.js';
const route = Router();

route.route('/register').post(upload.fields([{name:'avatar',maxCount:1},{name:'coverImg',maxCount:1}]),registerUser)

export default route;