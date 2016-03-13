var token = "--";
var apikey = "--";

var bot_name = "hogekun";
var bot_icon = "https://github.com/hogedriven/hogedriven.github.com/blob/master/logo/02.png?raw=true";

function doPost(e) {
  var app = SlackApp.create(token);
  
  if( e.parameter.user_name == "slackbot" ) {
    return null;
  }
  zatsudanBot(app, e);
}

var dialogueUrl = 'https://api.apigw.smt.docomo.ne.jp/dialogue/v1/dialogue?APIKEY='+apikey;
function zatsudanBot(app, e) {
  var message = getMessage(e.parameter.text);
  var responseMessage = "";
  
  if (message == "みうみう") {
    responseMessage = "なんできたん";
  } else if (message == "こざけさん") {
    responseMessage = "🍻";
  } else {
    responseMessage = getDialogueMessage(e.parameter.user_name, message);
  }
    
  var response = app.chatPostMessage(e.parameter.channel_id, responseMessage, {
    username: bot_name,
    icon_url: bot_icon
  });
  return true;
}
 
function getMessage(mes) {
  return mes.replace("@"+bot_name, '').trim();
}
 
function getDialogueMessage(userId, mes) {
  var contextId = 'context' + userId;
  var dialogue_options = {
    'utt': mes,
    'nickname': userId
  }
  var props = PropertiesService.getScriptProperties();
  var context = props.getProperty(contextId);
  if (context) {
    dialogue_options.context = context
  }
 
  var options = {
    'method': 'POST',
    'contentType': 'text/json',
    'payload': JSON.stringify(dialogue_options)
  };
  var response = UrlFetchApp.fetch(dialogueUrl, options);
  var content = JSON.parse(response.getContentText());
  props.setProperty(contextId, content.context);
  return content.utt;
}

function init() {
  var e = {
    parameter: {
      text: "@"+bot_name+" こんにちは",
      user_name: "hogekun",
      channel_id: "C0QHCEU8P"
    }
  };
  doPost(e);
}
