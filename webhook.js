var express = require('express'),
  app = express(),
  http = require('http'),
  httpServer = http.Server(app),
  // passport = require('passport'),
  // TwitterStrategy = require('passport-twitter').Strategy,
  session = require('express-session');
const crypto = require('crypto');
var router = express.Router();
// Moment JS
var moment = require('moment');
var momentTz = require('moment-timezone');
var dbs = require('./db');
// dbs.ClientRiskProfileGet({Active:'Y',ClientID:'C10112'}).then(function(data){
// console.log(data)
// })
// Microsoft Graph client
var MicrosoftGraph = require("@microsoft/microsoft-graph-client");
var authHelper = require('./helper');
// Passport session setup.
// passport.serializeUser(function (user, done) {
//   done(null, user);
// });

// passport.deserializeUser(function (obj, done) {
//   done(null, obj);
// });

// passport.use(new TwitterStrategy({
//     consumerKey: process.env.consumer_key,
//     consumerSecret:process.env.consumer_secret,
//     callbackURL: "http://ec2-18-232-207-49.compute-1.amazonaws.com:9000/auth/twitter/callback"
//   },
//   function(token, tokenSecret, profile, done) {
//     process.nextTick(function () {
//       //Check whether the User exists or not using profile.id
//       return done(null, profile);
//     });
//   }
// ));
var dateUTC = moment().utc().format()
let startdate = dateUTC;
let enddate = moment().add(15, 'minutes').utc().format();
console.log(startdate);
console.log(enddate);
var bodyParser = require('body-parser');
var fs = require('fs');
const requestAPI = require('request');
app.use(bodyParser.json());
app.use(express.static(__dirname));
// app.use(passport.initialize());
// app.use(passport.session());
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
  extended: true
}));


// app.get('/auth/twitter', passport.authenticate('twitter'));

// app.get('/auth/twitter/callback',
//   passport.authenticate('twitter', {failureRedirect: '/roaming' }),
//   function(req, res) {
//     console.log('twitter auth');
//     console.log('res -->', res);
//     res.redirect('/chatwindow?sessionstate=true');
// });

var jsonIncompleteTran = [];
async function requestApi(){
  console.log('srini');
  const header = {
    'Cache-Control': 'no-cache',
    Accept: 'application/json',
    'Content-Type': 'application/json'
  };
  var options = {
    url: "https://disco.crm5.dynamics.com/api/discovery/v9.0/",
    method: "GET",
    header: header,
    body: "",
    json: true,
    auth: {
      user: "Integrationuser@HexaMA.onmicrosoft.com",
      password: "10Sep2018@"
    }
  };
   
  await requestAPI(options, function (error, response, body) {
    console.log("-----------------Srini---------------------");
    console.log(body);
   });
}
requestApi();
app.get('/',  async function (req, res) {

  res.send("/richowebsites");
});
app.post("/webhook",async (req,res)=>{
  var options = {
    url: "https://api.dialogflow.com/v1/query?v=20150910",
    method: "POST",
    headers: { 'Authorization': 'Bearer ' + 'ee3683b183ec498ea5a1f277a85974fd', 'Content-Type': 'application/json'},
    body: req.body,
    json: true
  };
  await requestAPI(options, function (error, response, body) {
   res.send(body);
  });
})

app.post('/sendEmail', async function (req, res) {
  console.log(req.body.params);
  let message=req.body.message;
  var client = MicrosoftGraph.Client.init({
    authProvider: (done) => {
      done(null, req.body.params); //first parameter takes an error if you can't get an access token
    }
  });
  
  try {
    await client
    .api('https://graph.microsoft.com/v1.0/me/sendMail')
    .post({
      "message": message
    }, (err, resp) => {
      console.log(resp);
      console.log(err);
        res.send("Email Send")
    })
 
  }
  catch(e){
    res.send("Error"+e)
  }


})
app.post('/outlook', async function (req, res) {

  var client = MicrosoftGraph.Client.init({
    authProvider: (done) => {
      done(null, req.body.params); //first parameter takes an error if you can't get an access token
    }
  });
  try {
    var dateUTC = moment().utc().format()
    let startdate = dateUTC;
    let enddate = moment().add(15, 'minutes').utc().format();
    console.log(startdate);
    console.log(enddate);
    const result = await client
      .api(`https://graph.microsoft.com/v1.0/me/calendarView?StartDateTime=${startdate}&EndDateTime=${enddate}`)
      .get();
    let data = result.value;
    console.log(result);
    res.send(result);
  } catch (e) {
    res.send(e)
  }

})
app.get('/auth', function (req, res) {
  let parms = {};
  parms.signInUrl = authHelper.getAuthUrl();
  res.redirect(parms.signInUrl);
});
app.get('/authorize', async function (req, res, next) {
  const code = req.query.code;
  if (code) {
    let token;
    try {
      token = await authHelper.getTokenFromCode(code);
      res.redirect('chatwindow?token=' + token);
    } catch (error) {
      res.send('error', JSON.stringify({
        error: error
      }));
    }
  } else {
    res.send('Authorization failed');
  }

});
app.post('/callPhone', function (req, res) {
  callServiceNowApi("https://dev64379.service-now.com/api/now/table/u_servicerequest?sysparm_limit=1&sysparm_query=ORDERBYDESCsys_created_on&u_string3=9876543210&u_choice_1=in%20progress", null, "GET", function (err, data) {
    res.send(data);
  })
})
app.get('/Admin/RiskProfile', function (req, res) {
  res.sendfile(__dirname + '/Admin/risk-profile.html');
})
app.get('/Admin/ProductPerformance', function (req, res) {
  res.sendfile(__dirname + '/Admin/product-performance.html');
})
app.get('/Admin/Dashboard', function (req, res) {
  res.sendfile(__dirname + '/Admin/index.html');
})
app.get('/Admin/holdings', function (req, res) {
  res.sendfile(__dirname + '/Admin/holdings.html');
})
app.get('/Admin/Profile', function (req, res) {
  res.sendfile(__dirname + '/Admin/profile.html');
})
app.get('/Admin/transactions', function (req, res) {
  res.sendfile(__dirname + '/Admin/transactions.html');
})
app.post('/updateSessionState', function (req, res) {
  callServiceNowApi("https://p3ep1jeoz4.execute-api.us-east-1.amazonaws.com/Dev/updatesession", {
    type: req.body.params,
    sessionID: req.body.sessionId,
  }, "POST", function (err, data) {

    res.send(data);
  })
})
app.get('/chatwindow', function (req, res) {
  readFile("IncompleteTransaction.json", function (hasFile, data) {
    if (hasFile) {
      jsonIncompleteTran = data;
    }
    res.sendfile(__dirname + '/chatwindow1.html');
  });
});
app.get('/roaming', function (req, res) {
  readFile("IncompleteTransaction.json", function (hasFile, data) {
    if (hasFile) {
      jsonIncompleteTran = data;
    }
    res.sendfile(__dirname + '/roaming.html');
  });
});
app.get('/chat', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});
app.post("/viewProfile", async function (req, res) {
  let custid = req.body.params;
  console.log(custid);
  await dbs.ClientProfileGet({
    ClientId: custid
  }).then(function (data) {
    res.send(data);
  })
 
})
app.post("/viewTransactions", async function (req, res) {
  let custid = req.body.params;
  await dbs.transactionsGet({
    CustomerID: custid
  }).then(function (data) {
    console.log(data);
    res.send(data);
  })
 
})
app.post("/viewProductPerformance", async function (req, res) {
  let custid = req.body.params;
  await dbs.productPeformance().then(function (data) {
    console.log(data);
    res.send(data);
  })
 
})
app.post("/viewRiskProfile", async function (req, res) {
  let custid = req.body.params;
  console.log(custid);
  await dbs.ClientRiskProfileGet({
    ClientID: custid
  }).then(function (data) {
    console.log(data);
    res.send(data);
  })
 
})
app.post("/viewHoldingProfile", async function (req, res) {
  let custid = req.body.params;
  console.log(custid);
  await dbs.holdingsProfileGet({
    CustomerID: custid
  }).then(function (data) {
    console.log(data);
    res.send(data);
  })
})
// app.get('/getIncompleteStatus', function (req, res) {
//   console.log('Chat ID', JSON.stringify(req.query.ChatId));
//   let chatId = req.query.ChatId;
//   var hasTran = false;
//   if (jsonIncompleteTran.length > 0) {
//     var jsonArr = jsonIncompleteTran;
//     jsonArr.forEach(function (arrayItem, arrayIndex) {
//       if (jsonArr[arrayIndex].ChatSession === chatId && jsonArr[arrayIndex].IsTransactionComplete == true) {
//         // jsonArr[arrayIndex].Conversation = req.body.Conversation;
//         hasTran = true;
//       }
//     });
//     res.send(hasTran);
//   } else {
//     res.send(hasTran);
//   }
// });

// app.get('/generateId', function (req, res) {
//   const secret = 'checkmate';
//   const hash = crypto.createHmac('sha256', secret)
//     .update(Math.random().toString(26).slice(2))
//     .digest('hex');
//   res.json({
//     "hash": hash
//   });
// });

// app.get('/showChatTranscript', function (req, res) {
//   setTimeout(() => {
//     var showTranscript = [];
//     if (fs.existsSync("ChatScript.json")) {
//       var data = fs.readFileSync("ChatScript.json", "utf8");
//       var jsonArr = JSON.parse(data);
//       var size = Object.keys(jsonArr).length;
//       var beforeParse = jsonArr[size - 1].Conversation;
//       beforeParse.forEach(function (arrayItem) {
//         showTranscript.push("--------------------------------------");
//         showTranscript.push(`<div dir="ltr" style="direction: ltr; text-align: left;">Opty says : </div>` + arrayItem["Bot"])
//         showTranscript.push(`<div dir="ltr" style="direction: ltr; text-align: left;">Charlotte says : </div>` + arrayItem["User"])
//       });
//     }
//     res.json(showTranscript);
//   }, 1000);
// });

// app.post('/changeChatSess', function (req, res) {
//   var jsonArr = [];
//   //console.log(req);return false;
//   if (fs.existsSync("ChatScript.json")) {
//     var data = fs.readFileSync("ChatScript.json", "utf8");
//     console.log(data);
//     var jsonArr = JSON.parse(data);
//     var size = Object.keys(jsonArr).length;
//     jsonArr[size - 1].ChatSession = req.body.LETagSessionId;
//     writeFile(jsonArr, "ChatScript.json");
//   }
// });

// app.post('/writeFile', function (req, res) {
//   var jsonArr = [];
//   if (fs.existsSync("ChatScript.json")) {
//     var data = fs.readFileSync("ChatScript.json", "utf8");
//     jsonArr = JSON.parse(data);
//     let checkArr = false;
//     jsonArr.forEach(function (arrayItemm, arrayIndex) {
//       if (jsonArr[arrayIndex].ChatSession == req.body.ChatSession) {
//         jsonArr[arrayIndex].Conversation = req.body.Conversation;
//         jsonArr[arrayIndex].ChatLESession = req.body.ChatLESession;
//         checkArr = true;
//       }
//     });
//     if (!checkArr)
//       jsonArr.push(req.body);
//     console.log(jsonArr);
//     writeFile(jsonArr, "ChatScript.json");
//   } else {
//     jsonArr.push(req.body);
//     writeFile(jsonArr, "ChatScript.json");
//   }
// });
// app.post('/writeIncompleteTran', function (req, res) {
//   console.log('************Incompelete Tran', req.body);
//   var hasIncompleteTran = false;
//   console.log(jsonIncompleteTran);
//   var jsonArr = [];
//   if (jsonIncompleteTran.length > 0) {
//     // var data = fs.readFileSync("IncompleteTransaction.json", "utf8");
//     jsonArr = jsonIncompleteTran;    
//     var index = null;
//     var hasElement = false;
//     console.log('Before For each');
//     jsonArr.forEach(function (arrayItem, arrayIndex) {
//       if (jsonArr[arrayIndex].ChatSession === req.body.ChatSession && jsonArr[arrayIndex].IsTransactionComplete == true) {
//         console.log('A');
//         hasElement = true;
//         jsonArr[arrayIndex].IsTransactionComplete = false;
//         hasIncompleteTran = true;
//       } else if (jsonArr[arrayIndex].ChatSession === req.body.ChatSession && jsonArr[arrayIndex].IsTransactionComplete == false) {
//         console.log('B');
//         hasElement = true;
//         jsonArr[arrayIndex].IsTransactionComplete = true;
//         hasIncompleteTran = false;
//       }
//     });
//     console.log('After For each');
//     // for (index = 0; jsonArr.length > index; index++) {
//     //   if (jsonArr[index].ChatSession === req.body.ChatSession && jsonArr[index].IsTransactionComplete == 'false') {
//     //     hasElement = true;
//     //     hasIncompleteTran = false;
//     //     jsonArr[index].IsTransactionComplete = 'true';        
//     //     break;      
//     //   } else if (jsonArr[index].ChatSession === req.body.ChatSession && jsonArr[index].IsTransactionComplete == 'true') {
//     //     hasElement = true;
//     //     hasIncompleteTran = true;
//     //     jsonArr[index].IsTransactionComplete = 'false';  
//     //     break;
//     //   }    
//     // }

//     if (hasElement == false) {
//       jsonArr.push(req.body);
//     }
//     console.log('JSON ARR', jsonArr);
//     writeFile(jsonArr, "IncompleteTransaction.json");
//   } else {
//     jsonArr.push(req.body);
//     writeFile(jsonArr, "IncompleteTransaction.json");
//   }
//   res.send(hasIncompleteTran);
// });



// function writeFile(data, fileName) {
//   fs.writeFile(fileName, JSON.stringify(data), function (err) {
//     if (err) {
//       return console.log(err);
//     }

//     if (fileName == "IncompleteTransaction.json") {
//       readFile("IncompleteTransaction.json", function (hasFile, data) {
//         if (hasFile) {
//           jsonIncompleteTran = data;
//         }
//       });
//     }

//     console.log("The" + fileName + " file was saved!");
//   });
// }

// function readFile(fileName, callback) {
//   try {
//     var objData = null;
//     if (fs.existsSync(fileName)) {
//       var data = fs.readFileSync(fileName, "utf8");
//       objData = JSON.parse(data);
//       callback(true, objData)
//     } else {
//       callback(false, objData)
//     }
//   } catch (err) {
//     console.log(err);
//   }
// }


function callServiceNowApi(url, dataService, type, callback) {
  try {
    const header = {
      'Cache-Control': 'no-cache',
      Accept: 'application/json',
      'Content-Type': 'application/json'
    };
    var options = {
      url: url,
      method: type,
      header: header,
      body: dataService,
      json: true,
      auth: {
        user: "admin",
        password: "pj10GXYsUTej"
      }
    };

    requestAPI(options, function (error, response, body) {
      if (error) {
        // console.log('API ERROR', JSON.stringify(error));
        callback(error, null)
      } else {
        // console.log('headers:', JSON.stringify(response.headers));
        // console.log('status code:', JSON.stringify(response.statusCode));
        callback(null, body);
      }
    });
  } catch (err) {
    // console.log('RESPONSE ERROR', JSON.stringify(err));
  }
};
app.listen(process.env.PORT || 9000);