import { Router } from 'express';
import {
    createUser, getUserById,
    getAllUsers, removeUser,
} from './users.service';

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

    res.json(result
        ? {
            message: `Thats user with id: ${id}`,
            data: result,
        }
        : `Do not have user with id: ${id}`);
});

router.get('/', async (req, res) => {
    const { limit = 10, skip = 0 } = req.query;
    const result = await getAllUsers(req.db, limit as string, skip as string);

    res.json(result.length
        ? {
            message: 'Thats all users in this database',
            data: result,
        }
        : 'Do not have users in this database');
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const result = await removeUser(req.db, id);

    res.json(result
        ? {
            message: 'This user was delete',
            data: result,
        }
        : `Do not have user with id: ${id}`);

    // res.status(204).end();
});

export const usersController = router;
