import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import Consumer from './consumer.entity';

@Entity({ name: 'users' })
export default class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  phone: number;

  @CreateDateColumn({ name: 'created_at ' })
  createdAt: Date;

  @CreateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(
    () => Consumer,
    consumers => consumers.user,
  )
  consumers: Promise<Consumer[]>;
}
