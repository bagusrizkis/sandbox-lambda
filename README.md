# Sandbox up and runnning with Serverless Functions (Jamstack Explorers)

# Setup

- Install node.js

- Install netlify-cli as a global depedency
```bash
npm i netlify-cli -g
```

then login: `ntl login`

- Install project depedency
```bash
npm i
# or
npm install
```

- add `.env` to root app directory
```env
MT_ID_MERCHANT=
MT_CLIENT_KEY=
MT_SERVER_KEY=
```

# Run App

```bash
ntl dev
# or
netlify dev
```