import {Router} from 'express';
import {changeUserDetails, logOutUser, loginUser, refereshAccessToken, registerUser} from '../controllers/user.controller.js';
import {upload} from '../middlewares/muter.middleware.js';
import { verifyToken } from '../middlewares/auth.middleware.js';
const route = Router();

route.route('/register').post(upload.fields([{name:'avatar',maxCount:1},{name:'coverImg',maxCount:1}]),registerUser)
route.route('/login').post(loginUser);
//secure route
route.route('/logout').post(verifyToken,logOutUser);
route.route('/refresh-token').post(refereshAccessToken);

// route.route('/change').post(upload.fields([{name:'avatar',maxCount:1},{name:'coverImg',maxCount:1}]),changeUserDetails)

export default route;