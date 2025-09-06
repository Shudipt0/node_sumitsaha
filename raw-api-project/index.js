// Title: Uptime monitoring application
// Description: A RESTful API to monitor up/down time of user defined links
// Aurthor: Shudipto Roy
// Date: 05/09/2025

// dependencies
const http = require('http');
const { handleReqRes } = require('./helpers/handleReqRes');
const environment = require('./helpers/environments');
const data = require('./lib/data');

// app object - module scaffolding
const app = {};

// testing file system delete later
// data.delete('test', 'newFile', (err) => {
//     console.log(err);
// })

// create server
app.createServer = () => {
    const server = http.createServer(app.handleReqRes);
    // listening to port
    server.listen(environment.port, () => {
        console.log(`listening to port ${environment.port}`);
    });
};

// handle request response
app.handleReqRes = handleReqRes;

// start the server
app.createServer();
