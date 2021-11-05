const express = require('express');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('home');
})

app.get('/api/1', (req, res) => {

    let firstDate = req.body.dates.first;
    let secondDate = req.body.dates.second;
    let convert = req.body.dates.convert

    let dateOne = new Date(firstDate);
    let dateTwo = new Date(secondDate);

    let diff = (dateOne - dateTwo);

    switch (convert) 
    {
        case "seconds":
            diff = diff / 1000;
            break;

        case "minutes":
            diff = diff / 1000 / 60;
            break;

        case "hours":
            diff = diff / 1000 / 60 / 60;
            break;

        case "years":
            diff = diff / 1000 / 60 / 60 / 24 / 365;
            diff = Math.round(diff * 100) / 100
            break;

        default:
        diff = diff / 1000 / 60 / 60 / 24
    }

    //res.send(`${diff}` + " Days Between " + `${dateOne}` + " and " + `${dateTwo}`);
    res.send(`${diff}`);
});

app.get('/api/2', (req, res) => {

    let firstDate = req.body.dates.first;
    let dateOne = new Date(firstDate);

    let secondDate = req.body.dates.second;
    let dateTwo = new Date(secondDate);

    function getNumWorkDays(dateTwo, dateOne) 
    {
        let numWorkDays = 0;
        let currentDate = new Date(dateTwo);

        while (currentDate <= dateOne) 
        {
            if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) 
            {
                numWorkDays++;
            }
            currentDate = currentDate.addDays(1);
        }

        return numWorkDays;
    }

    Date.prototype.addDays = function (days) 
    {
        let date = new Date(this.valueOf());

        date.setDate(date.getDate() + days);

        return date;
    };

    let diff = getNumWorkDays(dateTwo, dateOne);

    res.send(`${diff}`); 

});

app.get('/api/3', (req, res) => {

    let firstDate = req.body.dates.first;
    let secondDate = req.body.dates.second;

    let dateOne = new Date(firstDate);
    let dateTwo = new Date(secondDate);

    function getNumWorkDays(dateTwo, dateOne) 
    {
        let numWorkDays = 0;
        let currentDate = new Date(dateTwo);
        const startDay = currentDate.getDay() - 1;

        while (currentDate <= dateOne) 
        {
            if (currentDate.getDay() === startDay) 
            {
                numWorkDays++;
            }

            currentDate = currentDate.addDays(1);
        }

        return numWorkDays;
    }

    Date.prototype.addDays = function (days) 
    {
        let date = new Date(this.valueOf());

        date.setDate(date.getDate() + days);

        return date;
    };

    let diff = getNumWorkDays(dateTwo, dateOne);

    res.send(`${diff}`);
});

app.listen(3000, () => {
    console.log('Serving on port 3000')
})