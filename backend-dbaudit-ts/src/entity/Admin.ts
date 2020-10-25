import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Admin extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  adminId: number;

  @Column({ type: "timestamp" })
  createdAt: Date;

  @Column({ type: "timestamp" })
  updatedAt: Date;

  @Column({ type: "text", unique: true })
  email: string;

  @Column({ length: 250 })
  password: string;
}
