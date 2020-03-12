const assert = require('assert')

/*
DO NOT USE THEM !!!!!!!!!!!!!!!!!!
//const fetch = require('node-fetch');
//const { URLSearchParams } = require('url');
****************/

import './test-email.html';




FlowRouter.route('/test-email', {
  name: 'email-form',
  action: function(params, queryParams){
        BlazeLayout.render('test-email');
    }
});

const TP = Template['test-email'];




function send_a_mail() {
//  const body1 = `?uname=dkz&email=dominique.klutz@gmail.com&message=hello`
  const body = {
    email:'dominique.klutz@gmail.com',
    uname: 'dkz',
    subject: 'auto-test',
    message: 'this is only a test'
  }

  /*
  const p = fetch('http://localhost:3000/forward-email', {
     method: 'POST',
//       body: new URLSearchParams(fdata) // event.target is the form
//      body: new URLSearchParams(body1),
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
      //body: JSON.stringify(body1)
   })*/

   const params = new URLSearchParams();
   Object.keys(body).forEach(key =>{
     params.append(key, body[key]);
   })

   const p = fetch('http://localhost:3000/forward-email', {
     method: 'POST',
     body: params
   })

   p.then((resp) => {
     console.log(`@27:`,{resp})
     return resp.json(); // or resp.text() or whatever the server sends
   }).then((retv) => {
     console.log(`@30:`,{retv})
     if (retv.error) {
       $('p#mail-error').removeClass('no-display')
     } else {
       $('p#mail-success').removeClass('no-display')
       $('input#submit').addClass('no-display')
     }
   // TODO handle body
   }).catch((error) => {
     console.log(`@97: `,{error})
     //error(error)
   // TODO handle error
   });

}

TP.events({
//  'submit #forward-message':
  'submit .js-submit-email':
    (e,tp)=>{
    event.preventDefault();
    const verbose =1;
    ;(verbose >0) && console.log(`@15: submit .js-submit-form`)

//    send_a_mail();
//    return false;


    const fdata = new FormData(e.target);
    const h = {}

    /*
    for(var pair of fdata.entries()) {
      console.log(pair[0]+ ', '+ pair[1]);
      h[pair[0]] = pair[1]
    }*/

    for(var key of fdata.keys()) {
  //    console.log(pair[0]+ ', '+ pair[1]);
      h[key] = fdata.get(key)
    }

    console.log(`@29: h:`,h)
    console.log(`@60: `,new URLSearchParams(fdata))
    console.log(`@61: `,fdata)

    const _uname = fdata.get('uname')
    const _email = fdata.get('email')
    assert(_email)
    console.log(`@36: _email:${_email}`)
    const _phone = fdata.get('phone')
    const _subject = fdata.get('subject')
    const _msg1 = fdata.get('message')

    const msg2 = `
    <br>
    <div>
    <b>From :</b> ${_uname}
    </div>
    <br>
    <div>
    <b>email address :</b>
    <a href="mailto:${_email}?subject=RE: ${_subject}">
    ${_email}
    </a>
    </div>
    <br>
    <div>
    <b>phone :</b> ${_phone}
    </div>
    <br>
    <div>
    <b>subject :</b> ${_subject}
    </div>
    <br>
    <div>
    <p style="margin:20px; background-color:rgb(230,250,230); max-width:600px; padding:10px; min-height:100px;">
    ${_msg1.replace(/\n/g,'<br>\n')}
    </p>
    </div>
    `;


    fdata.set('message', msg2)
    console.log(`@62: `,msg2)
    console.log(`@79: body:`, new URLSearchParams(fdata))
    console.log(`@80: e.target:`, e.target)

    const params = new URLSearchParams();
    Object.keys(h).forEach(key =>{
      params.append(key, h[key]);
    })
    params.append('message', msg2);



    if (h.remote) {
      fetch('http://ultimheat.co.th/api/email-forward', {
         method: 'POST',
  //       body: new URLSearchParams(fdata) // event.target is the form
        body: params
       }).then((resp) => {
         console.log({resp})
         return resp.json(); // or resp.text() or whatever the server sends
       }).then((retv) => {
         console.log({retv})
         if (retv.error) {
           $('p#mail-error').removeClass('no-display')
         } else {
           $('p#mail-success').removeClass('no-display')
           $('input#submit').addClass('no-display')
         }
       // TODO handle body
       }).catch((error) => {
         console.log(`@97: `,{error})
         //error(error)
       // TODO handle error
       });

      return false;
    }

//    const body: new URLSearchParams(fdata) // event.target is the form

    console.log(`@147: fetch(${e.target.action}) h:`,h)
//    console.log(`@148: fetch(${e.target.action}) body:`,body)


    fetch(e.target.action, {
       method: 'POST',
//       body: h
//       body: new URLSearchParams(fdata) // event.target is the form
      body: params
     }).then((resp) => {
       console.log({resp})
       return resp.json(); // or resp.text() or whatever the server sends
     }).then((retv) => {
       console.log({retv})
       if (retv.error) {
         $('p#mail-error').removeClass('no-display')
       } else {
         $('p#mail-success').removeClass('no-display')
         $('input#submit').addClass('no-display')
       }
     // TODO handle body
     }).catch((error) => {
       console.log(`@97: `,{error})
       //error(error)
     // TODO handle error
     });

    return false;
  }
})
