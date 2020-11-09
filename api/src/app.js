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

    res.send(`Api OK. Hello World!`)
})

app.get('/api/user', async (req, res) => {
     await axios.get(config.authApiUrl + '/currentUser').then(response => {
        res.json({
            id: '123123',
            email: "23djak@gmail.com",
            from: 'API',
            response: response.data
        })
    })

})

app.get('/api/test/test_api_data', (req, res) => {
    console.log('test works');
    res.status(200).json({
        test_with_api: true
    });
})



function startServer (){
    app.listen(config.port, () => {
        console.log(`Api OK. listening at https://localhost${config.port}`)
        console.log(config)
    })
}

connectDB()
    .on('error', console.log)
    .on('disconnected', connectDB)
    .once('open', startServer)