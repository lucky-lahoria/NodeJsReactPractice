const express = require('express');
const axios = require('axios');
const connectDB = require('./config/db');

connectDB();

const app = express();
app.use(express.json({ extended: true }));

const PORT = process.env.PORT || 5000

app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/post', require('./routes/post'));
app.use('/api/profile', require('./routes/profile'))
app.get('/', (req, res) => {
    res.send('hello')
})


app.listen(PORT, () => {
    console.log("server is running on PORT =>", PORT)
})