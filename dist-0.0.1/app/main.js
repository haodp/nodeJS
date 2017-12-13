import _ from 'lodash';
import Highcharts from 'highcharts';

import ComponetFactory from './scripts/componentFactoty';
import './style/style.scss';
import config from './config.json';


var root = document.getElementById('app'),
    components = [],
    row = null;

highchartsGlobalOptions();

/**
 * 根据配置初始化各组件
 */
_.each(config.modules, (m, index) => {

    
    if (index === 0 || m.type === 'separator') {
        var separator = document.createElement('div');
        separator.className = 'row';
        root.appendChild(separator);

        row = separator;
        if (m.type === 'separator') {
            return;
        }
    }

    var el = document.createElement('div');
    el.className = 'component';

    if (m.className) {
        el.className += ' ' + m.className;
    }
    row.appendChild(el);

    m.url = config.domain + m.url;
    m.debug = config.debug;

    components.push(ComponetFactory.newComponent(m.component, el, m));
});


/**
 * 定时器，用于定时更新各组件
 */
var counter = 0,
    date = null,
    timer = setInterval(function () {

        // 每分钟刷新、

        counter++;
        if (counter === 2) {


            // 三分钟刷新
            counter = 0;
        }

        // 每天刷一次页面
        // if(())

    }, 60 * 1000);

/**
 * Highcharts 全局配置
 */
function highchartsGlobalOptions() {
    var mainColor = '#C7CCE6',
        colors = ['#e76d42',  '#f8b934', '#1a8bc4', '#4e9d8e',   '#03c087',   '#7a98f7'],
        pieColors = Highcharts.map(colors, color => {
            return {
                radialGradient: { cx: 0.5, cy: 0.3, r: 0.7 },
                stops: [
                    [0, color],
                    [1, Highcharts.Color(color).brighten(-0.3).get('rgb')] // darken
                ]
            }
        }),
        columnColors = Highcharts.map(colors, color => {
            return {
                linearGradient: { x1: 0, y1: 0, x2: 1, y2: 0 },
                stops: [
                    [0, color],
                    [0.3, 'rgba(255, 255, 255, 0.75)'],
                    [1, color]
                ]
            }
        });


    Highcharts.setOptions({
        chart: {
            backgroundColor: null,
            spacingTop: 30
        },
        title: {
            text: null
        },
        yAxis: {
            title: {
                text: null
            },
            labels: {
                style: {
                    color: mainColor
                }
            },
            gridLineWidth: 0
        },
        xAxis: {
            labels: {
                style: {
                    color: mainColor
                }
            }
        },
        legend: {
            itemStyle: {
                color: mainColor
            }
        },
        credits: {
            enabled: false
        },
        colors: colors,
        plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {
                    style: {
                        color: mainColor,
                        textOutline: 'none'
                    }
                },
                legendItemClick: function() {
                    return false;
                }
            },
            pie: {
                colors: pieColors
            },
            column: {
                colors: columnColors
                // colorByPoint: true
            }
        }
    });
}

