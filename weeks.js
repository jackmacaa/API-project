const weeks = (req, res) => {

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
};

module.exports = weeks;