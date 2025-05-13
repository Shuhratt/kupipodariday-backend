import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { IsEmail, IsUrl, Length } from 'class-validator';
import { Wish } from 'src/wishes/entities/wish.entity';
import { Offer } from 'src/offers/entities/offer.entity';
import { Wishlist } from 'src/wishlists/entities/wishlist.entity';

//объекты, которые представляют данные в базе данных.
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Length(2, 30)
  @Column({ unique: true })
  username: string;

  @Length(2, 200)
  @Column({ default: 'Пока ничего не рассказал о себе' })
  about: string;

  @IsUrl()
  @Column({ default: 'https://i.pravatar.cc/300' })
  avatar: string;

  @IsEmail()
  @Column({ unique: true })
  email: string;

  @Length(6, 100)
  @Column({ select: false })
  password: string;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @OneToMany(() => Offer, (offer) => offer.user)
  offers: Offer[];

  @OneToMany(() => Wish, (wish) => wish.owner)
  wishes: Wish[];

  @OneToMany(() => Wishlist, (wishlist) => wishlist.owner)
  wishlists: Wishlist[];
}
