const express = require('express');
const server = express();
const path = require("path");
const port = 9000;
const bodyParser = require('body-parser');

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(express.static(path.join(__dirname, '..', "frontend", 'dist')));

server.get("/", (req, res) => {
    return res.status(200).sendFile(path.join(__dirname, '..', "frontend/dist/index.html"));
});

server.listen(port, (err) => {
    if (!err) {
        console.log("Server started on port " + port);
    }
    else {
        console.log(err);
    }
})