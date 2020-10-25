import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";

import { Audit } from "./Audit";

@ObjectType()
@Entity()
export class AuditRequest extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  requestId: number;

  @Column({ type: "timestamp" })
  createdAt: Date;

  @Column({ type: "timestamp" })
  updatedAt: Date;

  @Column({ type: "boolean" })
  resolved: boolean;

  @ManyToOne((type) => Audit, (audit) => audit.auditrequests)
  audit: Audit;
}
