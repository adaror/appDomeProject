Welcome to the Appdome back-end test!
npm run test will run our test suite.


1. Create a GET API on '/api/files' that will run on all the text files in the 'textfiles' dir in parallel, get their contents and return JSON with keys set to the file names and value to
their contents, response example:
{
  "text1.txt": "file 1 contents",
  "text2.txt": "file 2 contents",
  "text3.txt": "file 3 contents",
  "text4.txt": "file 4 contents",
}

Response code should be 200.


2. Create a POST API on "/api/paths" that gets JSON where every value is either an object or an emtpy string, like this:
{
  "a": {
    "b": {
      "c": ""
    }
  },
  "d": {
    "e": ""
  },
  "f": {
    "g": "",
    "h": {
      "i": ""
    }
  }
}
and responds with a the same JSON, except every empty string is replaced with the path to the property:
{
  "a": {
    "b": {
      "c": "a.b.c"
    }
  },
  "d": {
    "e": "d.e"
  },
  "f": {
    "g": "f.g",
    "h": {
      "i": "f.h.i"
    }
  }
}
 
No need to handle bad input. respond with 200.







3. Create a POST API, /api/parse, with the following interface:
--------------------------
| Field  |  Description  |
--------------------------
| userId | the user's ID |
--------------------------
|  file  | The app file  |
--------------------------

The route will parse the app using the included python script and return the output with status code 200 if the user is allowed to do parse this app, and 403 otherwise.
A user is allowed to parse an app if the app type matches his permissions, as indicated by the "platforms" and "reactAllowed" properties.
The users are located under the "DB" folder, and the apps under the "apps" folder. 

To parse the app, you should run the python script "parseFile.py", as follows:
python parseFile.py --file="react.ipa"
which will return the following
{'platform': 'ipa', 'react': true}

Good luck! :)