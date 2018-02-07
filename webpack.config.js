
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const css = new ExtractTextPlugin('style.css');
const webpack = require('webpack');
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// if(process.env.NODE_ENV==='test'){
// require('dotenv').config({'path':'.env.test'})
// }else 

if(process.env.NODE_ENV==='development' || process.env.NODE_ENV=='test'){
   
  const config = require('./App/config/config.json');
  const envConfig = config[process.env.NODE_ENV];

  Object.keys(envConfig).forEach((key) => {
    process.env[key] = envConfig[key];
  });

}

module.exports= (env,args)=>{
   const isProduction = env==='production';
    return {
        entry:'./App/app.js',
        output:{
            path:path.join(__dirname,'public'),
            filename:'bundle.js'
        },
        module:{
            rules:[{
                loader:'babel-loader',
                test:/\.js$/,
                exclude: /node_modules/
            },
            {
                test:/\.s?css$/,
                use:css.extract({

                    use:[
                        {
                            loader:'css-loader',
                            options:{sourceMap:true}
                        },
                        {
                            loader:'sass-loader',
                            options:{sourceMap:true}
                        },
                    ]
                })  
            }
        ]
        },
        plugins:[css,new webpack.DefinePlugin({
            'process.env.URL': JSON.stringify(process.env.URL),
            
          })],
        devtool: isProduction? "source-map" : "inline-source-map",
        devServer:{
            contentBase:path.join(__dirname ,'public'),
            historyApiFallback:true,
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        }
    }
}
