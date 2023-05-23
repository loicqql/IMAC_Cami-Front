module.exports = {
  apps: [
    {
      name: 'Cami-Front',
      port: '3000',
      exec_mode: 'cluster',
      instances: 'max',
      script: './.output/server/index.mjs'
    }
  ]
}
