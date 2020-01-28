import { Meteor } from 'meteor/meteor';

//import './methods/upload-file.js'
import './http-server/http-server.js'

Meteor.startup(() => {
//  _assert(!cms.error, cms, 'fatal-@7 error in cms.')
  // console.log(`cms:`,cms)
  console.log('env:', Meteor.settings)
});
