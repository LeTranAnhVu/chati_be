import {Column, Entity} from "typeorm"
import {BaseEntity} from "../Base.entity"


@Entity("users")
export class User extends BaseEntity {
  @Column()
  email: string

  @Column({name: "google_id", nullable: true})
  googleId: string

  @Column({name: "first_name"})
  firstName: string

  @Column({name: "last_name"})
  lastName: string

  @Column({name: "avatar", default: ""})
  avatar: string
}