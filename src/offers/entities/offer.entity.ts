import { User } from 'src/users/entities/user.entity';
import { Wish } from 'src/wishes/entities/wish.entity';
import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, ManyToOne, Entity } from 'typeorm';

@Entity()
export class Offer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /** сумма заявки, округляется до двух знаков после запятой; */
  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  /** флаг, который определяет показывать ли информацию о скидывающемся в списке */
  @Column({ default: false })
  hidden: boolean;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @ManyToOne(() => User, (user) => user.offers, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Wish, (wish) => wish.offers, { onDelete: 'CASCADE' })
  item: Wish;
}
