import express, {Request, Response} from 'express';
import cors from 'cors';
import 'dotenv/config';
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', async(req:Request, res: Response) => {
     try {
            res.send('Hello World');
     }
        catch (err) {
                console.log(err);
        }
})