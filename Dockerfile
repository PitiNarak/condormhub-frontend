FROM --platform=$BUILDPLATFORM node:23-slim AS base-host
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY . /app
WORKDIR /app

FROM node:23-slim AS base-general
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY . /app
WORKDIR /app

FROM base-general AS prod-deps
RUN pnpm install --prod --frozen-lockfile

FROM base-host AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run build

FROM base-general AS runtime
COPY --from=prod-deps /app/node_modules /app/node_modules
COPY --from=build /app/.next /app/.next
EXPOSE 3000
CMD [ "pnpm", "start" ]
