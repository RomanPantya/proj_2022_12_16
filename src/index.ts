import express from 'express';
import { firstController } from './app/first/first.controller';

const app = express();

const port = 3000;

app.use('/', firstController);

app.listen(port, () => {
    console.info(`Server started on port: ${port}`);
});
