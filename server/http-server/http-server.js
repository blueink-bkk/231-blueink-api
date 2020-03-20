import express from 'express';

const assert = require('assert');
const os = require('os');
const fs = require('fs-extra');
const path = require('path')
const inspect = require('util').inspect;
// require('../gmail-auth.js')

//require('./get-gmail-credentials.js')

const app = express();
//const cors = require('cors');
app.use('/static',express.static('public'))

var Busboy = require('busboy');

WebApp.connectHandlers.use(app);

var device = require('express-device');
app.use(device.capture());
app.use(express.urlencoded()); // for submit-form

// https://medium.com/@alexishevia/using-cors-in-express-cac7e29b005b

/*
FIREFOX :: Multiple CORS header ‘Access-Control-Allow-Origin’ not allowed
app.use(cors({credentials:true,}));
*/

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

/*
app.get('/without-cors', (req, res, next) => {
  res.json({ msg: '😞 no CORS, no party!' })
})

app.get('/with-cors', cors(), (req, res, next) => {
  res.json({ msg: 'WHOAH with CORS it works! 🔝 🎉' })
})*/

// MULTIPLE !!! app.options('/forward-email', cors());

app.post('/forward-email', async (req,res,next) =>{
  console.log(`>> forward-email v2 req.body:`, req.body)
  const o = await require('./forward-email.js')(req.body)
  console.log(`@63: o:`,o)
  res.status(200)
  res.end(JSON.stringify(o));
});

/*
app.post('/forward-email', cors(), require('./forward-email.js'));
module.exports = async function(req,res) {
  console.log(`@28: req.body:`, req.body)
  const o = await forward_email(req.body)
  res.status(200)
  res.end(JSON.stringify(o));
}; */


//app.get('/get-gmail-credentials', require('./get-gmail-credentials.js'));


/*
    All uploads go to museum-assets
*/

//function museum_assets(folder) {
const env = process.env.METEOR_SETTINGS && JSON.parse(process.env.METEOR_SETTINGS)
console.log(`@60: http_server.js : `, env)


/*
Meteor.startup(()=>{
  console.log(`http-server Meteor.startup.`);
})
*/
