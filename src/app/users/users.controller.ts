import { Router } from 'express';
import { createUser, getUserById } from './users.service';

const router = Router();

router.post('/', async (req, res) => {
    const user = req.body;
    const result = await createUser(req.db, user);

    res.json({
        message: 'This user was create',
        data: result,
    });
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const result = await getUserById(req.db, id);

    res.json({
        message: result
            ? `Thats user with id: ${id}`
            : `Do not have user with id: ${id}`,
        data: result,
    });
});

export const usersController = router;
