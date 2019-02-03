
'use strict';

const express = require('express');
const app = express();

const listen_port = 12000;

let response_data_array = [];

app.post('/test', (req, res) => {
    response_data_array.forEach(data => {
        res.send(JSON.stringify(data)); 
    });
});

app.listen(listen_port, 'localhost', () => console.log(`helper http server listening on port ${listen_port}`));

process.send('start_server');

/* -------------------------------------------------------------------------- */

let process_on_message = function(msg) {
    if('data' in msg) {
    } else if('command' in msg) {
        let command = msg.command;
    } else {
        throw new Error(`wrong message : ${msg}`);
    }
};
process.on('message', process_on_message);

let process_on_SIGTERM = function() {
    console.log('process_on_SIGTERM', '00');
//    process.send('shutdown');
    process.removeListener('message', process_on_message);
    process.removeListener('SIGTERM', process_on_SIGTERM);
//    process.exit(0);
};
process.on('SIGTERM', process_on_SIGTERM);

/* vim: set expandtab: */
