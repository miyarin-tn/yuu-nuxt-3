module.exports = {
  apps: [
    {
      name: 'nuxt_production',
      exec_mode: 'cluster', // can be “cluster” or “fork”, default fork
      instances: 1, // can be a number of instances or “max”, default 1
      script: './.output/server/index.mjs',
      // env: {
      //   NODE_ENV: 'production',
      // },
      port: 4000,
    }
  ],
}