const express = require('express');
const app = express();
const indexRouter = require('./routes/index');
const securityMiddleware = require('./middlewares/security');

app.use(express.json());
app.use(securityMiddleware);

app.use('/', indexRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
