import { IUser } from '../../entities/user/user.interface';

export class FullUserDto implements IUser {
    id!: number;

    name!: string;

    email!: string;

    age!: number;

    is_single!: boolean;
}
