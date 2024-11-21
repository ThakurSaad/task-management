require("dotenv").config();

const config = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  base_url: process.env.BASE_URL,
  database_url: process.env.MONGO_URL,
  database_password: process.env.DB_PASSWORD,
  jwt: {
    secret: process.env.JWT_SECRET,
    refresh_secret: process.env.JWT_REFRESH_SECRET,
    expires_in: process.env.JWT_EXPIRES_IN,
    refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
  },
  smtp: {
    smtp_host: process.env.SMTP_HOST,
    smtp_port: process.env.SMTP_PORT,
    smtp_service: process.env.SMTP_SERVICE,
    smtp_mail: process.env.SMTP_MAIL,
    smtp_password: process.env.SMTP_PASSWORD,
    NAME: process.env.SERVICE_NAME,
  },
  cloudinary: {
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    couldinary_url: process.env.CLOUDINARY_URL,
  },
  sendgrid: {
    from_email: process.env.FORM_EMAIL,
    api_key: process.env.SEND_GRIDAPI_KEY,
  },
  stripe: {
    stripe_secret_key: process.env.STRIPE_SECRET_KEY,
    stripe_webhook_secret: process.env.STRIPE_WEBHOOK_SECRET,
    stripe_cli_webhook_secret: process.env.STRIPE_CLI_WEBHOOK_SECRET,
  },
  dvla: {
    x_api_key: process.env.DVLA_X_API_KEY,
  },
};

module.exports = config;
