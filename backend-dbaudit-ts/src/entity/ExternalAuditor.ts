import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";

import { Audit } from "./Audit";

@ObjectType()
@Entity()
export class ExternalAuditor extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  externalAuditorId: number;

  @Column({ type: "timestamp" })
  createdAt: Date;

  @Column({ type: "timestamp" })
  updatedAt: Date;

  @Column({ type: "text", unique: true })
  email: string;

  @Column({ length: 250 })
  password: string;

  @Column({ type: "text" })
  companyName: string;

  @ManyToMany((type) => Audit, (audit) => audit.externalAuditors)
  audits: Audit[];
}
