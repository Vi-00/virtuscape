const mongoose = require('mongoose');
var express = require('express');
var router = express.Router();

const http = require('https');

var mongoURI = 'mongodb+srv://WebdUser:6ujMc70IXeHOlruP@vicluster.okg8wjy.mongodb.net/Virtuescape?retryWrites=true&w=majority'

const connectToMongo = async () => {
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB");
};

connectToMongo();

// Schema for users of app
const rockPaperScissorSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    userChoice: {
        type: String,
        required: true,
    },
    aiChoice: {
        type: String,
        required: false,
    },
    result: {
        type: String,
        required: false,
        default: "Unknown"
    },
    date: {
        type: Date,
        default: Date.now,
    },
});
const RpsSchema = mongoose.model('rockPaperScissor', rockPaperScissorSchema);

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
            // console.log(body);
            try {
                const data = JSON.parse(body);
                const ai_choice = data.ai.name;
                const message = data.result;
                const clientResponse = {ai_choice, message};
                console.log(clientResponse);
                console.log("Saving user and ai response to mongodb");
                const rpsEntry = new RpsSchema({
                    userName: "Vicky",
                    userChoice: clientReq.body.choice,
                    aiChoice: ai_choice,
                    result: message
                });
                rpsEntry.save();
                clientRes.status(200).send(clientResponse);
            } catch (error) {
                console.log("Game failed due to following error. Saving the user name and choice to mongodb");
                const rpsEntry = new RpsSchema({
                    userName: "Vicky",
                    userChoice: clientReq.body.choice
                });
                rpsEntry.save();
                console.error(error);
                clientRes.status(500).send('Internal Server Error');
            }
        });
    });

    request.end();
});

module.exports = router;
