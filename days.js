const days = (req, res) => {

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
    
};

module.exports = days;