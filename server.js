const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
var cors = require('cors');

const app = express();

const PORT = process.env.PORT || 8080;

var corsOptions = {
    origin: 'https://sboot-blue-wallet.herokuapp.com/',
    optionsSuccessStatus: 200
 }

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
   extended: false
}));

app.use(express.static(__dirname + '/dist/blue-wallet'));

app.get('/webapi', cors(corsOptions), function(req, res, next) {
    res.json({
       msg: 'This is CORS-enabled for Java API!'
    })
 });


app.get('/*', (req, res) => {
    res.sendFile(__dirname + '/dist/blue-wallet/index.html');
});

app.listen(PORT, () => {
    console.log('Servidor iniciando na porta ' + PORT);
});