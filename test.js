const requestAPI = require('request');
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