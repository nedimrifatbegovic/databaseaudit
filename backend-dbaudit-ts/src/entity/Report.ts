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
export class Report extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  reportId: number;

  @Column({ type: "timestamp" })
  createdAt: Date;

  @Column({ type: "timestamp" })
  updatedAt: Date;

  @Column({ type: "json" })
  scorecard: JSON;

  @ManyToOne((type) => Audit, (audit) => audit.reports)
  audit: Audit;
}
