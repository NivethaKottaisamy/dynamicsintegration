var DynamicsWebApi = require('dynamics-web-api');
var AuthenticationContext = require('adal-node').AuthenticationContext;
const requestAPI = require('request');
var moment = require('moment');
var momentTz = require('moment-timezone');
//the following settings should be taken from Azure for your application
//and stored in app settings file or in global variables
 
//OAuth Token Endpoint
var authorityUrl = 'https://login.microsoftonline.com/72a65f94-18d8-4ac4-b401-9c1c32f8a1be/oauth2/token';
//CRM Organization URL
var resource = 'https://hexama.crm5.dynamics.com/';
//Dynamics 365 Client Id when registered in Azure
var clientId = '43431254-7b9c-49ac-8e0b-4ac5be824c8b';
var username = '_crm1_applicationusers1@HexaMA.onmicrosoft.com';
var password = 'abcde@12345';
var clientSecret='JPpWrYI2ZGXnMc1BNgaMt+u/1V+dG7i7vQwnoBDCmpY=';

var adalContext = new AuthenticationContext(authorityUrl);
 
//add a callback as a parameter for your function
function acquireToken(dynamicsWebApiCallback){
    //a callback for adal-node
    function adalCallback(error, token) {
        if (!error){
            //call DynamicsWebApi callback only when a token has been retrieved
            // console.log(token)
            dynamicsWebApiCallback(token);

        }
        else{
            // console.log('Token has not been retrieved. Error: ' + error.stack);
        }
    }
 
    //call a necessary function in adal-node object to get a token
    adalContext.acquireTokenWithClientCredentials(resource, clientId,clientSecret, adalCallback);
}
//create DynamicsWebApi object
var dynamicsWebApi = new DynamicsWebApi({
    webApiUrl: 'https://hexama.api.crm5.dynamics.com/api/data/v9.0/',
    onTokenRefresh: acquireToken,
    useEntityNames: true
});
 
//call any function
dynamicsWebApi.executeUnboundFunction("WhoAmI").then(function (response) {
    // console.log('Hello Dynamics 365! My id is: ' + response.UserId);
}).catch(function(error){
    // console.log(error.message);
});

dynamicsWebApi.retrieveAll("new_productcses", ["new_externalidentifier", "new_externalidentifiertype","new_name","new_productname","new_producttype","new_risktype","new_sector","new_sectorname"]).then(function (response) {
 
    var records = response.value;
    // console.log(records);
    //do something else with a records array. Access a record: response.value[0].subject;
})
.catch(function (error){
    // console.log(error)
    //catch an error
});

// var accountId = '00000000-0000-0000-0000-000000000001';
// var leadId = '00000000-0000-0000-0000-000000000002';
// dynamicsWebApi.associate("new_productcses", "P1125", "new_name", "new_productperformances", "P1125").then(function (response) {
//     console.log(response);

//     //success
// }).catch(function (error) {
//     //catch an error
// });


var fetchXml = '<fetch mapping="logical">' +
                    '<entity name="new_productcs">' +
                        '<attribute name="new_name"/>' +
                        '<attribute name="new_productname"/>' +
                        '<link-entity name="new_productperformance" from="new_name" to="new_name" intersect="true">'+
                        '<attribute name="new_performance"/>' +
                        '<attribute name="new_previousday"/>' +
                        '<attribute name="new_daychange"/>' +
                        '<attribute name="new_currentprice"/>' +
                        '</link-entity>'+
                    '</entity>' +
               '</fetch>';
 
dynamicsWebApi.executeFetchXmlAll("new_productcses", fetchXml).then(function (response) {
    // console.log(response)
    //do something with results here; access records response.value[0].accountid
}).catch(function (error) {
//   console.log(error);
 });
























































//  var AuthenticationContext = require('adal-node').AuthenticationContext;
//  var MicrosoftGraph = require("@microsoft/microsoft-graph-client");
// var authorityHostUrl = 'https://login.microsoftonline.com/72a65f94-18d8-4ac4-b401-9c1c32f8a1be/oauth2/token';
// var tenant = 'HexaMA.onmicrosoft.com'; // AAD Tenant name.
// var authorityUrl = authorityHostUrl + '/' + tenant;
// var applicationId = '43431254-7b9c-49ac-8e0b-4ac5be824c8b'; // Application Id of app registered under AAD.
// var clientSecret = 'JPpWrYI2ZGXnMc1BNgaMt+u/1V+dG7i7vQwnoBDCmpY='; // Secret generated for app. Read this environment variable.
// var resource = 'https://graph.microsoft.com'; // URI that identifies the resource for which the token is valid.
// var dbs = require('./db');
// var context = new AuthenticationContext(authorityHostUrl);
 
// context.acquireTokenWithClientCredentials(resource, applicationId, clientSecret, async function(err, tokenResponse) {
//   if (err) {
//     console.log('well that didn\'t work: ' + err.stack);
//   } else {
//     console.log(tokenResponse);
//     var client = MicrosoftGraph.Client.init({
//         authProvider: (done) => {
//           done(null, tokenResponse.accessToken); //first parameter takes an error if you can't get an access token
//         }
//     });
//     try {
//         var dateUTC = moment().utc().format()
//         let startdate = dateUTC;
//         let enddate = moment().add(15, 'minutes').utc().format();
//         console.log(startdate);
//         console.log(enddate);
//         const result = await client
//           .api(`https://graph.microsoft.com/v1.0/me/calendarView?StartDateTime=${startdate}&EndDateTime=${enddate}`)
//           .get();
//         let data = result.value[0]["subject"];
//         let client_name='';
//         await dbs.ClientProfileGet({
//           ClientId: data
//         }).then(function (data) {
//           client_name=data[0].Name;
//         })
//         result.value[0]["client_name"]=client_name;
//         console.log(result);
//       } catch (e) {
//         console.log(e);
//       }
//   }
// });


//  var options = { method: 'POST',
//  url: 'https://login.microsoftonline.com/',
//  headers: 
//   { 'postman-token': '89b0e739-ee4e-4c89-e7bf-d76f69b395c7',
//     'cache-control': 'no-cache',
//     clientsecret: 'JPpWrYI2ZGXnMc1BNgaMt+u/1V+dG7i7vQwnoBDCmpY=',
//     client_id: '43431254-7b9c-49ac-8e0b-4ac5be824c8b',
//     resource: 'https://graph.microsoft.com',
//     grant_type: 'client_credentials' } };

// request(options, function (error, response, body) {
//  if (error) throw new Error(error);

//  console.log(body);
// });



// adalContext.acquireTokenWithClientCredentials(resource, clientId,clientSecret, adalCallback)
// function adalCallback(error, token) {
//     console.log(token);
//     if (!error){
//         //call DynamicsWebApi callback only when a token has been retrieved
//         var options = {
//             url: "https://hexama.api.crm5.dynamics.com/api/data/v9.0/",
//             method: "GET",
//             headers: { 'Authorization': 'Bearer ' + token.accessToken, 'Accept': 'application/json','OData-MaxVersion':'4.0','OData-Version':'4.0'}
//           };
//           requestAPI(options, function (error, response, body) {
//            console.log(body);
//         });
//     }
//     else{
//         console.log('Token has not been retrieved. Error: ' + error.stack);
//     }
// }


 
