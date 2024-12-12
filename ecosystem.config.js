module.exports = {
  apps: [
    {
      name: "makers-frontend-app",
      script: "cmd.exe",
      args: "/c yarn start", // Run 'yarn start' via cmd.exe
      watch: false,
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};
