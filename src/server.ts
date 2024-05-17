import express, { Request, Response } from 'express';
import router from './routes';
import cors from 'cors';
import {getConnection} from './persistence/mongo';

const app = express();
const PORT = process.env.PORT || 3000;

getConnection();
app.use(cors({ allowedHeaders: '*', origin: '*' }))
app.use(express.json());

app.get('/', (_: Request, res: Response) => {
    res.send('Server On in port: ' + PORT);
});

app.use(router);

app.listen(PORT, () => console.log(`Server Listening in PORT :${PORT}`));