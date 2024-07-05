module.exports = {
    apps: [
      {
        name: 'shop',
        exec_mode: 'cluster',
        instances: 'max', // Or a number of instances
        script: './.output/server/index.mjs',
        port: 3000,
        args: 'start'
      }
    ]
  }
