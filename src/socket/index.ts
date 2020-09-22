import socketio from "socket.io"
import http from "http"

export default function createSocket(server: http.Server) {
  const io = socketio(server)

  io.on("connect", (socket) => {
    console.log("socket connected")


    socket.on("message", (payload: any ) => {
      console.log(payload)
    })


    socket.on("disconnect", () => {
      console.log("client disconnect")
    })
  })

}
