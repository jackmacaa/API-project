# API-project

Create an API that can take in two date parameters and return various calculations

---

## Read first

A GET request to the specific route will need to have a JSON body such as:

{

  "dates" : 
  
    {
  
    "first" : "2021-10-07T12:00:00",
   
    "second" : "2021-10-08T12:00:00",
   
    "convert" : "hours",
  
    "timeZoneFirst" : "+10:30",
  
    "timeZoneSecond" : "+10:00"
  
    }
  
  }

"first" and "second" being the date inputs (dates can be in any order).

"convert" How to change the output from days to: "seconds", "minutes", "hours" or "years" (only works for api/1 currently).

"timeZoneFirst" and "timeZoneSecond" to add on the specific timezone code e.g. "+10:30" is Adelaide, "+01:00" is Italy and "-03:00" is Greenland (only works for api/1 currently).

---

## ROUTES

http://localhost:3000/api/1 - For questions 1, 4 and 5

http://localhost:3000/api/2 - For question 2

http://localhost:3000/api/3 - For question 3

---

## Tested date formats

(YYYY-MM-DDTHH:MM:SS) e.g. "2021-10-07T12:00:00" THIS FORMAT MUST BE USED WHEN SPECIFYING TIMEZONES

(YYYY-MM-DD) e.g. "2021-10-07"

(MM/DD/YYYY) e.g. "10/07/2021"

---

## Log

03/11/2021 - Setup GIT repo, installed express, setup basic routes.

05/11/2021 - Completed basic functionality of Question 1 - 4.

06/11/2021 - Completed basic functionality of Question 5.

07/11/2021 - Tested varying date formats, the dates may be added in any order now, wrote readme.

08/11/2021 - Added comments to the code.


--- 


## VSCODE, INSOMNIA, JAVASCRIPT, EXPRESS


Jack McLoughlin
