import Table from './table';
import VTable from './verticalTable';
import Chart from './chart';
import PieChart from './pieChart';

/**
 * 组件工厂，统一的组件初始化入口
 */
module.exports = {
    newComponent: (type, el, options) => {
        switch(type) {
            case 'table' : return module.exports.newTable(el, options); break;
            case 'vtable': return module.exports.newVTable(el, options);break;
            case 'chart': return module.exports.newChart(el, options); break;
            case 'pieChart': return module.exports.newPieChart(el, options);break;
        }
    },

    newTable:(el, options) => {
        return new Table(el, options);
    },

    newVTable: (el, options) => {
        return new VTable(el, options);
    },

    newChart: (el, options) => {
        return new Chart(el, options);
    },

    newPieChart: (el, options) => {
        return new PieChart(el, options);
    }
}