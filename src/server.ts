import http from "http"

import errorHandler from "errorhandler"
import app from "./app"
import createSocket from "./socket"

const server = http.createServer(app)

// establish the socket
createSocket(server)

/**
 * Error Handler. Provides full stack - remove for production
 */
// app.use(errorHandler());

/**
 * Start Express server.
 */

export default server.listen(app.get("port"), () => {
  console.log(
    "App is running at http://localhost:%d in %s mode",
    app.get("port"),
    app.get("env")
  )
  console.log("  Press CTRL-C to stop\n")
})

