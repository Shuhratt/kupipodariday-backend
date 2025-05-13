import { ApiProperty } from '@nestjs/swagger';
import { OfferResponseDto } from 'src/offers/dto/offer-response.dto';
import { WishResponseDto } from 'src/wishes/dto/wish-response.dto';
import { WishlistResponseDto } from 'src/wishlists/dto/wishlists-response.dto';

export class UserResponseDto {
  @ApiProperty({ example: 1, description: 'Уникальный идентификатор пользователя' })
  id: number;

  @ApiProperty({
    example: 'john_doe',
    description: 'Имя пользователя (уникальное)',
    minLength: 2,
    maxLength: 30
  })
  username: string;

  @ApiProperty({
    example: 'Пока ничего не рассказал о себе',
    description: 'Описание профиля пользователя',
    minLength: 2,
    maxLength: 200
  })
  about: string;

  @ApiProperty({
    example: 'https://i.pravatar.cc/300 ',
    description: 'URL аватара пользователя'
  })
  avatar: string;

  @ApiProperty({
    example: 'user@example.com',
    description: 'Email пользователя (уникальное)',
    format: 'email'
  })
  email: string;

  @ApiProperty({
    example: '2023-10-01T12:34:56Z',
    description: 'Дата создания пользователя'
  })
  createAt: Date;

  @ApiProperty({
    example: '2023-10-01T12:34:56Z',
    description: 'Дата последнего обновления пользователя'
  })
  updateAt: Date;

  @ApiProperty({
    type: () => WishResponseDto,
    isArray: true
  })
  wishes: WishResponseDto[];

  @ApiProperty({
    type: () => OfferResponseDto,
    isArray: true
  })
  offers: OfferResponseDto[];

  @ApiProperty({
    type: () => WishlistResponseDto,
    isArray: true
  })
  wishlists: WishlistResponseDto[];
}
