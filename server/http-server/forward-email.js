const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
const fetch = require('node-fetch')


//function museum_assets(folder) {
const env = process.env.METEOR_SETTINGS && JSON.parse(process.env.METEOR_SETTINGS)
console.log(`@9: forward-email : `, env)

const oAuth2Client = require('../get-oAuthClient.js')(env);
const gUtils = require('../gmail-utils.js')

/*******************
module.exports = async function(req,res) {
  console.log(`@28: req.body:`, req.body)
  const o = await forward_email(req.body)
  res.status(200)
  res.end(JSON.stringify(o));
};
******************/

module.exports = function(vi) { // forward-email
  console.log(`@57: forward_email visitor:`,{vi}) // uname, email, phone, subject, message

  const {uname, email, phone, subject, message} = vi;

  return new Promise((resolve, reject)=>{
    if (!vi.email) {
      resolve(Object.assign(vi,{error:'missing-email'}))
      return;
    }
    //    const o = await forward_email(req.body)
    //    res.end(JSON.stringify(o));

    const retv = gUtils.send_a_mail(oAuth2Client, {
      to: 'ultimheat@gmail.com',
      from: uname, // <ultimheat@gmail.com> will be added later
      subject,
      message
    })
    resolve(retv)
  }) // promise
} // forward-email
