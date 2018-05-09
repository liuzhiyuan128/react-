var http = require('http')
var url = require('url')
var querystring = require('querystring')

var port = 9000
var jsonData = { 'name': 'xiaohong', 'job': 'daboss' }
http.createServer(function (req, res) {
    // var pathStr = url.parse(req.url)
       res.writeHead(200, {
        'Content-Type': 'application/json;charset=utf-8',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': '*'
    })
    var type = req.method;
    if (type == 'GET') {
     
        res.end(JSON.stringify(jsonData))
    } else if (type == 'POST') {
        var str = '';
        req.on('data',function(chunk){
            str += chunk;
        })
       
        req.on('end',function(){
            var data = querystring.parse(str)
            console.log(data)
            if(data.name == "" || data.job == ""){
                res.end(JSON.stringify({'success':true,msg:'填写有误'}))
            }else{
                res.end(JSON.stringify({'success':false,msg:'添加成功'}))
            }

        })
    }

}).listen(port, function () {
    console.log('server is runing at port ' + port)
})