import socketio from "socket.io"
import http from "http"

type JoinRoomPayload = {
  room: string;
}
type ChatPayload = {
  room: string;
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

    socket.on("client-send-message", (payload: ChatPayload) => {
      const {room, body} = payload
      console.log("--->", room)
      console.log("--->", body)
      chatNsp.in(room).emit("server-send-message", body)
    })


    socket.on("disconnect", () => {
      console.log("client disconnect")
    })
  })

}
