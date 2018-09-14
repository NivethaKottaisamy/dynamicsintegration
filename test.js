const requestAPI = require('request');
async function requestApi(){
    console.log('srini');
    const header = {
      'Cache-Control': 'no-cache',
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
    var options = {
      url: "https://hexama.api.crm5.dynamics.com/api/data/v9.0/",
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

// var DynamicsWebApi = require('dynamics-web-api');
// var AuthenticationContext = require('adal-node').AuthenticationContext;