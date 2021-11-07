# Node Scrapper

## Requirements

- Node.js
- NPM
- Docker or self-hosted database

## Overview

- Swagger - localhost:8080/api/swagger
- Endpoints - localhost:8080/api/endpoints
- Database
  - Self-hosted mode
  - Docker-hosted mode
  - Note: API can work without database but with logging and tries to reconnect

## Execution

### Local

- Development mode - `npm run dev`

- Production mode - `npm run dev`

### Docker

- Development mode - `make up`

- Production mode - `make up-prod`
