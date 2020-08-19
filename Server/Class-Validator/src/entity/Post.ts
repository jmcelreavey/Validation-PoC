import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Category } from "./Category";
import { IsInt, Length, IsOptional } from "class-validator";

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  @IsInt()
  @IsOptional()
  id: number;

  @Column()
  @Length(0, 2)
  title: string;

  @Column("text")
  @Length(0, 2)
  text: string;

  @ManyToMany((type) => Category, {
    cascade: true,
  })
  @JoinTable()
  categories: Category[];
}
