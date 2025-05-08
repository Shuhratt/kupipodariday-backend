import { IsUrl, Length } from 'class-validator';
import { User } from 'src/users/entities/user.entity';
import { Wish } from 'src/wishes/entities/wish.entity';
import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  Column,
  ManyToOne,
  Entity,
  JoinTable
} from 'typeorm';

@Entity()
export class Wishlist {
  @PrimaryGeneratedColumn()
  id: number;

  @Length(1, 250)
  @Column()
  name: string;

  @Length(1, 1500)
  @Column({ default: '-' })
  description?: string;

  @IsUrl()
  @Column()
  image: string;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @ManyToMany(() => Wish, (wish) => wish.wishlists)
  @JoinTable({
    name: 'wishlist_items', // Имя промежуточной таблицы
    joinColumn: {
      name: 'wishlist_id', // Столбец для текущей сущности (Wishlist)
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'wish_id', // Столбец для связанной сущности (Wish)
      referencedColumnName: 'id'
    }
  })
  items: Wish[];

  @ManyToOne(() => User, (user) => user.wishlists, { onDelete: 'CASCADE' })
  owner: User;
}
