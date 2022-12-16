import express from 'express';

export function generateServer() {
    const app = express();

    app.use(express.json());

    return app;
}
