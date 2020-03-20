import { Meteor } from 'meteor/meteor';

//import './methods/upload-file.js'
import './http-server/http-server.js'

//import './gmail-test.js'

WebApp.rawConnectHandlers.use("/forward-email", function(req, res, next) {
  res.setHeader("Access-Control-Allow-Headers", "Authorization,Content-Type");
  res.setHeader("Access-Control-Allow-Origin", "*");
  return next();
});

Meteor.startup(() => {
//  _assert(!cms.error, cms, 'fatal-@7 error in cms.')
  // console.log(`cms:`,cms)
  console.log('@12: Meteor.startup() env:', Meteor.settings)
});
