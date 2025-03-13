// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
    res.json({ greeting: 'hello API' });
});

app.get('/api/:date?', function (req, res) {
    let date = req.params.date;
    let momentDate;

    if (!date) {
        // Jika parameter kosong, gunakan waktu saat ini
        momentDate = moment();
    } else if (!isNaN(date)) {
        // Jika parameter adalah angka, anggap itu sebagai timestamp Unix
        momentDate = moment(parseInt(date));
    } else {
        // Coba parsing tanggal dengan moment
        momentDate = moment(date);
    }

    // Cek apakah tanggal valid
    if (!momentDate.isValid()) {
        return res.json({ error: "Invalid Date" });
    }

    // Kembalikan objek JSON dengan unix dan utc
    res.json({
        unix: momentDate.valueOf(),
        utc: momentDate.utc().format('ddd, DD MMM YYYY HH:mm:ss [GMT]'),
    });
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
    console.log('Your app is listening on port ' + listener.address().port);
});
