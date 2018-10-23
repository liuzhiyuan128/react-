var http=require('http');
var querystring=require('querystring');
//发送 http Post 请求
var postData='eyJlY05hbWUiOiLkuK3lhbHph5HljY7luILph5HkuJzljLrlp5Tph5HkuJzljLrkurrmsJHmlL/lupzlhpzkuJrlhpzmnZHlt6XkvZzlip7lhazlrqQiLCJhcElkIjoiYWRtaW4iLCJzZWNyZXRLZXkiOiJKVzZ+VXRKaCIsIm1vYmlsZXMiOiIxMzk4OTQ2MjczMiIsImNvbnRlbnQiOiLkvaDlpb0gaGVsbG8gd29ybGQiLCJzaWduIjoiaXZ1MVdnMnAyIiwiYWRkU2VyaWFsIjoiIiwibWFjIjoiZjM0OWMzNDE4ZDdmNzQxZmRhZGZhYjdkYWYyODRhZGEifQ==';
var options={
   hostname:'http:// 112.35.1.155',
   port:1992,
   path:'/sms/norsubmit',
   method:'POST',
   headers:{
   	//'Content-Type':'application/x-www-form-urlencoded',
   	'Content-Type':'application/json',
   	'Content-Length':Buffer.byteLength(postData)
   }
}
var req=http.request(options, function(res) {
	console.log('Status:',res.statusCode);
	console.log('headers:',JSON.stringify(res.headers));
	res.setEncoding('utf-8');
	res.on('data',function(chun){
		console.log('body分隔线---------------------------------\r\n');
		console.info(chun);
	});
	res.on('end',function(){
		console.log('No more data in response.********');
	});
});
req.on('error',function(err){
	console.error(err);
});
req.write(postData);
