const express = require('express');
//imports express 

//import the hubs model file, get access to DB
const Hubs = require('./data/hubs-model');

//Hubs has a Find(), FindbyId(), add(), remove(), update() methods

const server = express();

server.use(express.json()); //use this lin eto teach express to parseJson


server.get('/', (req,res) => {
    res.send('hello world');
})

//see a list of hubs (channel on slack) hubs
server.get('/hubs', (req, res) => {
    //Find returns a promise so we need then/catch
    Hubs.find()
    .then(hubs => {
        //.json will convert the data passed to json
        //also tells the client we're sending JSON through and HTTP header
        res.status(200).json(hubs)
    })
    .catch(err => {
        res.status(500).json({ message: 'error getting the list of hubs' });
    })
})

server.post('/hubs', (req,res) => { 
    const hubInformation = req.body;
    console.log('hub infor from body', hubInformation);
    Hubs.add(hubInformation)
    .then(hub => {
        res.status(201).json(hub);
    })
    .catch(err => {
        res.status(500).json({ message: 'error adding the hub' })
    })
})
//see a list of Hubs(channel on Slack)
//create Hub, delete Hub, update Hub


//Clients makes REQUESTS to the server
//Server must listen for REQUESTS on a particular PORT
const port = 8000;
server.listen(port, () => console.log(`\nAPI running\n on port ${port}`))

//Steps
//npm i express
//add 'index.js' file to folder root
//added code above
//type 'npm run server' to start the api