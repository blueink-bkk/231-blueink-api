var fs = require('fs');
var readline = require('readline');
var {google} = require('googleapis');
const jsonfile = require('jsonfile');

module.exports = function(req,res) {
  console.log(`get-gmail-credentials`)
  get_gmail_credentials()
  res.status(200)
  .end('credentials-done.');
};

// If modifying these scopes, delete your previously saved credentials
// at TOKEN_DIR/gmail-nodejs.json
//var SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];
const SCOPES = ['https://mail.google.com'];


function get_gmail_credentials(){

  // Change token directory to your system preference
  //var TOKEN_DIR = ('/home/dkz/tmp/gmail-credentials/credentials/');
  //var TOKEN_PATH = TOKEN_DIR + 'gmail-nodejs.json';

  const credentials = Meteor.settings['gmail-credentials'];

  if (!credentials.installed) {
    throw 'MISSING credentials.installed'
  }

  console.log(`@24:`,credentials)

  var gmail = google.gmail('v1');

  var clientSecret = credentials.installed.client_secret;
  var clientId = credentials.installed.client_id;
  var redirectUrl = credentials.installed.redirect_uris[0];

  var OAuth2 = google.auth.OAuth2;

  var oAuth2Client = new OAuth2(clientId, clientSecret,  redirectUrl);


  if (!credentials.token) {
    getNewToken(oAuth2Client, ()=>{
      console.log('done with newToken')
    });
    return;
  }

}


/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 *
 * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback to call with the authorized
 *     client.
 */
function getNewToken(oauth2Client, callback) {
  var authUrl = oauth2Client.generateAuthUrl({access_type: 'offline', scope: SCOPES});
  console.log('Authorize this app by visiting this url: ', authUrl);
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('Enter the code from that page here: ', function(code) {
    rl.close();
    oauth2Client.getToken(code, function(err, token) {
      if (err) {
        console.log('Error while trying to retrieve access token', err);
        return;
      }
//      oauth2Client.credentials = token;
      oAuth2Client.setCredentials(token);
//      storeToken(token);
      console.log({token})
      callback(oauth2Client);
    });
  });
}
