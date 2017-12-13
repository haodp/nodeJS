import utils from './utils.js';

/**
 * 基础组件模板，统一了组件大的执行流程和通用的函数
 */
class Component {

    constructor(el, options) {
        this.el = typeof el === 'string' ? document.getElementById(el) : el;
        this.type = options.component;
        this.userOptions = options;
        this.data = null;
        
        this.init();
    }
    
    // 1、初始化函数
    init() {

        if(this.userOptions.keys) {
            for(var key in this.userOptions.keys) {
                if(key.startsWith('_')) {
                    delete this.userOptions.keys[key];
                }
            }
        }

        this.getData();
    }

    // 2、获取数据
    getData() {
        utils.getOrPost(this.userOptions.url, null, data => {
            // 3、处理数据
            this.mapData(data);
            // 4、渲染基础 DOM
            this.renderBasic()
            // 5、渲染函数
            this.render();
        },this.userOptions.debug);
    }

    // 处理数据
    mapData(data) {
        this.data = data;
    }   
    
    renderBasic() {
        var title = document.createElement('h3');
        title.className = "component-title"
        title.innerText = this.userOptions.title;

        this.el.appendChild(title);

        var container = document.createElement('div');
        container.className = "component-container";

        this.el.appendChild(container);

        this.container = container;
    }
    // 渲染 html
    render() {}

    // 更新
    update() {
        this.init();
    }
}

module.exports = Component;