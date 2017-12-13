### 运行环境

nodejs + webpack

先安装 nodejs ，然后全局安装 webpack

    npm install webpack -g

进入到项目所在目录，执行 `npm install` 安装相关依赖


安装完毕后，执行 `npm start` 即可启动项目，默认是监听 `http://localhost:8080`，可以在 webpack.config.js 中进行修改。

### 文件结构说明

 
/app 项目代码主目录
/app/scripts JS 代码目录
/app/style CSS 样式
/app/config.json 主配置（接口名称，标题等配置）
/app/main.js JS 入口文件
/app/index.tmpl.html HTML 模板文件


### 配置

#### 配置接口

修改 `app/config.json` 中的 `domain` 和每个模块的 `url`，同时去掉 `debug: true` 这一行。







