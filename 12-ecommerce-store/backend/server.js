require('dotenv').config({ path: './src/.env' });
const app = require('./src/app');
const connectDB = require('./src/config/db');

//console.log("Mongo URI:", process.env.MONGO_URI);
//console.log("PORT:", process.env.PORT);

const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});