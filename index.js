const express = require('express');
require('dotenv').config();
const app = express();
const SerpApi = require('google-search-results-nodejs');
const key = process.env.API_KEY;
const search = new SerpApi.GoogleSearch(key)



const PORT = process.env.PORT;

app.use(express.json())
app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.sendFile('index.html', {root: __dirname});
})

app.post('/api', (req, res) => {
    console.log(req.body);
    const params = {
        q: `${req.body.name} toy`,
        tbm: 'isch',
        ijn: 0,
        safe: 'active',
        star: 1,
        num: 1
    }
    const callback = (data) => {
        const IMAGE = data['images_results'][0]['original']
        console.log(IMAGE);
    }
    search.json(params, callback)
    res.json({
        message: "Data Recieved!"
    })
})


app.listen(PORT, () => {
    console.log('On port 3000')
})