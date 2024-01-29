import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
const app = express();

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    Credential:true
}));
app.use(express.json({
    limit:'30kb'
}));
app.use(express.urlencoded({
    extended:true,
    limit:'30kb'
}));
app.use(express.static('public'));
app.use(cookieParser());

// Import routes
import userRoutes from './routes/user.routes.js';

// Routes declaration
app.use('/api/v1/users',userRoutes);//https://www.[domain].com/api/v1/users
export {app};