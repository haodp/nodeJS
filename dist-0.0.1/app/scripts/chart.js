import Component from './component.js';
import _ from "lodash";
import utils from './utils';
import Highcharts from 'highcharts';

/**
 * 图表组件，重写数据处理函数及渲染函数
 * 在数据处理函数中，将数据处理成图表配置
 * 在渲染函数中，执行的图表初始化函数
 */
class Chart extends Component {

    mapData(data) {
        this.data = data;

        var options = {
            xAxis: {
                categories: []
            },
            series: []
        },
        val = null;

        if (utils.isArr(this.userOptions.series)) {
            _.each(this.data, d => {
                options.xAxis.categories.push(d[this.userOptions.category]);
                _.each(this.userOptions.series, (s, index) => {
                    if (options.series.length - 1 < index) {
                        options.series.push({
                            name: s.name,
                            type: s.type,
                            data: []
                        });
                    }
                    val = d[s.key];

                    options.series[index].data.push(utils.isStr(val) ? parseFloat(val) : val);
                });
            });
        } else if (this.userOptions.seriesByKey) {
            var groupedData = _.groupBy(this.data, d => {
                return d[this.userOptions.seriesByKey.groupKey];
            });

            _.each(groupedData, (data, group) => {

                if (this.userOptions.keysEnum && this.userOptions.keysEnum[this.userOptions.seriesByKey.groupKey]) {
                    group = this.userOptions.keysEnum[this.userOptions.seriesByKey.groupKey][group];
                }

                options.series.push({
                    name: group,
                    type: this.userOptions.seriesByKey.value.type || 'column',
                    data: []
                });

                _.each(data, (d, index) => {

                    if(options.xAxis.categories.length -1 < index) {
                        options.xAxis.categories.push(d[this.userOptions.category]);   
                    }
                    val = d[this.userOptions.seriesByKey.value.key];
                    options.series[options.series.length - 1].data.push({
                        name: d[this.userOptions.category],
                        y: utils.isStr(val) ?  parseFloat(val) : val 
                    });
                });
            });

        }

        this.getOptions(options);
    }

    getOptions(options) {
       
        this.options = utils.merge(options, this.userOptions.chartOptions);

        console.log(this.userOptions.chartOptions, this.options);
    }

    render() {

        this.chart = Highcharts.chart(this.container, this.options);
    }

    update() {

    }
}

module.exports = Chart;