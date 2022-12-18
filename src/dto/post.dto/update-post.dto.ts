import { OmitType, PartialType } from '@nestjs/mapped-types';
import { FullPostDto } from './full-post.dto';

export class UpdatePostDto extends PartialType(OmitType(FullPostDto, ['id', 'user_id'])) {}
