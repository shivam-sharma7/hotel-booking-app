import express, {Request, Response} from 'express';
import cors from 'cors';
import 'dotenv/config';
import {connectDB} from '../config/db'
import {notFound} from '../middleware/middlewareError';
const app = express();

app.use(cors());
app.use(express.json());
connectDB();
app.get('/', async(req:Request, res: Response) => {
            res.send('Hello World');     
})
 
app.use(notFound);

app.listen(process.env.PORT, () => {
        console.log(`Server running on port ${process.env.PORT}`);
})