import { PoolClient } from 'pg';
import { CreatePostDto } from '../../dto/post.dto/create-post.dto';
import { UpdatePostDto } from '../../dto/post.dto/update-post.dto';

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

export async function getPostById(
    connection: PoolClient,
    id: string,
) {
    const { rows: [result] } = await connection.query(`
  select *
  from posts
  where id = $1
  `, [id]);

    return result || null;
}

export async function getPostsByUserId(
    connection: PoolClient,
    userId: string,
) {
    const { rows } = await connection.query(`
    select * 
    from posts
    where user_id = $1
    `, [userId]);

    return rows;
}

export async function getAllPosts(
    connection: PoolClient,
) {
    const { rows } = await connection.query(`
    select *
    from posts`);

    return rows;
}

export async function removePostById(
    connection: PoolClient,
    id: string,
) {
    const { rows: [result] } = await connection.query(`
    delete from posts
    where id = $1
    returning *
    `, [id]);

    return result || null;
}

export async function removePostsByUserId(
    connection: PoolClient,
    userId: string,
) {
    const { rows } = await connection.query(`
    delete from posts
    where user_id = $1
    returning *
    `, [userId]);

    return rows;
}

export async function updatePostById(
    connection: PoolClient,
    id: string,
    realyData: UpdatePostDto,
    // Partial<Omit<PostEntity, 'id' | 'user_id'>>,
) {
    // const entries = Object.entries(realyData);
    // entries.push(['id', id]);

    // const { rows: [result] } = await connection.query(`
    // update posts
    // set
    // ${entries.slice(0, -1).map(([k], i) => {
    //     const dollar = `$${i + 1}`;
    //     return `${k} = ${dollar}`;
    // })}
    // where id = $${entries.length}
    // returning *
    // `, entries.map(([, v]) => v));

    // return result || null;

    const { rows: [post] } = await connection.query(`
    select *
    from posts 
    where id = $1
    `, [id]);

    if (!post) {
        return null;
    }

    const { title: t, summary: s } = post;
    const { title = t, summary = s } = realyData;

    const { rows: [result] } = await connection.query(`
    update posts
    set
    title = $1,
    summary = $2
    where id = $3
    returning *
    `, [title, summary, id]);

    return result || null;
}
