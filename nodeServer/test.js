var request = require("request");
request('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx6f11bca4f1b27db4&secret=8aeceb8d827dc487fb56deb80cf36139', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body) // Show the HTML for the baidu homepage.
  }
})