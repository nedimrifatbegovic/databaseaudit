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

  @Column({ type: "text" })
  consumerKey: string;

  @Column({ type: "text" })
  token: string;

  @Column({ type: "text" })
  tokenSecret: string;

  @Column({ type: "text" })
  signatureMethod: string;

  @Column({ type: "text" })
  jiraUrl: string;

  @Column({ type: "text" })
  jiraPort: string;

  // @Column({ type: "mediumblob" })
  // privateKey: Buffer;
  @Column({ length: 2048 })
  privateKey: string;

  @Column({ type: "text" })
  backupProjectKey: string;

  @Column({ type: "text" })
  restorationProjectKey: string;

  @Column({ type: "text" })
  errorProjectKey: string;

  @Column({ type: "text" })
  changeProjectKey: string;

  @Column({ type: "text" })
  dbType: string;

  @Column({ type: "text" })
  dbHost: string;

  @Column({ type: "text" })
  dbPort: string;

  @Column({ type: "text" })
  dbUsername: string;

  @Column({ type: "text" })
  dbPassword: string;

  @OneToOne(() => InternalAuditor)
  internalAuditor: InternalAuditor;
}
