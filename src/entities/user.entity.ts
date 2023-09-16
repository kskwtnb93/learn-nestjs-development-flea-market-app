import { Exclude } from 'class-transformer';
import { Item } from './item.entity';
import { UserStatus } from './../auth/user-status.enum';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;

  @Column()
  status: UserStatus;

  @OneToMany(() => Item, (item) => item.user)
  items: Item[];
}
