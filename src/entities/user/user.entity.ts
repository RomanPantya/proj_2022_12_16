import { IUser } from './user.interface';

export class UserEntity implements IUser {
    id!: number;

    name!: string;

    email!: string;

    age!: number;

    is_single!: boolean;
}
