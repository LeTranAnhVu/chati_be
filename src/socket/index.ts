import socketio from "socket.io"
import http from "http"
import {authenticateAccessTokenMdl} from "../controllers/auth"
import {getRepository} from "typeorm"
import {Room} from "../entity/Room"
import {Message} from "../entity/Message"

type JoinRoomPayload = {
  room: string;
}
type ChatPayload = {
  roomId: string;
  body: string;
}

export default function createSocket(server: http.Server) {
  const io = socketio(server)

  const chatNsp = io.of("/chat")
  // middleware
  chatNsp.use((socket, next) => {
    const {token} = socket.handshake.query
    socket.request.accessToken = token
    return authenticateAccessTokenMdl(socket.request, {}, next)
  })

  chatNsp.on("connection", (socket) => {
    // console.log("client connect to /chat socket")

    socket.on("join-room", (payload: JoinRoomPayload) => {
      const {room} = payload
      socket.join(room)
      console.log("socket is joined room ", room)
    })

    socket.on("client-send-message", async (payload: ChatPayload, cb) => {
      const {roomId, body} = payload
      const roomRepository = getRepository(Room)
      const messRepository = getRepository(Message)
      const foundRoom = (await roomRepository.find({where: {id: roomId}}))[0]
      if(!foundRoom) {
        console.log("can not save message")
      }
      const message = new Message()
      message.body = body
      message.user = socket.request.user
      message.room = foundRoom
      await messRepository.save(message)

      chatNsp.in(roomId).emit("server-send-message", message)
      cb()
    })


    socket.on("disconnect", () => {
      console.log("client disconnect")
    })
  })

}
