import { ApiProperty } from '@nestjs/swagger';
import { OfferResponseDto } from 'src/offers/dto/offer-response.dto';
import { UserResponseDto } from 'src/users/dto/user-response.dto';

export class WishResponseDto {
  @ApiProperty({ example: 1, description: 'Уникальный идентификатор подарка' })
  id: number;

  @ApiProperty({
    example: 'Новый iPhone',
    description: 'Название подарка',
    minLength: 1,
    maxLength: 250
  })
  name: string;

  @ApiProperty({
    example: 'https://example.com/iphone ',
    description: 'Ссылка на подарок',
    format: 'uri'
  })
  link: string;

  @ApiProperty({
    example: 'https://example.com/images/iphone.jpg ',
    description: 'URL изображения подарка',
    format: 'uri'
  })
  image: string;

  @ApiProperty({
    example: 1000.5,
    description: 'Цена подарка'
  })
  price: number;

  @ApiProperty({
    example: 500.25,
    description: 'Сумма предварительного сбора или сумма, которую пользователи готовы скинуть на подарок'
  })
  raised: number;

  @ApiProperty({
    example: 'Описание подарка: новый iPhone 15 Pro Max.',
    description: 'Описание подарка',
    minLength: 1,
    maxLength: 1024
  })
  description: string;

  @ApiProperty({
    example: 10,
    description: 'Количество пользователей, скопировавших этот подарок'
  })
  copied: number;

  @ApiProperty({
    example: '2023-10-01T12:34:56Z',
    description: 'Дата создания подарка'
  })
  createAt: Date;

  @ApiProperty({
    example: '2023-10-01T12:34:56Z',
    description: 'Дата последнего обновления подарка'
  })
  updateAt: Date;

  @ApiProperty({
    type: () => UserResponseDto
  })
  owner: UserResponseDto;

  @ApiProperty({
    type: () => OfferResponseDto,
    isArray: true
  })
  offers: OfferResponseDto[];
}
