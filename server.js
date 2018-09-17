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

app.set('view engine', 'pug');

app.post('/webhook', line.middleware(config), (req, res) => {
    console.log(req.body.events);
    Promise
      .all(req.body.events.map(handleEvent))
      .then((result) => res.json(result));
});

app.get('/hoge', (req, res)=>{
    res.render("hoge",  { title: 'Hey', message: 'Hello there!'});
});

const client = new line.Client(config);

function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }

  return client.replyMessage(event.replyToken, {
    type: 'text',
    text: event.message.text //実際に返信の言葉を入れる箇所
  });
}

app.listen(PORT);
console.log(`Server running at ${PORT}`);
