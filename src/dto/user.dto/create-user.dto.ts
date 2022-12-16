import { OmitType } from '@nestjs/mapped-types';
import { FullUserDto } from './full-user.dto';

export class CreateUserDto extends OmitType(FullUserDto, ['id']) {}
