var DynamicsWebApi = require('dynamics-web-api');
var AuthenticationContext = require('adal-node').AuthenticationContext;
//the following settings should be taken from Azure for your application
//and stored in app settings file or in global variables
 
//OAuth Token Endpoint
var authorityUrl = 'https://login.microsoftonline.com/72a65f94-18d8-4ac4-b401-9c1c32f8a1be/oauth2/token';
//CRM Organization URL
var resource = 'https://hexama.crm5.dynamics.com/';
//Dynamics 365 Client Id when registered in Azure
var clientId = '613b3531-c59c-4dc4-9de0-c6622ab39cbe';
var username = 'Integrationuser@HexaMA.onmicrosoft.com';
var password = '10Sep2018@';
 
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
    adalContext.acquireTokenWithUsernamePassword(resource, username, password, clientId, adalCallback);
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
 