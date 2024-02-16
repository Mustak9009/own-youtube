import {Router} from 'express';
import {changeCurrentPassword, changeUserDetails, logOutUser, loginUser, refereshAccessToken, registerUser,getCurrentUser, getUserChannelProfile, getUserWatchHistory} from '../controllers/user.controller.js';
import {upload} from '../middlewares/muter.middleware.js';
import { verifyToken } from '../middlewares/auth.middleware.js';
const route = Router();

route.route('/register').post(upload.fields([{name:'avatar',maxCount:1},{name:'coverImage',maxCount:1}]),registerUser)
route.route('/login').post(loginUser);
route.route('/refresh-token').post(refereshAccessToken);
//secure route
route.route('/logout').post(verifyToken,logOutUser);
route.route('/change-password').post(verifyToken,changeCurrentPassword);
route.route('/user').get(verifyToken,getCurrentUser)
route.route('/update-account').patch(verifyToken,upload.fields([{name:'avatar',maxCount:1},{name:'coverImage',maxCount:1}]),changeUserDetails)
route.route('/channel/:userName').get(verifyToken,getUserChannelProfile);
route.route('/history').get(verifyToken,getUserWatchHistory)
export default route;