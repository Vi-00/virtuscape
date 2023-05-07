var express = require('express');
var router = express.Router();


const http = require('https');

router.post('/', function (clientReq, clientRes, next) {

    const options = {
        method: 'GET',
        hostname: 'rock-paper-scissors13.p.rapidapi.com',
        path: `/?choice=${clientReq.body.choice}`,
        headers: {
            'X-RapidAPI-Key': '4a0ffe4134msh4a0ecf6e3c2b4d0p1b09d2jsn8ca85d04320b',
            'X-RapidAPI-Host': 'rock-paper-scissors13.p.rapidapi.com'
        }
    };

    const request = http.request(options, function (res) {
        const chunks = [];

        res.on('data', function (chunk) {
            chunks.push(chunk);
        });

        res.on('end', function () {
            const body = Buffer.concat(chunks).toString();
            console.log(body);
            try {
                const data = JSON.parse(body);
                const ai_choice = data.ai.name;
                const message = data.result;
                const clientResponse = {ai_choice, message};
                console.log(clientResponse);
                clientRes.status(200).send(clientResponse);
            } catch (error) {
                console.error(error);
                clientRes.status(500).send('Internal Server Error');
            }
        });
    });

    request.end();
});

module.exports = router;
