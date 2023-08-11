const express = require('express');
const app = express();
const routes = require('./routes/userRouter');
const dotenv = require('dotenv');
dotenv.config();

app.use(express.json());

app.use('/', routes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
