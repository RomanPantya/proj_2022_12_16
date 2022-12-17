import { PoolClient } from 'pg';
import { CreateUserDto } from '../../dto/user.dto/create-user.dto';

export async function createUser(
    connection: PoolClient,
    user: CreateUserDto,
    // Omit<UserEntity, 'id'>
) {
    const pgParams = ['$1', '$2', '$3', '$4'] as const;
    const mapper: Record<(typeof pgParams)[number], keyof CreateUserDto> = {
        $1: 'name',
        $2: 'email',
        $3: 'age',
        $4: 'is_single',
    };
    const { rows: [result] } = await connection.query(`
    insert into users(
        name,
        email,
        age,
        is_single
    )
    values(
        $1,
        $2,
        $3,
        $4
    )
    returning *
    `, pgParams.map(($) => user[mapper[$]]));

    return result;
}

export async function getUserById(
    connection: PoolClient,
    id: string,
) {
    const { rows: [result] } = await connection.query(`
    select *
    from users
    where id = $1
    `, [id]);

    return result || null;
}

export async function getAllUsers(
    connection: PoolClient,
    limit: string,
    skip: string,
) {
    const { rows } = await connection.query(`
    select *
    from users
    limit $1
    offset $2
    `, [limit, skip]);

    return rows;
}
