import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";

import { Audit } from "./Audit";
import { Config } from "./Config";

@ObjectType()
@Entity()
export class InternalAuditor extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  internalAuditorId: number;

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

  @Column({ type: "text", unique: true })
  folderId: string;

  @ManyToMany((type) => Audit, (audit) => audit.internalAuditors)
  audits: Audit[];

  @OneToOne(() => Config)
  @JoinColumn()
  config: Config;
}
