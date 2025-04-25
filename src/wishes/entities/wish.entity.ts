import { IsUrl, Length } from 'class-validator';
import { Offer } from 'src/offers/entities/offer.entity';
import { User } from 'src/users/entities/user.entity';
import { Wishlist } from 'src/wishlists/entities/wishlist.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity()
export class Wish {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Length(1, 250)
  @Column()
  name: string;

  @IsUrl()
  @Column()
  link: string;

  @Column()
  image: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  /** cумма предварительного сбора или сумма, которую пользователи сейчас готовы скинуть на подарок */
  @Column('decimal', { precision: 10, scale: 2 })
  raised: number;

  @Length(1, 1024)
  @Column()
  description: string;

  /** содержит cчётчик тех, кто скопировал подарок себе */
  @Column('integer')
  copied: number;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @ManyToOne(() => User, (users) => users.wishes, { onDelete: 'CASCADE' })
  //   @Index() TODO: нужно ли index для ускорения работы
  owner: User;

  @OneToMany(() => Offer, (offer) => offer.item)
  offers: Offer[];

  @ManyToMany(() => Wishlist, (wishlist) => wishlist.items)
  wishlists: Wishlist[];
}
