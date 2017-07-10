React实现的移动端区域选择工具。
## 安装
`npm install rareas`
## 使用
通过React组件的方式使用：
```JavaScript
import React from 'react'
import {render} from 'react-dom'
import RAreas from 'RAreas' //引入RAreas组件 const RAreas = require('RAreas')
render(<RAreas onCancel={this.cancelHandle} onCommit={this.commitHandle}/>) //使用
```
组件默认提供中国的省市区选项。也可以自行传入区域定义的区域参数。
## 组件接口
接口 | 类型 | 说明
----- | ---- | ---
list | array | 区域定义列表。列表的结构为：<br>`[{name:'',id:'',child:[{id:'',name:'',child:[{id:'',name:''}]}]}]`。<br>目前只支持三级结构。**如果不指定的话默认会使用内置的中国省市区列表。**
onCancel | function | 当取消按钮被点击时触发的回调。`(event)=>{}`
onCommit | function | 当确定按钮被点击时触发的回调。`(data,event)=>{}`。<br>`data`参数表示当前所选的地域。其结构为：`{province: {id: name:}city: {id: name:}area: {id: name:}}`。对应传入的数据。
## 打包说明
组件使用es6和scss开发，所以需要引入babel和node-sass打包。相关包已经通过*package.json*的`dependencies`参数引入。只要对webpack进行以下配置即可。
```JavaScript
module: {
        rules: [{
            test: /\.js(x)$/,
            use: [{
                loader: 'babel-loader',
                options: { presets: ['es2015', 'react'] } //处理es6和react
            }],
            exclude: /node_modules/
        }, {
            test: /\.scss$/, //处理scss或sass样式。
            use: [
                'style-loader',
                'css-loader',
                {//postcss用于为样式自动添加浏览器头(例如：-webkit)，如无需要，可以移除
                    loader:'postcss-loader',
                    options: {
                        plugins: function() {
                            return [
                                require('autoprefixer')()
                            ];
                        }
                    }
                },
                'sass-loader' //sass加载器
            ]
        }
        //your rules
        ]
    }
```
如果nodejs的版本过低(7.2以下）安装最新的sass会报错，请单独使用cnpm安装node-sass：
```bash
$ npm rm node-sass
$ cnpm install node-sass
```

