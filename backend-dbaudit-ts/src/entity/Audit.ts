import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Audit extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  auditId: number;

  @Column({ type: "timestamp" })
  createdAt: Date;

  @Column({ type: "timestamp" })
  updatedAt: Date;

  @Column({ type: "boolean" })
  status: boolean;

  // TODO: FK Internal Auditor
  // TODO: FK External Auditor
  // TODO: Connection to Report
  // TODO: Connection to Requests
}
