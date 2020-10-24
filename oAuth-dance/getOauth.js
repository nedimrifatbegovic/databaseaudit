#!/usr/bin/env node
const OAuth = require('oauth').OAuth;
const Step = require('step');
const colors = require('colors');
const fs=require('fs')

var jiraurllink = "http://localhost:8080"; 
var consumerkey = "dbauditkey";
var pathtoPrivateKey = "./keys/jira_privatekey.pem";
var testissueid = "RES-1"

const key = consumerkey;
const jiraurl = jiraurllink;
const issue = testissueid;
const keyfile = pathtoPrivateKey;
 
let privateKeyData = fs.readFileSync(keyfile,'utf-8');
var REQUEST_TOKEN_URL = jiraurl + '/plugins/servlet/oauth/request-token';
var ACCESS_TOKEN_URL = jiraurl +'/plugins/servlet/oauth/access-token';
var AUTHORIZE_TOKEN_URL = jiraurl + '/plugins/servlet/oauth/authorize?oauth_token=';
var OAUTH_VERSION = '1.0';
var HASH_VERSION = 'RSA-SHA1';


function getAccessToken(oa, oauth_token, oauth_token_secret, pin) {
  oa.getOAuthAccessToken(oauth_token, oauth_token_secret, pin,
    function(error, oauth_access_token, oauth_access_token_secret, results2) {
      if (error) {
        if (parseInt(error.statusCode) == 401) {
          throw new Error('The pin number you have entered is incorrect'.bold.red);
        }
      }
      console.log('Your OAuth Access Token: '.green + (oauth_access_token).bold.cyan);
      console.log('Your OAuth Token Secret: '.green + (oauth_access_token_secret).bold.cyan);
      console.log('Save these values and use them to authenticate your request.'.bold.yellow);
      oa.get( jiraurl + "/rest/api/2/issue/" + issue, 
						oauth_access_token, 
						oauth_access_token_secret, 
						"application/json",
						function(error, data, resp){
        					data = JSON.parse(data);
        					console.log(data["key"]);
                            process.exit(1);
                        }
					);
      
    });
}

/*var oa = new OAuth(REQUEST_TOKEN_URL, ACCESS_TOKEN_URL, key, secret, OAUTH_VERSION , null, HASH_VERSION); 
getRequestToken(oa);*/

function getRequestToken(oa) {
  
  oa.getOAuthRequestToken(function(error, oauth_token, oauth_token_secret, results){
    if(error) {
      throw new Error(([error.statusCode, error.data].join(': ')).bold.red);
    } else { 
      console.log('Visit:'.bold.green)
      console.log((AUTHORIZE_TOKEN_URL + oauth_token).underline.green)
      console.log('After logged in, you will be redirected to a page on localhost, copy the oauth_verifier code parameter and paste it below'.bold.green)
      console.log('Enter the verification code here:'.bold.yellow);
      var stdin = process.openStdin();
      stdin.on('data', function(chunk) {
        pin = chunk.toString().trim();
        getAccessToken(oa, oauth_token, oauth_token_secret, pin);
      });
    }
  });
}
let consumer =   new OAuth(REQUEST_TOKEN_URL,
                  ACCESS_TOKEN_URL,
                  key,
                  privateKeyData,
                  OAUTH_VERSION,
                  "http://localhost:8080/sessions/callback",
                  HASH_VERSION,
				  null,
                  "");
 getRequestToken(consumer);      