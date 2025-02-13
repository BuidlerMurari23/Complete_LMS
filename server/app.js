import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import errorMiddleware from './middleware/errorMiddleware.js';
import userRouter from "./routes/userRoutes.js";
import miscelleanousRouter from "./routes/miscelleaneousRoutes.js";


config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cors({
    origin: [process.env.FRONTEND_URL],
    credentials: true
}));

app.use(morgan('dev'));

app.use(cookieParser());


app.use('/api/v1/user', userRouter);

app.use('/api/v1', miscelleanousRouter);



app.get('/', (_req, res) => {
    res.send('Welcome to home page of LMS Complete.');
});

app.get('/ping', (_req, res) => {
    res.send('Pong');
});

app.use('*', (req, res) => {
    res.status(404).send("Opps!!! 404 Page Not Found ")
})


// custom error handling middleware
app.use(errorMiddleware);


export default app;
