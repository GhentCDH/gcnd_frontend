FROM node:22-alpine as node-base

WORKDIR /app


# instal pnpm
RUN npm install --global corepack@latest
RUN corepack enable

# install git and tini
RUN apk add --no-cache git tini

FROM node-base as dev

EXPOSE 5480 5481

ENV VITE_DOCKER_MODE=true
ENV PORT=5480
ENV DEV_API_SERVER_PORT=5481

COPY scripts/dev.sh /dev.sh
RUN chmod +x /dev.sh

ENTRYPOINT ["/sbin/tini", "--"]

# This is a dummy command to keep the container running
CMD ["tail", "-f", "/dev/null"]

FROM node-base as prod

ENV PORT=5480
ARG USERGROUP=node
ARG USERNAME=node

ENTRYPOINT ["/sbin/tini", "--"]

WORKDIR /app

# install production dependencies
COPY package*.json .
COPY patches ./patches
RUN pnpm install

# Copy the rest of the application code
#COPY --chown=$USERNAME:$USERGROUP . .
COPY . .

# create dist directory
#RUN chown $USERNAME:$USERGROUP /app/dist

# Build the application
RUN pnpm run build

# Add execute permission to scripts directory
RUN chmod +x /app/scripts/*

# Change ownership of the server directory
#RUN chown $USERNAME:$USERGROUP /app

RUN mkdir -p /app/.cache
RUN chown -R $USERNAME:$USERGROUP /app/.cache

## Start the application
USER $USERNAME

CMD ["scripts/prod.sh"]