module.exports = {
  apps: [
    {
      name: 'cadastro-controladores-api',
      script: 'dist/main.js',
      cwd: '/home/anpdadmin/cadastro-controladores-api',
      instances: 1,
      exec_mode: 'fork',
      watch: false,
      env: {
        NODE_ENV: 'production',
        PORT: 3001,
        CONTROLADORES_API_URL: 'https://hml-dim.anpd.gov.br:3001',
        NODE_EXTRA_CA_CERTS: '/etc/ssl/certs/ca-certificates.crt',
      },
      error_file: 'logs/error.log',
      out_file: 'logs/output.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
    },
  ],
};
