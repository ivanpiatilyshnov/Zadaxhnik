const { Telegraf } = require('telegraf');
const request = require('request');

var options = {
  'method': 'POST',
  'url': 'https://api.tracker.yandex.net//v2/issues/_search?expand=transitions',
  'headers': {
    'X-Cloud-Org-ID': 'bpf8ib0oe7ujlc80vp6i',
    'Content-Type': 'application/json',
    'Authorization': 'Bearer y0_AgAAAAAYsUb9AAvl5gAAAAEGlT19AADfBeXs_QVATL9KepRiV8EdokMZXg'
  },
  body: JSON.stringify({
    "filter": {
      "status": "needInfo"
    }
  })
};
const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start((ctx) => ctx.reply(`Hello. \nMy name Serverless Echo Telegram Bot \nI'm working on Cloud Function in the Yandex Cloud.`))
bot.help((ctx) => ctx.reply(`I can echo messages and nothing more.`))
bot.on('text', (ctx) => {
  request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response.body);
    ctx.reply(`response`);
  });
})

module.exports.handler = async function (event, context) {
    const message = JSON.parse(event['messages'][0]['details']['message']['body']);
    await bot.handleUpdate(message);
    return {
        statusCode: 500,
        body: event.string,
    };
};
