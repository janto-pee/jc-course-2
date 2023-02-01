import dotenv from "dotenv";
dotenv.config();

module.exports = {
  port: process.env.PORT,
  SWF: process.env.SWF,
  db: process.env.connectionUN,
  smtp: {
    user: process.env.user,
    pass: process.env.pass,
    host: process.env.host,
    port: process.env.port,
    secure: process.env.secure,
  },
  aTPrK: process.env.accessTokenPrivateKey,

  aTPK: process.env.accessTokenPublicKey,

  rTPrK: process.env.refreshTokenPrivateKey,

  rTPK: process.env.refreshTokenPublicKey,
  // aTPK: process.env.accessTokenPrivateKey,
  // rTPK: process.env.refreshTokenPrivateKey,
  // aTPrK: process.env.accessTokenPublicKey,
  // rTPrK: process.env.refreshTokenPublicKey,
  aTTTL: process.env.aTTTL,
  rTTTL: process.env.rTTTL,
};
