const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const userRouter = require('./routes/users');
const connectDb = require('./db');

const app = express();
const port = process.env.PORT || 3001;
connectDb();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use('/users', userRouter);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});