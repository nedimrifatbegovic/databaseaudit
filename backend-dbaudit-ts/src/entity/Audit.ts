import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";

import { ExternalAuditor } from "./ExternalAuditor";
import { InternalAuditor } from "./InternalAuditor";
import { Report } from "./Report";

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
  resolved: boolean;

  // pending, accepted, declined
  @Column({ type: "text" })
  status: string;

  @ManyToMany(
    (type) => InternalAuditor,
    (internalAuditor) => internalAuditor.audits
  )
  @JoinTable()
  internalAuditors: InternalAuditor[];

  @ManyToMany(
    (type) => ExternalAuditor,
    (externalAuditor) => externalAuditor.audits
  )
  @JoinTable()
  externalAuditors: ExternalAuditor[];

  @OneToMany((type) => Report, (report) => report.audit)
  reports: Report[];
}
