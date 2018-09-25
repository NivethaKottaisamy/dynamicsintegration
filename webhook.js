var express = require('express'),
  app = express(),
  http = require('http'),
  httpServer = http.Server(app),
  session = require('express-session');
const crypto = require('crypto');
var router = express.Router();
var moment = require('moment');
var momentTz = require('moment-timezone');
var dbs = require('./db');
var dynamics=require('./dynamics');
var MicrosoftGraph = require("@microsoft/microsoft-graph-client");
var authHelper = require('./helper');

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

app.use(bodyParser.urlencoded({ 
  extended: true
}));


var jsonIncompleteTran = [];


app.get('/', function (req, res) {
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
app.post("/ClientNames",async function(req,res){
  let custid=req.body.clientid;
  try{
  await dynamics.getClientnames(custid).then(function(response){
    console.log(response)
    if(response.hasOwnProperty("value") && response.value.length>0){
      res.send(response)
    }
    else{
      res.send("No Client Details found");
    }
    })
    }
    catch(e)
    {
      res.send(e);
    }
})
app.post('/Appointments',async function(req,res){
  var dateUTC = moment().utc().format()
  let startdate = dateUTC;
  let enddate = moment().add(15, 'minutes').utc().format();

  await dynamics.getAppointment(startdate,enddate).then(function(response){
  if(response.hasOwnProperty("value") && response.value.length>0){
    res.send(response)
  }
  else{
    res.send("No meeting Details found");
  }
  }).catch()
  {
    res.send("Error Occured");
  }
 
})
app.post('/ExitFund',async function(req,res){
  let custid=req.body.custid;
  let productame=req.body.productname;
  if(custid && productame)
  {
  await dynamics.ExitFund(custid,productame).then(function(response){
  if(response.hasOwnProperty("value") && response.value.length>0)
  {
  res.send(response);
  }
  else{
    res.send("Sorry No Fund Details Available");
  }
  }).catch(e)
  {
    res.send(e);
  }
  }
  else{
    res.send("Please input proper Fund name");
  }
})
app.post('/sendEmail', async function (req, res) {
  console.log("Send email..............",JSON.stringify(req.body));
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
      console.log("response",resp);
      console.log("error",err);
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
    let data = result.value[0]["subject"];
    let client_name='';
    await dbs.ClientProfileGet({
      ClientId: data
    }).then(function (data) {
      client_name=data[0].Name;
    })
    result.value[0]["client_name"]=client_name;
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
app.get('/Admin/News', function (req, res) {
  res.sendfile(__dirname + '/Admin/news.html');
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
    res.sendfile(__dirname + '/chatwindow1.html');

});
app.get('/roaming', function (req, res) {
    res.sendfile(__dirname + '/roaming.html');
});
app.get('/chat', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});
app.post("/holdingcustomer",async function(req,res){
  let custid = req.body.params;
  await dbs.holdingsProductGet(custid).then(function (data) {
    res.send(data);
  })
})
app.post("/lowperforming",async function(req,res){
  let custid = req.body.params;
  await dbs.getLowPerformingFund(custid).then(function (data) {
    res.send(data);
  })
})
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
  await dbs.transactionsProductGet(custid).then(function (data) {
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
        callback(error, null)
      } else {
        callback(null, body);
      }
    });
  } catch (err) {
  }
};
app.listen(process.env.PORT || 9000);
