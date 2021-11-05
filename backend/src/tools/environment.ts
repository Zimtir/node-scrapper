import dotenv from "dotenv";

dotenv.config({
  path: ".env",
});

export const getEnvKey = (name: string): string => {
  const env = process.env[name];
  if (env) {
    return env;
  }

  const error = new Error(`${name} is not defined at .env file`);

  console.error(error);

  throw error;
};

export const isDevelopment = !!getEnvKey("IS_DEVELOPMENT");

export const HOST = getEnvKey("HOST");
export const PORT = getEnvKey("PORT");
export const API_PREFIX = getEnvKey("API_PREFIX");
export const API_EXTERNAL_USERS_URL = getEnvKey("API_EXTERNAL_USERS_URL");
