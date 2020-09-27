import {Column, Entity, JoinTable, ManyToMany, OneToMany} from "typeorm"
import {BaseEntity} from "../Base.entity"
import {User} from "./User"
import {Message} from "./Message"
import {RoomToUser} from "./RoomToUser"


@Entity("rooms")
export class Room extends BaseEntity {
  @OneToMany(() => RoomToUser, roomToUser => roomToUser.room)
  roomToUsers: RoomToUser[]

  @OneToMany(() => Message, message => message.room)
  messages: Message[]

}