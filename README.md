# Yuu Nuxt 3 Template

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview
```

## Build by Docker

1. Prerequisites:

- [Install docker](https://docs.docker.com/engine/install)
- [Install docker-compose](https://docs.docker.com/compose/install/)

2. Build

> Only with Docker

```bash
# build images
$ docker build -t <image_name> .
# Ex: docker build -t nuxt_web .

# run container
docker run --name <container_name> -d -it -v .:<virtual_path> -p <real_port>:<container_expose_port> <image_name>
# Ex: docker run --name yuu_nuxt -d -it -v .:/app -p 3000:3000 nuxt_web
```

> Only with Docker Compose (Recommend)

```bash
$ docker-compose up

# rebuild
$ docker-compose up --build

# run with current user
$ CURRENT_UID=$(id -u):$(id -g) docker-compose up --build
```

## Run by PM2

1. Prerequisites:

- [Install pm2](https://pm2.keymetrics.io/docs/usage/quick-start)

2. Prepare and use

> Run development mode

```bash
# run pm2
$ pm2 start ecosystem.config.cjs

# stop a name of pm2
$ pm2 stop <name>
```

> Run production mode

```bash
# build project
$ npm run build

# run pm2
$ pm2 start ecosystem.config.prod.cjs

# stop a name of pm2
$ pm2 stop <name>
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
