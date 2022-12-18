import { OmitType } from '@nestjs/mapped-types';
import { FullPostDto } from './full-post.dto';

export class CreatePostDto extends OmitType(FullPostDto, ['id']) {}
