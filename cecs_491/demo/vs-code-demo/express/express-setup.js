/********************************\ 
   Importing required modules 
\********************************/
const express = require('express');
const path = require('path');


/**************************************\ 
   Initialization of Express instance 
\**************************************/
const app = express();

const viewDir = '/views';

app.isAuthenticated = false; // FOR DEMO ONLY

/***************************************\ 
   Setup Express middleware/pipeline
\***************************************/

// Allows serving static files from specified directory  
app.use(express.static(__dirname + viewDir));


/**********************************************\ 
    Defining URL routes of your application
\**********************************************/


app.get('/', (req, res) => {
    res.send('home page');
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, viewDir, '/login.html'));
});

app.post('/login', (req, res) => {
    app.isAuthenticated = true; // FOR DEMO ONLY
    res.sendStatus(200);
});

app.post('/logout', (req, res) => {
    app.isAuthenticated = false; // FOR DEMO ONLY
    res.sendStatus(200);
});

app.get('/secure', (req, res) => {
    if(app.isAuthenticated) {
        res.sendFile(path.join(__dirname, viewDir, '/secure.html'));
    } else {
        res.redirect('/login');
    }
});



app.get('/api/unsecure/json', (req, res) => {
    res.json([1,2,3]);
});

app.get('/api/secure/json', (req, res) => {
    res.json({
        data: [1,2,3]
    });
});

// curl -X POST http://localhost:8000/api/unsecure/json
app.post('/api/unsecure/json', (req, res) => {
    res.json([1,2,3]);
});


    
// Simple error page handling; must be last route defined
app.get('*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, viewDir,'404.html'));
});

/**********************************************\ 
    Starting up Express 
\**********************************************/
app.listen(8000, () => console.log('Server started at http://localhost:8000')); // Express defaults to port 3000