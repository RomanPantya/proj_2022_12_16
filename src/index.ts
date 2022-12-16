import { firstController } from './app/first/first.controller';
import { generateServer } from './app/generate-server';
import { connectToPg } from './common/connect-to-pg';

export async function main() {
    const app = generateServer();
    const connection = await connectToPg();

    app.use((req, _, next) => {
        req.db = connection;
        next();
    });

    app.use('/', firstController);

    const port = 3000;
    app.listen(port, () => {
        console.info(`Server started on port: ${port}`);
    });
}

main();
