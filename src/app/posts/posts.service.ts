import { PoolClient } from 'pg';
import { CreatePostDto } from '../../dto/post.dto/create-post.dto';

export async function createPost(
    connection: PoolClient,
    post: CreatePostDto,
    // Omit<PostEntity, 'id'>
) {
    const entries = Object.entries(post);
    const dollars: string[] = [];

    const { rows: [result] } = await connection.query(`
    insert into posts(
      ${entries.map(([k], i) => {
        dollars.push(`$${i + 1}`);
        return k;
    }).join(', ')}      
    )
    values(
      ${dollars.join(', ')}
    )
    returning *
    `, entries.map(([, v]) => v));

    return result;
}
