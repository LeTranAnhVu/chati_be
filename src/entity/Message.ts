import {Column, Entity, JoinColumn, ManyToOne} from "typeorm"
import {BaseEntity} from "../Base.entity"
import {User} from "./User"
import {Room} from "./Room"


@Entity("messages")
export class Message extends BaseEntity {
  @Column({name: "user_id"})
  userId: string

  @Column({name: "room_id"})
  roomId: string

  @ManyToOne(() => User)
  @JoinColumn({name: "user_id"})
  user: User

  @ManyToOne(() => Room, room => room.messages)
  @JoinColumn({name: "room_id"})
  room: Room

  @Column({name: "body"})
  body: string
}