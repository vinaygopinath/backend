const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 4001,
  jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",
  postgresUri: process.env.POSTGRES_URI ||
    process.env.POSTGRES_HOST ||
    'postgres://' + (process.env.IP || 'localhost') + ':' +
    (process.env.POSTGRES_PORT || '5423') +
    '/s3c_db_dev'
}

export default config
