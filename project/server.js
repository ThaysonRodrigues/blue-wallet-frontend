const express = require('express');
const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.static(__dirname + '/dist/blue-wallet'));

app.get('/*', (req, res) => {
    res.sendFile(__dirname + '/dist/blue-wallet/index.html');
});

app.listen(PORT, () => {
    console.log('Servidor iniciando na porta ' + PORT);
});