
npm run dev 启动项目  在css文件里 用背景图片需要注意 一直没有解决
npm run build 打包项目  我尝试着把css文件单独提取取出来 就按照打包文件思路配置css文件 
                           有一个问题就是没有压缩css文件需要单独压缩  如果想在引入css文件可以在index.html里加link引入 
                           如 link rel="stylesheet" type="text/css" href="css/index.css"
<br/>
路由的问题 用的是 BrowserRouter 用的是真正的路径跳转 如果刷新或者请求路径会出现找不到页面情况
上线的时候需要 配置服务器一下 如果找不到页面 反回index.html页面 

