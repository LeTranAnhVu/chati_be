export type UserInRoom = {
  id: string
  name: string
}
export type MessageInRoom = {
  id: string
  body: string
  roomId: string
  userId: string
  createdAt?: string
}

export type RoomModel = {
  id: string
  users: UserInRoom[]
  messages: MessageInRoom[]
}