import { IPost } from '../../entities/post/post.interface';

export class FullPostDto implements IPost {
    id!: number;

    title!: string;

    summary!: string;

    user_id!: number;
}
