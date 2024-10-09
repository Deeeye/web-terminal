const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  port: process.env.PORT || 3001,
  ssh: {
    host: process.env.SSH_HOST || 'localhost',
    port: process.env.SSH_PORT || 22,
    username: process.env.SSH_USERNAME || 'user',
    password: process.env.SSH_PASSWORD || 'pass',
  },
};

