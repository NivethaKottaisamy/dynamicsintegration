var request = require('request');
var Promise = require('promise');
const addSubtractDate = require("add-subtract-date");
var AuthenticationContext = require('adal-node').AuthenticationContext;
var MicrosoftGraph = require("@microsoft/microsoft-graph-client");
var oResource = 'https://graph.microsoft.com';
var oAuthorityURL = 'https://login.microsoftonline.com/hexawareonline.onmicrosoft.com';
var oClientId = 'd69fa207-b0bd-41ff-aa0f-f9178ee309d4';
var oClientSecret = 'dLqi9Z/gmrsGLhgdnmW4CDqUUhTMwBzP/c0hr5LBFmo=';
var MicrosoftGraphClient = MicrosoftGraph.Client;
var meId = "me";
var supportedVersions = ['beta', 'v1.0'];
var graphClientMap = new Map();
var sharepointToken = {
    token: ""
};

function apiGateway() {
    let apiVersion = '';
    if (sharepointToken.hasOwnProperty("token") && !sharepointToken.token) {
        return new Promise(async function (resolve, reject) {

            let context = new AuthenticationContext(oAuthorityURL);
            await context.acquireTokenWithClientCredentials(oResource, oClientId, oClientSecret,
                function (err, tokenResponse) {
                    if (err) {
                        reject(null, "Access error. Are you logged into your Hexaware account?");
                    } else {
                        sharepointToken["token"] = tokenResponse.accessToken;
                        resolve(sharepointToken["token"], null);

                    }
                });
        });
    } else {
        return sharepointToken["token"];
    }
}
apiGateway().then(async function (resp) {

    var client = MicrosoftGraph.Client.init({
        authProvider: (done) => {
            done(null, resp); //first parameter takes an error if you can't get an access token
        }
    });
    await client
        .api('/me')
        .version("v1.0")
        .get((err, res) => {
            console.log(err); // prints info about authenticated user
            console.log(res);
        });
}).catch(function (err) {
    console.log(err)
});



// var CreateMeeting = function (subjectMeeting, meetingPlace, startdate, session) {
//     return new Promise(function (resolve, reject) {
//         var r = {};
//         let rawbody = `<?xml version="1.0" encoding="UTF-8"?>
// <serv:message xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
//     <header>
//         <securityContext>
//             <webExID>NuanceWebex</webExID>
//             <password>#23_Srini</password>
//             <siteName>apidemoeu</siteName>
//         </securityContext>
//     </header>
//     <body>
//         <bodyContent xsi:type="java:com.webex.service.binding.meeting.CreateMeeting">
//             <metaData>
//                 <confName>${subjectMeeting + '-' + meetingPlace}</confName>
//             </metaData>
//             <schedule>
//                 <startDate>${startdate}</startDate>
//             </schedule>
//         </bodyContent>
//     </body>
// </serv:message>`;
//         request.post({
//             headers: { 'content-type': 'application/xml' },
//             url: 'https://apidemoeu.webex.com/WBXService/XMLService',
//             body: rawbody
//         }, function (error, response, body) {
//             try {
//                 // console.log(response);
//                 const ast = XmlReader.parseSync(body);
//                 const meeting_id = xmlQuery(ast).find('meet:meetingkey').text();
//                 const server_host = xmlQuery(ast).find('serv:host').text();
//                 const server_attd = xmlQuery(ast).find('serv:attendee').text();
//                 r.meeting_id = meeting_id;
//                 r.server_host = server_host;
//                 r.server_attd = server_attd;
//                 console.log('----------------------------------Create Meeting resonse ---------------------------')
//                 console.log(body)
//                 console.log('-------------------------------------------------------------------------------------');
//                 resolve(r);

//             }
//             catch (e) {
//                 console.log('----------------------------------Create Meeting error ---------------------------')
//                 console.log(e)
//                 console.log('----------------------------------------------------------------------------------');
//                 reject(e);

//             }

//         });
//     });
// }

function getTimezoneString(session) {

    var diff = getTimezoneCorrection(session, true) * 60;


    if (diff < 0) {
        diff -= getTimezoneCorrection(session, false);
    } else {
        diff += getTimezoneCorrection(session, false);
    }
    console.log("DIFF: " + diff);
    /*
    var d = new Date();
    d.setMinutes(d.getMinutes() + 330);
    console.log(d);
 
    console.log("TZ > "+ String(String(d).split("(")[1]).split(")")[0])
    console.log(d.getTimezoneOffset());
    console.log("GUESS >>> "+ moment.tz.guess()); 
    console.log("M: "+ moment(session.message.localTimestamp).format("Z"))*/

    diff = "" + diff;

    let tzMap = {
        "-720": "Dateline Standard Time",
        "-660": "Samoa Standard Time",
        "-600": "Hawaiian Standard Time",
        "-540": "Alaskan Standard Time",
        "-480": "Pacific Standard Time",
        "-420": "Mountain Standard Time",
        "-360": "Central Standard Time",
        "-300": "Eastern Standard Time",
        "-240": "Atlantic Standard Time",
        "-210": "Newfoundland and Labrador Standard Time",
        "-180": "E. South America Standard Time",
        "-120": "Mid-Atlantic Standard Time",
        "-60": "Azores Standard Time",
        "0": "GMT Standard Time",
        "60": "Central Europe Standard Time",
        "120": "E. Europe Standard Time",
        "180": "Russian Standard Time",
        "210": "Iran Standard Time",
        "240": "Arabian Standard Time",
        "270": "Transitional Islamic State of Afghanistan Standard Time",
        "300": "West Asia Standard Time",
        "330": "India Standard Time",
        "345": "Nepal Standard Time",
        "360": "Central Asia Standard Time",
        "420": "S.E. Asia Standard Time",
        "480": "China Standard Time",
        "540": "Korea Standard Time",
        "570": "A.U.S. Central Standard Time",
        "600": "A.U.S. Eastern Standard Time",
        "660": "Central Pacific Standard Timea",
        "720": "New Zealand Standard Time"
    }

    if (diff in tzMap) {
        console.log("TZ: " + tzMap[diff]);
        return tzMap[diff];
    } else {
        console.log("TZ: " + tzMap["0"]);
        return tzMap["0"];
    }

}

function getTimezoneCorrection(session, returnHours) {

    var hoursDiff = 0;
    var minutesDiff = 0;

    var offset = 1;

    if (session.message && session.message.localTimestamp) {

        var extraTime = session.message.localTimestamp.split("T")[1];

        if (extraTime.indexOf('+') > -1) {
            extraTime = extraTime.split("+")[1];
        } else {
            extraTime = extraTime.split("-")[1];
            offset = -1;
        }

        extraTime = extraTime.split(":");

        hoursDiff = parseInt(extraTime[0]) * offset;
        minutesDiff = parseInt(extraTime[1]);

    } else {
        session.send("local timestamp not present in session")
    }


    if (returnHours) {
        return hoursDiff;
    } else {
        return minutesDiff
    }
}

function utcToLocalTimeZone(meetingStartTime, meetingEndTime, session) {

    let meetingTimeArray = [];

    var d = new Date(meetingStartTime);
    d = addSubtractDate.add(d, getTimezoneCorrection(session, true), "hours");
    let meetingStartNewTime = addSubtractDate.add(d, getTimezoneCorrection(session, false), "minutes");

    d = new Date(meetingEndTime);
    d = addSubtractDate.add(d, getTimezoneCorrection(session, true), "hours");
    let meetingEndNewTime = addSubtractDate.add(d, getTimezoneCorrection(session, false), "minutes");
    meetingTimeArray.push(meetingStartNewTime);
    meetingTimeArray.push(meetingEndNewTime);

    return meetingTimeArray;
}

function correctTimeZone(meetingStartTime, meetingEndTime, session) {

    let meetingTimeArray = [];

    var d = new Date(meetingStartTime);
    console.log(d);
    d = addSubtractDate.subtract(d, getTimezoneCorrection(session, true), "hours");
    let meetingStartNewTime = addSubtractDate.subtract(d, getTimezoneCorrection(session, false), "minutes");
    console.log(meetingStartNewTime);
    d = new Date(meetingEndTime);
    d = addSubtractDate.subtract(d, getTimezoneCorrection(session, true), "hours");
    let meetingEndNewTime = addSubtractDate.subtract(d, getTimezoneCorrection(session, false), "minutes");
    console.log(meetingEndNewTime);
    meetingTimeArray.push(meetingStartNewTime);
    meetingTimeArray.push(meetingEndNewTime);

    return meetingTimeArray;
}
// module.exports.searchMeeting = searchMeeting;

