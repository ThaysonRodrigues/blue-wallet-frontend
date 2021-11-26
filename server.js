const express = require('express');
const { createProxyMiddleware} = require('http-proxy-middleware');
const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.static(__dirname + '/dist/blue-wallet'));

app.use('/api', createProxyMiddleware({ target: 'https://sboot-blue-wallet.herokuapp.com', changeOrigin: true }));

app.get('/*', (req, res) => {
    res.sendFile(__dirname + '/dist/blue-wallet/index.html');
});

app.listen(PORT, () => {
    console.log('Servidor iniciando na porta ' + PORT);
});