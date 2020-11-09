const express = require('express')
const mongoose = require('mongoose')
const connectDB = require('./dbHelper');
const axios = require('axios');
const config = require('./config')

const app = express()

const Cat = mongoose.model('Cat', { name: String });

app.get('/', (req, res) => {
    const kitty = new Cat({ name: 'Zildjian' });
    kitty.save().then(() => console.log('meow'));

    res.send(`Auth OK. Hello World!`)
})

app.get('/test/test_with_api_data', async (req, res) => {
    const url = config.apiUrl + '/test/test_api_data';
    console.log(url);
    await axios.get(url).then(response => {
        res.json({
            test_api_data: response.data
        });
    });
})

app.get('/api/currentUser', (req, res) => {
    res.status(200).json({
        id: '123123',
        email: "23djak@gmail.com"
    })
})

function startServer (){
    app.listen(config.port, () => {
        console.log(`Auth OK. listening at https://localhost${config.port}`)
        console.log(config)
    })
}

connectDB()
    .on('error', console.log)
    .on('disconnected', connectDB)
    .once('open', startServer)