/**
 * Created by shadow on 16/2/5.
 */

'use strict';

const express = require('express');
const app = express();

const r1 = express.Router();

app.get('/test',function(req,res){
    res.send(`
        <ul>
            <li>req.method = ${req.method}</li>
            <li>req.hostname = ${req.hostname}</li>
            <li>req.originalUrl = ${req.originalUrl}</li>
            <li>req.protocol = ${req.protocol}</li>
            <li>req.query = ${JSON.stringify(req.query)}</li>
        </ul>

    `);
});






app.listen(3000);

