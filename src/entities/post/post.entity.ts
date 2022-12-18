import { IPost } from './post.interface';

export class PostEntity implements IPost {
    id!: number;

    title!: string;

    summary!: string;

    user_id!: number;
}
