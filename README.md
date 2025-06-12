If nothing here is meant to indicate that peawkung2846 (https://github.com/peawkung2846) hasn’t yet completed the `README.md` file

![Screenshot 2568-06-12 at 21 59 31](https://github.com/user-attachments/assets/8be47076-bc38-44f1-8fde-4c8036539e9e)


# Condormhub
Software Engineering II Course from Chulalongkorn University Project

## Getting Started

First, run the development server:
1. Clone repository
```bash
git clone git@github.com:PitiNarak/condormhub-frontend.git
```
2. Install dependencies
```bash
pnpm install
```
3. Start the development server
```bash
pnpm dev
```

### Docker
```bash
cp .env.example .env
docker run --env-file .env ghcr.io/pitinarak/condormhub-frontend
```
Or you can use `Dockerfile` to build on your machine.

### Scripts

| Script       | Description                                      |
|--------------|--------------------------------------------------|
| `dev`        | Starts the development server with Turbopack     |
| `build`      | Builds the application for production            |
| `start`      | Starts the production server                     |
| `lint`       | Runs the linter to check for code issues         |
| `lint:fix`   | Runs the linter and fixes any issues             |

### License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

Next.js is licensed under the MIT License. See the [Next.js License](https://github.com/vercel/next.js/blob/canary/license.md) for details.
