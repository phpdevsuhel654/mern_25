const app = require('./app');
const env = require('./config/env');

const PORT = env.port;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${env.nodeEnv} mode`);
});
