import { Router } from 'express';
import { getHello } from './first.service';

const router = Router();

router.get('/', (_, res) => {
    const result = getHello();
    res.json(result);
});

export const firstController = router;
