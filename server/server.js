const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const applyRoutes = require('./routes');
const connectDb = require('./db');

const app = express();
const port = process.env.PORT || 3001;
connectDb();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
applyRoutes(app);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});