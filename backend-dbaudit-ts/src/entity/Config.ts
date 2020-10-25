import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";

import { InternalAuditor } from "./InternalAuditor";

@ObjectType()
@Entity()
export class Config extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  configId: number;

  @Column({ type: "timestamp" })
  createdAt: Date;

  @Column({ type: "timestamp" })
  updatedAt: Date;

  @Column({ type: "text", length: 250 })
  consumerKey: string;

  @Column({ type: "text", length: 250 })
  token: string;

  @Column({ type: "text", length: 250 })
  tokenSecret: string;

  @Column({ type: "text", length: 250 })
  signatureMethod: string;

  @Column({ type: "text", length: 250 })
  jiraUrl: string;

  @Column({ type: "text", length: 250 })
  jiraPort: string;

  @Column({ type: "mediumblob" })
  privateKey: Buffer;

  @Column({ type: "text", length: 250 })
  backupProjectKey: string;

  @Column({ type: "text", length: 250 })
  restorationProjectKey: string;

  @Column({ type: "text", length: 250 })
  errorProjectKey: string;

  @Column({ type: "text", length: 250 })
  changeProjectKey: string;

  @OneToOne(() => InternalAuditor)
  internalAuditor: InternalAuditor;
}
