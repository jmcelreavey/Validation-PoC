import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Category } from "./Category";
import * as Joiful from "joiful";

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  @(Joiful.number().optional())
  id: number;

  @Column()
  @(Joiful.string().max(2))
  title: string;

  @Column("text")
  @(Joiful.string().required().max(2))
  text: string;

  @ManyToMany((type) => Category, {
    cascade: true,
  })
  @JoinTable()
  categories: Category[];
}
