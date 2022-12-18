import { Router } from 'express';
import { createPost } from './posts.service';

const router = Router();

router.post('/', async (req, res) => {
    const post = req.body;
    const result = await createPost(req.db, post);

    res.json({
        message: 'This post was create',
        data: result,
    });
});

export const postsController = router;
