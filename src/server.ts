import express, { Request, Response } from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (_: Request, res: Response) => {
    res.send('Server On in port: ' + PORT);
})

app.listen(PORT, () => console.log(`Server Listening in PORT :${PORT}`));