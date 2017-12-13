import Component from './component.js';
import _ from "lodash";
import utils from './utils';

/**
 * 表格组件，继承自基础组件，重写了处理数据和渲染函数
 */
class TableComponents extends Component {

    mapData(data) {
        // 处理排序字段
        if(this.userOptions.sortKey) {
            if(!utils.isArr(this.userOptions.sortKey)) {
                this.userOptions.sortKey = [this.userOptions.sortKey, "asc"];
            } 
            this.data = _.orderBy(data, (d) => {
                return this.userOptions.sortKey[1] === 'desc' ? d[this.userOptions.sortKey[0]] : -d[this.userOptions.sortKey[0]];
            })
        } else {
            this.data = data;
        }
    }

    // 渲染表格
    render() {
        var table = '<table class="table table-striped"><thead><tr>';

        // 表头
        var count = 0;
        _.each(this.userOptions.keys, (value, key) => {
            table += '<th class="'+(count ? 'text-right' : 'text-center')+'">' + value + '</th>';
            count ++ ;
        });

        table += '</tr></thead><tbody>';

        // 每一行数据
        _.each(this.data, d => {
            table += '<tr>';

            count = 0;
            _.each(this.userOptions.keys, (value, key) => {
                var val = d[key];
                // 如果存在值为枚举类型，则取对应的枚举类型
                if(this.userOptions.keysEnum && this.userOptions.keysEnum[key]) {
                    val = this.userOptions.keysEnum[key][val] || val;
                } 
                table += '<td class="'+(count?'text-right': 'text-center')+'">' + val + '</td>';
                count ++;
            });
            table += '</tr>';
        });

        table += '</tbody></table>';

        this.container.innerHTML = table;
    }
}

module.exports = TableComponents;