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
