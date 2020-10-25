import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";

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

  @Column({ type: "text", length: 250 })
  companyName: string;

  @Column({ type: "text", length: 250, unique: true })
  folderId: string;

  // TODO: Connection to Audit
  // TODO: Connection to Config
}
