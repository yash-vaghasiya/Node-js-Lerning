const express = require('express');
const app = express();
const routes = require('./routes/userRouter');
const dotenv = require('dotenv');
dotenv.config();
const db = require('./config/mongodb')

app.use(express.json());
app.use(routes);
db;

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
