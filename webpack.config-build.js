const path = require('path')
const CleanWebpackPlgin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin")
module.exports = {
  mode: 'development',
  devServer: {
    contentBase: path.resolve(__dirname, './dist') //打包完成的路径
  },
  plugins:[
  	new CleanWebpackPlgin(['dist']),//打包之前清空目录
	new HtmlWebpackPlugin({
		template:"./index.html"//打包之后的模板文件
	})
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, 'src')
        ],
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-react'],//解析jsx语法，
          plugins: ['@babel/plugin-proposal-class-properties']//解析高es6语法
        }
      },
       {
        test: /\.(png|jpg|gif)$/,
        use: [
       
          {
            loader: 'file-loader?limit=25000',
            options: {
                     name: 'img/[name].[ext]'
                }
          }
          
        ]
       },
      {
      	test:/\.css$/,
      	use:[//循序 也需要注意
     
      	{
      		loader:"file-loader",
      		options:{
      			name: "css/[name].[ext]" //按文件类型输出但是没有压缩
      		}
      	},
      	
      	]
      }
        
      	
      
    ]
  }
}