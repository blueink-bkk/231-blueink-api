const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');

// If modifying these scopes, delete token.json.
//const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];
//const SCOPES = ['https://www.googleapis.com/auth/gmail.compose'];
const SCOPES = ['https://mail.google.com'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.


const {client_secret, client_id, redirect_uris} = //_cre.installed; // JSON.parse(cre).installed;
    Meteor.settings['gmail-credentials'].installed;


const oAuth2Client = new google.auth.OAuth2(
    client_id, client_secret, redirect_uris[0]
  );


const token = Meteor.settings['gmail-credentials'].token;

oAuth2Client.setCredentials(token);

module.exports = async function(req,res) {
  // console.log(`req.body:`, req.body)
  const o = await email_forward(req.body)
  res.status(200)
  res.end(JSON.stringify(o));
};


const gmail = google.gmail({version: 'v1', auth:oAuth2Client});

/*
gmail.users.labels.list({
  userId: 'me',
}, (err, res) => {
  if (err) return console.log('The API returned an error: ' + err);
  const labels = res.data.labels;
  if (labels.length) {
    console.log('Labels:');
    labels.forEach((label) => {
      console.log(`- ${label.name}`);
    });
  } else {
    console.log('No labels found.');
  }
}); */


// ======================================================================

function email_forward(vi) {
  console.log(`email_forward visitor:`,{vi}) // uname, email, phone, subject, message

  return new Promise((resolve, reject)=>{
    if (!vi.email) {
      resolve(Object.assign(vi,{error:'missing-email'}))
      return;
    }
    //    const o = await email_forward(req.body)
    //    res.end(JSON.stringify(o));

    const encodedMail = build_Message(oAuth2Client, vi);

    gmail.users.messages.send({
        auth: oAuth2Client,
        userId: 'me',
//        sendAsEmail: 'jules@cesar3.com',
//        displayName: 'jules@cesar2.com',
//        replyToAddress: 'jules@cesar.com',
        resource: {
            raw: encodedMail
        }
    })
    .then(retv=>{
      console.log(`sendMessage:`,{retv})
      resolve({error:null, status:'email-sent'})
    })
    .catch(err =>{
      console.log(`sendMessage error:`,{err})
      resolve({error:err, status:'email-rejected'})
    })
  });
}

//const visitor_email_address = '104samlee@gmail.com';

//sendMessage(oAuth2Client, vi);


function build_Message(auth, form) {

//  const _to = 'ultimheat@gmail.com'
  const _to = 'dominique.klutz@gmail.com'

  const str = `Content-Type: text/html; charset=\"UTF-8\"
MIME-Version: 1.0
Content-Transfer-Encoding: 7bit
to: ${_to}
bcc: alan.gaspachio@gmail.com
From: ${form.email.split('@')[0]} [contact-us]<tests.bkk@gmail.com>
subject: ${form.subject}

${form.message}
`;

  var encodedMail = new Buffer(str).toString("base64").replace(/\+/g, '-').replace(/\//g, '_');

  return encodedMail;
}
