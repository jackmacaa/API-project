const express = require('express');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get('/', (req, res) => {
    res.send('home');
})

app.get('/api/1', (req, res) => {

        let firstDate = req.body.dates.first;
        let dateOne = new Date(firstDate);
    
        let secondDate = req.body.dates.second;
        let dateTwo = new Date(secondDate);

        let diff = (dateOne - dateTwo) / 1000 / 60 / 60 / 24;
        
       //res.send(`${diff}` + " Days Between " + `${dateOne}` + " and " + `${dateTwo}`);
       res.send(`${diff}`);

    //console.log(firstDate);
    //console.log(date);
});

app.get('/api/2', (req, res) => {

    let firstDate = req.body.dates.first;
    let dateOne = new Date(firstDate);

    let secondDate = req.body.dates.second;
    let dateTwo = new Date(secondDate);

    function getNumWorkDays(dateTwo, dateOne) {
        var numWorkDays = 0;
        var currentDate = new Date(dateTwo);
        while (currentDate <= dateOne) {
            if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
                numWorkDays++;
            }
            currentDate = currentDate.addDays(1);
        }
        return numWorkDays;
        
    }

    Date.prototype.addDays = function (days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
    };

   let diff = getNumWorkDays(dateTwo, dateOne);

    res.send(`${diff}`);

//console.log(firstDate);
//console.log(date);
});

app.listen(3000, () => {
    console.log('Serving on port 3000')
})