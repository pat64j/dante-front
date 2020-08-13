const express = require('express');
const serveStatic = require("serve-static");
const path = require('path');
const history = require('connect-history-api-fallback');


app = express();
app.use(serveStatic(path.join(__dirname, 'dist')));
app.use(history({
    disableDotRule: true,
    verbose: true
}));
const port = process.env.PORT || 8080;
app.listen(port);
console.log("app is listening on port: ${port}");