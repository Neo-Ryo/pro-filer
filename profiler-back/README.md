# Template of a typescript nodejs server

### Installed packages

> dependencies

- body-parser
- cors
- dotenv
- express
- morgan

> dev dependencies

- nodemon
- ts-node
- typescript

## Before start

- create a `.env` file, a variable name `DATABASE_URL` with postgres connection string (eg: .env.example).
- Run `pnpm install` to install node modules.
- Run `pnpm prisma:push` to setup you local DB.
- Run `pnpm dev` et voila! Ready to dev!
