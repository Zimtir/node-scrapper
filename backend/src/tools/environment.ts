import dotenv from 'dotenv'

dotenv.config({
  path: '.env',
})

console.log(process.env)

export const getEnvKey = (name: string): string => {
  const env = process.env[name]
  if (env) {
    return env
  }

  const error = new Error(`${name} is not defined at .env file`)

  console.error(error)

  throw error
}

export const isDevelopment = !!getEnvKey('IS_DEVELOPMENT')

export const HOST = getEnvKey('HOST')
export const PORT = getEnvKey('PORT')
export const API_PREFIX = getEnvKey('API_PREFIX')
export const API_EXTERNAL_USERS_URL = getEnvKey('API_EXTERNAL_USERS_URL')

export const DATABASE_CREDENTIALS = {
  username: getEnvKey('DB_USERNAME'),
  password: getEnvKey('DB_PASSWORD'),
  database: getEnvKey('DB_NAME'),
  port: parseInt(getEnvKey('DB_PORT'), 10),
  type: getEnvKey('DB_TYPE'),
  host: getEnvKey('DB_HOST'),
}
