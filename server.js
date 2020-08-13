import express from 'express';
import serveStatic from "serve-static";
import { join } from 'path';
app = express();
app.use(serveStatic(join(__dirname, 'dist')));
const port = process.env.PORT || 8080;
app.listen(port);