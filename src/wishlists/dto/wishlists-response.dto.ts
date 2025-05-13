import { ApiProperty } from '@nestjs/swagger';
import { UserResponseDto } from 'src/users/dto/user-response.dto';
import { WishResponseDto } from 'src/wishes/dto/wish-response.dto';

export class WishlistResponseDto {
  @ApiProperty({ example: 1, description: 'Уникальный идентификатор списка желаний' })
  id: number;

  @ApiProperty({
    example: 'Мой список желаний',
    description: 'Название списка желаний',
    minLength: 1,
    maxLength: 250
  })
  name: string;

  @ApiProperty({
    example: 'Это мой список желаний на день рождения',
    description: 'Описание списка желаний',
    minLength: 1,
    maxLength: 1500,
    required: false
  })
  description?: string;

  @ApiProperty({
    example: 'https://example.com/images/wishlist.jpg ',
    description: 'URL изображения списка желаний',
    format: 'uri'
  })
  image: string;

  @ApiProperty({
    example: '2023-10-01T12:34:56Z',
    description: 'Дата создания списка желаний'
  })
  createAt: Date;

  @ApiProperty({
    example: '2023-10-01T12:34:56Z',
    description: 'Дата последнего обновления списка желаний'
  })
  updateAt: Date;

  @ApiProperty({
    type: () => UserResponseDto
  })
  owner: UserResponseDto;

  @ApiProperty({
    type: () => WishResponseDto,
    isArray: true
  })
  offers: WishResponseDto[];
}
