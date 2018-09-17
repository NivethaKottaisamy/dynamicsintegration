var DynamicsWebApi = require('dynamics-web-api');
var AuthenticationContext = require('adal-node').AuthenticationContext;
const requestAPI = require('request');
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
            dynamicsWebApiCallback(token);
        }
        else{
            console.log('Token has not been retrieved. Error: ' + error.stack);
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
    console.log('Hello Dynamics 365! My id is: ' + response.UserId);
}).catch(function(error){
    console.log(error.message);
});
dynamicsWebApi.retrieveAll("new_productcses", ["new_externalidentifier", "new_externalidentifiertype","new_productid","new_productname","new_producttype","new_risktype","new_sector","new_sectorname"]).then(function (response) {
 
    var records = response.value;
    console.log(records);
    //do something else with a records array. Access a record: response.value[0].subject;
})
.catch(function (error){
    console.log(error)
    //catch an error
});



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


 