import Table from './table.js';
import _ from "lodash";
import utils from './utils';

/**
 * 竖直表格组件，继承自表格组件，重写了渲染函数
 */
class VerticalTable extends Table {
    
    render() {
        var table = '<table class="table table-striped"><thead><tr>';

        // 表头
        var count = 0;
        table += '<th>'+ this.userOptions.keys[this.userOptions.mainKey]+'</th>';
        _.each(this.data, d => {
            var val = d[this.userOptions.mainKey];
            if(this.userOptions.keysEnum && this.userOptions.keysEnum[this.userOptions.mainKey]) {
                val = this.userOptions.keysEnum[this.userOptions.mainKey][val];
            }
            table += '<th class="text-right">' + val + '</th>';
        });

        table += '</tr></thead><tbody>';

        // 每一行数据
        _.each(this.userOptions.keys, (value, key) => {
           
            if(key !== this.userOptions.mainKey) {
                table += '<tr><td>' + value + '</td>';
                _.each(this.data, d=> {
                   
                    table += '<td class="text-right">' + d[key] +'</td>';
                });
                table += '</tr>';
            }
            
        });
        table += '</tbody></table>';

        this.container.innerHTML = table;
    }
}

module.exports = VerticalTable;