import { OmitType } from '@nestjs/mapped-types';
import { FullPostDto } from './full-post.dto';

export class CreateUserDto extends OmitType(FullPostDto, ['id']) {}
