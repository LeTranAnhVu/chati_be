import { Column, Entity} from "typeorm"
import { BaseEntity } from "../Base.entity"


@Entity('users')
export class User extends BaseEntity{
  @Column()
  email: string

  @Column({nullable: true})
  password: string

  @Column({name: "google_id",nullable: true})
  googleId: string
}