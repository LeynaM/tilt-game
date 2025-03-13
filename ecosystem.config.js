module.exports = {
  apps: [
    {
      name: "tilt-game",
      script: "server/src/server.js",
      env: {
        NODE_ENV: "production",
        DATABASE_URL: "file:server/local.db",
      },
    },
  ],
};
