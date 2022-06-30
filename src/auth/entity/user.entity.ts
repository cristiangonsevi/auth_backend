import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SignInType } from '../enums/signInType';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: 60 })
  firstName: string;
  @Column({ length: 60, nullable: true })
  lastName: string;
  @Column({ length: 100, unique: true })
  email: string;
  @Column()
  password: string;
  @Column({ nullable: true })
  image: string;
  @Column({ nullable: true })
  bio: string;
  @Column({ nullable: true })
  phone: string;
  @Column({ length: 20, default: SignInType.EMAIL })
  authMethod: string;
  @Column({ default: true })
  isActive: boolean;
  @CreateDateColumn()
  createdAt: Date;
}
