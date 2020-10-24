const request= require('request');
const fs=require('fs')
let privateKeyData = fs.readFileSync('./keys/jira_privatekey.pem','utf-8');
const oauth =
        { consumer_key: 'dbauditkey' //Your consumer key
        , consumer_secret: privateKeyData //This will contain the private key.
        , token: 'eBxh3fiuLRWgQuFSt9NI4ymwCB9hISym' //Enter your OAuth access token here
        , token_secret: 'd3j911c1DzUNzdMhc3B4Oa0wvO3rHYRQ'//Enter your OAuth token secret here
        , signature_method : 'RSA-SHA1'
        };

request.get({url:'http://localhost:8080/rest/api/latest/issue/RES-2', oauth:oauth, qs:null, json:true}, function (e, r, user) {
      console.log(user.fields)
    });