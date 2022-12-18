import { OmitType, PartialType } from '@nestjs/mapped-types';
import { FullUserDto } from './full-user.dto';

export class UpdateUserDto extends PartialType(OmitType(FullUserDto, ['id', 'email'])) {}
