module.exports = [
  {
    script: 'index.js',
    name: 'server',
    exec_mode: 'cluster',
    instances: 1,
    error_file: '/var/log/server/errors.log',
    out_file: '/var/log/server/server.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z'
  }
]
