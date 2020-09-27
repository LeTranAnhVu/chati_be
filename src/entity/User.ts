import {Column, Entity, JoinTable, ManyToMany, OneToMany} from "typeorm"
import {BaseEntity} from "../Base.entity"
import {Room} from "./Room"
import {RoomToUser} from "./RoomToUser"


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

  @OneToMany(() => RoomToUser, roomToUser => roomToUser.room)
  roomToUsers: RoomToUser[]
}