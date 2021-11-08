const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('home');
})

app.get('/api/1', (req, res) => {

    let firstDate = req.body.dates.first;
    let secondDate = req.body.dates.second;;
    let convert = req.body.dates.convert;
    let timeZoneFirst = req.body.dates.timeZoneFirst;
    let timeZoneSecond = req.body.dates.timeZoneSecond;
    let error = ""

    // Error checking for empty date field/s
    if(req.body.dates.first === "")
    {
        error += "First, "
    }

    if(req.body.dates.second === "")
    {
        error += "Second"
    }

    // Adding timezone to end of date string, will only work in (YYYY-MM-DDTHH:MM:SS) format.
    firstDate += timeZoneFirst;
    secondDate += timeZoneSecond;

    let dateOne = new Date(firstDate);
    let dateTwo = new Date(secondDate);

    // Calculating two date inputs, date objects are stored as MS from 01/01/1970.
    let diff = dateOne - dateTwo;

    // Checking if the user requests the output anything different from "Days".
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

    // Removing the "-" sign if the user put the dates in reverse order.
    diff = Math.abs(diff);
    
    if(error)
    {
        res.send(`${error}` + " Date missing");
    }
    else 
    {
        res.send(`${diff}`);
    }
    
});

app.get('/api/2', (req, res) => {

    let firstDate = req.body.dates.first;
    let secondDate = req.body.dates.second;

    let dateOne = new Date(firstDate);
    let dateTwo = new Date(secondDate);

    // Checking if user dates are input in right order, swapping if not.
    if(dateOne < dateTwo)
    {
        [dateOne, dateTwo] = [dateTwo, dateOne];
    }

    // Checking if day is Saturday or Sunday and counting if not until dates are equal.
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

    // Allowing incrementation of x days 
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

    if(dateOne < dateTwo)
    {
        [dateOne, dateTwo] = [dateTwo, dateOne];
    }

    // Checking if day is previous day of current date, and counting if so until dates are equal. 
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

app.listen(PORT, () => {
    console.log('Serving on port ' + `${PORT}`)
});