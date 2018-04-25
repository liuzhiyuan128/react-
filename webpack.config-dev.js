const path = require('path')
module.exports = {
  mode: 'development',
  devServer: {
    contentBase: path.resolve(__dirname, './') //虚拟服务路径
  },
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
      		loader:"style-loader"//插入样式 
      	},
      	{
      		loader:"css-loader"//解析样式
      	}
      	]
      }
        
      	
      
    ]
  }
}