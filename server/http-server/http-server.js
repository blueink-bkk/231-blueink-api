import express from 'express';

const assert = require('assert');
const os = require('os');
const fs = require('fs-extra');
const path = require('path')
const inspect = require('util').inspect;

const app = express();
app.use('/static',express.static('public'))

var Busboy = require('busboy');

WebApp.connectHandlers.use(app);

var device = require('express-device');
app.use(device.capture());
app.use(express.urlencoded()); // for submit-form

//const bodyParser = require("body-parser");
//app.use(bodyParser.urlencoded({ extended: true }));

//const formidable = require("express-formidable");
//app.use(formidable());

//const file_Upload = require('express-fileupload');
//app.use(file_Upload());


//const cms = require('../cms-server.js');

app.get('/ping', require('./ping.js'))
app.post('/eemail-forward', async (req, res)=>{
  // VALIDATE DATA !!!!
  console.log(`req.body:`, req.body)
  const o = await email_forward(req.body)
  res.end(JSON.stringify(o));
})


app.post('/email-forward', require('./email-forward.js'));




/*
    All uploads go to museum-assets
*/

//function museum_assets(folder) {
const env = process.env.METEOR_SETTINGS && JSON.parse(process.env.METEOR_SETTINGS)
console.log({env})


/*
Meteor.startup(()=>{
  console.log(`http-server Meteor.startup.`);
})
*/
