export default {
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  requireTLS: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  default: {
    from: process.env.MAIL_FROM,
  },
};