import { Router } from 'express';
import {
    createPost, getPostById,
    getPostsByUserId, getAllPosts,
    removePostById, removePostsByUserId,
    updatePostById,
} from './posts.service';

const router = Router();

router.post('/', async (req, res) => {
    const post = req.body;
    const result = await createPost(req.db, post);

    res.json({
        message: 'This post was create',
        data: result,
    });
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const result = await getPostById(req.db, id);

    res.json(result
        ? {
            message: `This is post with id: ${id}`,
            date: result,
        }
        : `Do not have post with id: ${id}`);
});

router.get('/user/:id', async (req, res) => {
    const { id } = req.params;
    const result = await getPostsByUserId(req.db, id);

    res.json(result.length
        ? {
            message: result.length > 1
                ? `Thats all posts with user_id: ${id}`
                : `This is post with user_id: ${id}`,
            data: result,
        }
        : `Do not have posts with user_id: ${id}`);
});

router.get('/', async (req, res) => {
    const result = await getAllPosts(req.db);

    res.json(result.length
        ? {
            message: 'Thats all posts in this database',
            data: result,
        }
        : 'Do not have posts in this database');

    // res.status(204).end();
});

router.delete('/user/:id', async (req, res) => {
    const { id } = req.params;
    const result = await removePostsByUserId(req.db, id);

    res.json(result.length
        ? {
            message: result.length > 1
                ? `This posts was delete`
                : `This post was delete`,
            data: result,
        }
        : `Do not have posts with user_id: ${id}`);
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const result = await removePostById(req.db, id);

    res.json(result
        ? {
            message: `Posts with id: ${id} was remove`,
            data: result,
        }
        : `Do not have post with id: ${id}`);
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const correctKey = ['title', 'summary'];
    const changeData = Object.entries(req.body)
        .filter(([k]) => correctKey.includes(k));

    if (!changeData.length) {
        res.json('You must put correct data to update post');
        return;
    }

    const realyData = Object.fromEntries(changeData);
    const result = await updatePostById(req.db, id, realyData);

    res.json(result
        ? {
            message: `Post with id: ${id} was update`,
            data: result,
        }
        : `Do not have post with id: ${id}`);
});

export const postsController = router;
