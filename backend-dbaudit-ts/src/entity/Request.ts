import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Request extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  requestId: number;

  @Column({ type: "timestamp" })
  createdAt: Date;

  @Column({ type: "timestamp" })
  updatedAt: Date;

  @Column({ type: "boolean" })
  resolved: boolean;

  //   TODO: Connection to Audit
}
