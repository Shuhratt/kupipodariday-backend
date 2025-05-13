import { ApiProperty } from '@nestjs/swagger';
import { UserResponseDto } from 'src/users/dto/user-response.dto';
import { WishResponseDto } from 'src/wishes/dto/wish-response.dto';

export class OfferResponseDto {
  @ApiProperty({ example: 1, description: 'Уникальный идентификатор' })
  id: number;

  @ApiProperty({
    example: 100.5,
    description: 'Сумма, округленная до двух знаков после запятой'
  })
  amount: number;

  @ApiProperty({
    example: false,
    description: 'Флаг, определяющий показывать ли информацию о скидывающемся в списке'
  })
  hidden: boolean;

  @ApiProperty({
    example: '2023-10-01T12:34:56Z',
    description: 'Дата создания'
  })
  createAt: Date;

  @ApiProperty({
    example: '2023-10-01T12:34:56Z',
    description: 'Дата последнего обновления'
  })
  updateAt: Date;

  @ApiProperty({
    type: () => UserResponseDto,
    isArray: true
  })
  user: UserResponseDto[];

  @ApiProperty({
    type: () => WishResponseDto,
    isArray: true
  })
  items: WishResponseDto[];
}
