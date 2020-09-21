import logger from "./logger";
import dotenv from "dotenv";
import fs from "fs";

export const ENVIRONMENT = process.env.NODE_ENV
// const prod = ENVIRONMENT === 'production' // Anything else is treated as 'dev'

if (ENVIRONMENT === 'docker') {
  logger.debug('Using .env.docker file to supply config environment variables')
  dotenv.config({path: '.env.docker'})
} else {
  if (fs.existsSync('.env')) {
    logger.debug('Using .env file to supply config environment variables')
    dotenv.config({path: '.env'})
  } else {
    logger.debug('Using .env.example file to supply config environment variables')
    dotenv.config({path: '.env.example'}) // you can delete this after you create your own .env file!
  }
}

export const PORT = parseInt(process.env['PORT'] as string) || 3000
export const GOOGLE_CLIENT_ID = process.env['GOOGLE_CLIENT_ID'] as string
export const JWT_SECRET = process.env['JWT_SECRET'] as string
export const JWT_RESET_SECRET = process.env['JWT_RESET_SECRET'] as string
export const ACCESS_TOKEN_EXP = process.env['ACCESS_TOKEN_EXP'] as string
export const RESET_TOKEN_EXP = 10 * 60 // 10 mins

export const DATABASE = process.env['DATABASE'] as string
export const DATABASE_HOST = process.env['DATABASE_HOST'] as string
export const DATABASE_USER = process.env['DATABASE_USER'] as string
export const DATABASE_PASSWORD = process.env['DATABASE_PASSWORD'] as string
export const DATABASE_PORT =  parseInt(process.env['DATABASE_PORT'] as string)

if (!JWT_SECRET || !JWT_RESET_SECRET) {
  logger.error(
    'No client secret. Set or JWT_SECRET or JWT_RESET_SECRET environment variable.'
  )
  process.exit(1)
}

if (!GOOGLE_CLIENT_ID) {
  logger.error('No client secret. Set zGOOGLE_CLIENT_ID environment variable.')
  process.exit(1)
}

if (!ACCESS_TOKEN_EXP) {
  logger.error(
    'No expiration secret. Set ACCESS_TOKEN_EXP environment variable.'
  )
  process.exit(1)
}


// if (!RESET_TOKEN_EXP) {
//   logger.error(
//     'No expiration secret. Set RESET_TOKEN_EXP environment variable.'
//   )
//   process.exit(1)
// }

export const SALT_ROUNDS = 10
