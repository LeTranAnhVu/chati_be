import {Entity, JoinTable, ManyToMany, OneToMany, ManyToOne, Column, JoinColumn} from "typeorm"
import {BaseEntity} from "../Base.entity"
import {User} from "./User"
import {Message} from "./Message"
import {Room} from "./Room"


@Entity("room_user")
export class RoomToUser extends BaseEntity {

  @Column({name: "user_id"})
  userId: string

  @Column({name: "room_id"})
  roomId: string

  @ManyToOne(() => User, user => user.roomToUsers)
  @JoinColumn({name: "user_id"})
  user: User

  @ManyToOne(() => Room, room => room.roomToUsers)
  @JoinColumn({name: "room_id"})
  room: Room
}