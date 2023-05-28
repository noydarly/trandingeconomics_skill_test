const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser');
const te = require('tradingeconomics');

let corsOptions = {
    origin: process.env.FRONT_ORIGIN.split(' ')
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors(corsOptions));

te.login(process.env.CLIENT_KEY);

app.get('/history/:country/:indicator', async (req, res) => {
    const country = req.params.country;
    const indicator = req.params.indicator;
    console.log(country, indicator);
    try {
        const history = await getHistory(country, indicator);
        res.send({
            'success': true, 'data': history
        });
    } catch (error) {
        console.log(error);
        res.send({
            'success': false, 'message': error.message
        });
    }
    return;
});

app.get('/countries', async (req, res) => {
    try {
        const indicators = await getAllCountries();
        res.send({
            'success': true, 'data': indicators
        });
    } catch (error) {
        console.log(error);
        res.send({
            'success': false, 'message': error.message
        });
    }
    return;
});

app.get('/indicators', async (req, res) => {
    try {
        const indicators = await getAllIndicators();
        res.send({
            'success': true, 'data': indicators
        });
    } catch (error) {
        console.log(error);
        res.send({
            'success': false, 'message': error.message
        });
    }
    return;
});

const port = process.env.BACKEND_PORT || 8002;
console.log(port);

app.listen(port, 'localhost', () => console.log(`Server running on port ${port}`));

async function getHistory(countryName = 'mexico', indicatorName = 'gdp') {
    
    const data = await te.getHistoricalData(country = countryName, indicator = indicatorName);
    return data;
}

async function getAllCountries() {
    
    const data = await te.getAllCountries()
    return data;
}

async function getAllIndicators() {
    
    const data = await te.getIndicatorData()
    return data;
}