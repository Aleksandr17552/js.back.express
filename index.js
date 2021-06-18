require('dotenv').config();
const express = require('express');
const userRouter = require('./routes/users.routes');
const organizationRouter = require('./routes/organizations.routes');

const PORT = process.env.PORT || 8080

const app = express();

app.use(express.json());
app.use('/api', userRouter);
app.use('/api', organizationRouter);

app.listen(PORT, () => console.log(`server started on port ${PORT}`));