var DynamicsWebApi = require('dynamics-web-api');
var AuthenticationContext = require('adal-node').AuthenticationContext;
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
    onTokenRefresh: acquireToken
});
 
//call any function
dynamicsWebApi.executeUnboundFunction("WhoAmI").then(function (response) {
    console.log('Hello Dynamics 365! My id is: ' + response.UserId);
}).catch(function(error){
    console.log(error.message);
});
dynamicsWebApi.retrieveMultiple("Client").then(function (records) {
    //do something with retrieved records here
    console.log(records);
})
.catch(function (error) {
    console.log(error)
    //catch an error
});
// var request = {
//     collection: "Client",
//     // select: ["new_age", "new_clienttype","new_nameclient"],
//     // filter: "statecode eq 0",
//     maxPageSize: 5				//just for an example
// }
// dynamicsWebApi.retrieveAttributes("LogicalName='new_client'").then(function (response) {
 
//     console.log(response);
//     //do something else with a records array. Access a record: response.value[0].subject;
// })
// .catch(function (error){
//     console.log(error);
//     //catch an error
// });
var request = {
    collection: "Client",
    select: ["Age", "Clienttype","Name"],
    maxPageSize: 5				//just for an example
};
 
//perform a multiple records retrieve operation
dynamicsWebApi.retrieveAllRequest(request).then(function (response) {
 
    var records = response.value;
    console.log(records)
    //do something else with a records array. Access a record: response.value[0].subject;
})
.catch(function (error){
    console.log(error)
    //catch an error
});
 