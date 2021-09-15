//Install express server
const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static('./dist/toy-store'));

app.get('/*', (req, res) =>
    res.sendFile('../toy-store-fe/src/index.html', {root: 'dist/toy-store/'}),
);

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
