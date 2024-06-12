# Site Name: 

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Visual Studio Code Extension Requirements
```bash
- Vue Language Features (Volar)
- Stylelint
- Eslint
- Prettier
```

## Setup project

### Mandatory requirements before installation

```bash
Node version >= v18(v18.19.0 recommend)
```

### Install the library

```bash
# bun
bun install (recommend)  (npm install -g bun)

# yarn
yarn install

# npm
npm install
```

### The develop environment config:

```
cp .env.example .env
```

## Development Server

Start the development server on `http://localhost:3000`

```bash
# bun
bun dev

# npm
npm run dev

# yarn
yarn dev
```

## Deploy Server

Start the development server on `http://localhost:3000`

```bash
# 1. Check the node version
# 2. Deploy steps:

# bun
bun deploy

# npm
npm run deploy

# yarn
yarn deploy
```

### A typical top-level directory layout

    ├── .husky                   # Husky Setting (alternatively `dist`).
    ├── .vscode                  # Vscode Setting.
    ├── assets                   # Icons and styles.
    ├── components               # Put all your Vue components.
    ├── composables              # Use the composables/ directory.
    ├── lang                     # Multi language.
    ├── layouts                  # Common UI patterns into reusable layouts.
    ├── middleware               # Run code before navigating to a particular route.
    ├── modules                  # Automatically register local modules within your application.
    ├── pages                    # Create routes within your web application.
    ├── plugins                  # Plugins system to use Vue plugins.
    ├── public                   # The public/ directory is used to serve your website's static assets.
    ├── resources                # Save Dummy Data.
    ├── server                   # Api and ServerMiddleware.
    ├── store                    # Pinia.
    ├── tests                    # For test.
    ├── types                    # Determined Type.
    ├── utils                    # Tools and utilities.
    └── nuxt.config              # Configured.
