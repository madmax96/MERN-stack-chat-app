
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const css = new ExtractTextPlugin('style.css');
const webpack = require('webpack');

module.exports= (env,args)=>{
   const isProduction = env==='production';
    return {
        entry:['babel-polyfill','./App/app.js'],
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
        plugins:[css],
        devtool: isProduction? "source-map" : "inline-source-map",
        devServer:{
            contentBase:path.join(__dirname ,'public'),
            historyApiFallback:true,
            proxy: {
                "/": {
                    target:"http://localhost:3000",
                    bypass: function(req, res, proxyOptions) {
                        if (req.headers.accept.indexOf("html") !== -1) {
                          console.log("Skipping proxy for browser request.");
                          return "/index.html";
                        }
                      }
                }
              }
        }
    }
}
