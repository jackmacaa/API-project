const weekdays = (req, res) => {

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
};

module.exports = weekdays;