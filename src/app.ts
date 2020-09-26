import express from "express"
import compression from "compression"  // compresses requests
import bodyParser from "body-parser"
import lusca from "lusca"
import path from "path"
import passport from "passport"
import cors from "cors"

import {PORT} from "./util/secrets"
import routerV1 from "./routers/v1"
import apiErrorHandler from "./middlewares/apiErrorHandler"
import connectDatabase from "./config/database"
import {googleTokenStrategyFactory} from "./config/passport"

// Create Express server
const app = express()

// connect database
connectDatabase(__dirname)
// Express configuration
app.set("port", PORT)

app.use(cors())
app.use(compression())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(passport.initialize())

app.use(lusca.xframe("SAMEORIGIN"))
app.use(lusca.xssProtection(true))

app.use(
  express.static(path.join(__dirname, "public"), {maxAge: 31557600000})
)

// setup passport strategies
passport.use(googleTokenStrategyFactory())

// Use router
app.use("/api/v1", routerV1)

// Custom API error handler
app.use(apiErrorHandler)
export default app
