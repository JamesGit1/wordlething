const fs = require('fs');
var cors = require('cors')
var data = "",
    dayNumber, score, lines, date;

// Main API code for current data retrieval
var
    express = require('express'),
    http = require('http');

var app = express();
app.use(cors())
    //const PORT = 8080;

app.use(express.json())

function addStr(str, index, stringToAdd) {
    return str.substring(0, index) + stringToAdd + str.substring(index, str.length);
}

function loadData() {
    try {
        data = fs.readFileSync('input.txt', 'utf8')
    } catch (err) {
        console.error(err)
    }

    lines = data.toString().split("\n");

    dayNumber = lines[0].split(" ")[1];
    score = lines[0].split(" ")[2];
    date = lines[0].split(" ")[3].replace("\r", "");

    // Just get answerboard
    lines.shift();
    lines.shift();
}

//console.log(lines);

app.get('/todaysWordle', (req, res) => {
    loadData();
    const utc = new Date().toJSON().slice(0, 10).replace(/-/g, '/');

    if (date === utc) {
        res.status(200).send({
            dayNumber: dayNumber,
            score: score,
            answer: lines,
        })
    } else {
        res.status(200).send({
            answer: "Looks like I haven't done the wordle for today yet! 😲",
        })
    }
});

app.post('/todaysWordle', (req, res) => {
    const { id, wordle } = req.body;

    if (!wordle || id !== "B@ufeFfsmcE57cJZSE%5Sn@C&5UC*CcEWnF&e8TthF@ZcTmwp3LsPwLHFMZ7SewEhkMdUJWQkcEe3sNY&Kjw@oAe!k2!@dkPe93$") {
        res.status(418).send({ message: 'Wordle Request Failed, Please provide correct id and data for wordle' })
    } else {
        const utc = new Date().toJSON().slice(0, 10).replace(/-/g, '/');

        // write JSON string to a file
        fs.writeFile('input.txt', addStr(wordle, wordle.indexOf("\n"), utc), (err) => {
            if (err) {
                throw err;
            }
            console.log("JSON data is saved.");
        });

        res.status(200).send({
            message: 'submitted todays wordle!'
        })
    }
});

// Start the server
var server = http.createServer(app);

server.listen(process.env.PORT || 5000, function(err) {
    console.info('listening in http://localhost:5000');
});