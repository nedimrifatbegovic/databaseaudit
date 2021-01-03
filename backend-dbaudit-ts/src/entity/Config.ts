import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
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

  // * Jira
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

  // * Database
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

  // * Class & Attributes Names
  @Column({ type: "text" })
  logs: string;

  @Column({ type: "text" })
  logsid: string;

  @Column({ type: "text" })
  projectkey: string;

  @Column({ type: "text" })
  ticketkey: string;

  @Column({ type: "text" })
  logstype: string;

  @Column({ type: "text" })
  user: string;

  @Column({ type: "text" })
  userid: string;

  @Column({ type: "text" })
  firstname: string;

  @Column({ type: "text" })
  lastname: string;

  @Column({ type: "text" })
  email: string;

  @Column({ type: "text" })
  password: string;

  @Column({ type: "text" })
  usergroupid: string;

  @Column({ type: "text" })
  title: string;

  @Column({ type: "text" })
  usergroups: string;

  @Column({ type: "text" })
  usergroupsgroupid: string;

  @Column({ type: "text" })
  readrights: string;

  @Column({ type: "text" })
  deleterights: string;

  @Column({ type: "text" })
  createrights: string;

  @Column({ type: "text" })
  updaterights: string;

  @Column({ type: "text" })
  groupname: string;

  @ManyToOne(
    () => InternalAuditor,
    (internalAuditor) => internalAuditor.configs
  )
  internalAuditor: InternalAuditor;
}
