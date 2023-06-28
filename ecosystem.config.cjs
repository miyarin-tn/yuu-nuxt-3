module.exports = {
  apps: [
    {
      name: 'nuxt_development',
      exec_mode: 'cluster', // can be “cluster” or “fork”, default fork
      instances: 1, // can be a number of instances or “max”, default 1
      script: './node_modules/nuxt/bin/nuxt.mjs',
      args: 'dev',
      port: 3000,
    },
  ],
}