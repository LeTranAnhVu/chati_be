import socketio from "socket.io"
import http from "http"

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
    // console.log("middleware is called", socket.handshake.query)
    next()
  })

  chatNsp.on("connection", (socket) => {
    // console.log("client connect to /chat socket")

    socket.on("join-room", (payload: JoinRoomPayload) => {
      const {room} = payload
      socket.join(room)
      console.log("socket is joined room ", room)
    })

    socket.on("client-send-message", (payload: ChatPayload, cb) => {
      const {roomId, body} = payload

      const message = {
        id: (Math.random() * 10000).toString(),
        body: body,
        createdAt: new Date(),
        roomId: roomId,
        userId: "1"
      }

      chatNsp.in(roomId).emit("server-send-message", message)
      cb()
    })


    socket.on("disconnect", () => {
      console.log("client disconnect")
    })
  })

}
