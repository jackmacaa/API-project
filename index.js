const express = require('express');

const days = require("./days");
const weekdays = require("./weekdays");
const weeks = require("./weeks");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/api/1', days);

app.get('/api/2', weekdays);

app.get('/api/3', weeks);

app.listen(PORT, () => {
    console.log('Serving on port ' + `${PORT}`)
});