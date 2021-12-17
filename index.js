const express = require('express');
const rutas = require('./routers/app.routers');
const app = express();
const PORT = process.env.PORT || 8080;

//Middlewares
app.use(express.static('public'));

//Routes
app.use('/api', rutas);

const connectedApp = app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

connectedApp.on('error', (err) => {
    console.error(err);
});