/**
 * Created by shadow on 16/2/6.
 */


const express = require('express');
const bodyParser = require('body-parser');


const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded());







app.listen(3000);