import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateWishDto } from './create-wish.dto';

export class UpdateWishDto extends OmitType(PartialType(CreateWishDto), ['raised']) {}
