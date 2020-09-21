import "reflect-metadata"
import {createConnection} from "typeorm"
import {DATABASE, DATABASE_HOST, DATABASE_PASSWORD, DATABASE_PORT, DATABASE_USER} from "../util/secrets"

export default function connectDatabase(rootPath: string) {
  console.log("--------->", rootPath)
  createConnection({
    type: "postgres",
    host: DATABASE_HOST,
    port: DATABASE_PORT,
    username: DATABASE_USER,
    password: DATABASE_PASSWORD,
    database: DATABASE,
    entities: [
      rootPath + "/entity/*.js"
    ],
    synchronize: true
  }).then(connection => {
    console.log("CONNECT TO DATABASE SUCCESSFULLY")
  }).catch(error => console.log(error))
}