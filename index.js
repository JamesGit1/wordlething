const fs = require('fs');
var data = "";

// Main API code for current data retrieval
var
    express = require('express'),
    http = require('http');

var app = express();
//const PORT = 8080;

try {
    data = fs.readFileSync('input.txt', 'utf8')
} catch (err) {
    console.error(err)
}

var lines = data.toString().split("\n");

const dayNumber = lines[0].split(" ")[1];
const score = lines[0].split(" ")[2].replace("\r","");

// Just get answerboard
lines.shift();
lines.shift();

app.get('/todaysWordle', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*'); //There's issues on webserver if CORS access isn't set

    res.status(200).send({
        dayNumber: dayNumber,
        score: score,
        answer: lines,
    })
});

// Start the server
var server = http.createServer(app);

server.listen(process.env.PORT || 5000, function (err) {
    console.info('listening in http://localhost:5000');
});