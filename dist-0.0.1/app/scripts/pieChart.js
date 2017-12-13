import Chart from './chart';
import _ from 'lodash';
import utils from './utils';

/**
 * 饼图组件
 */
class PieChart extends Chart {

    mapData(data) {
        this.data = data;

        var options = {
            chart: {
                type: 'pie'
            },
            xAxis: {
                categories: []
            },
            series: []
        };

        options.series.push({
            name: this.userOptions.title,
            data: []
        });

        _.each(this.data, d=> {

            var point = {},
                val = null;

            _.each(this.userOptions.dataKeys, (value, key) => {
                val = d[value];

                if(this.userOptions.keysEnum && this.userOptions.keysEnum[value]) {
                    val = this.userOptions.keysEnum[value][val] || val;
                }
                if(key === 'y' && utils.isStr(val)) {
                    val = parseFloat(val);
                }
                point[key] = val;
            });

            options.series[0].data.push(point);
        });
        this.getOptions(options);
    }    

};

module.exports = PieChart;