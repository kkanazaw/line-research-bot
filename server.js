'use strict';

const express = require('express');
const line = require('@line/bot-sdk');
const PORT = process.env.PORT || 3000;
require('dotenv').config();

const config = {
    channelSecret: process.env.channelSecret,
    channelAccessToken: process.env.LINE_ACCESS_TOKEN
};

const app = express();

app.post('/webhook', line.middleware(config), (req, res) => {
    console.log(req.body.events);
    Promise
      .all(req.body.events.map(handleEvent))
      .then((result) => res.json(result));
});

app.get('/hoge', (req, res)=>{
    res.send("  HelloWorld");
});

const client = new line.Client(config);

function echo(event){
    return {
        type: 'text',
        text: event.message.text //実際に返信の言葉を入れる箇所
    }
}



function handleEvent(event) {
/*  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }*/
    var img = "http://kerokero-info.com/wp-content/uploads/2017/03/0409-1.jpg";
    var flex = {
        "type": "flex",
        "altText": "hogehoge",
        "contents": {
            "type": "bubble",
            "styles": {
                "header": {
                    "backgroundColor": "#eeeeee"
                },
                "body": {
                    "backgroundColor": "#efefef"
                },
                "footer": {
                    "backgroundColor": "#ffffff"
                }
            },
            "header": {
                "type": "box",
                "layout": "vertical",
                "contents": [
                    {
                        "type": "text",
                        "text": "鎌倉市訪問者調査にご協力ください",
                        "wrap": true
                    }
                ]
            },
            "body": {
                "type": "box",
                "layout": "horizontal",
                "contents": [
                    {
                        "type": "image",
                        "url": "https://i.gyazo.com/4efac001dc589e2235d9dff337fe8489.jpg",
                        "size": "xl",
                        "aspectMode": "cover",
                        "backgroundColor": "#DDDDDD",
                        "gravity": "center",
                        "flex": 2
                    },
                    {
                        "type": "button",
                        "style": "link",
                        "height": "sm",
                        "action": {
                            "type": "uri",
                            "label": "調査に回答する",
                            "uri": "line://app/1608223050-JBE0PK3p"
                        },
                        "flex": 6
                    }
                ]
            }
        }
    };
  console.log(flex);
  return client.replyMessage(event.replyToken, [flex] );
}

app.listen(PORT);
console.log(`Server running at ${PORT}`);
