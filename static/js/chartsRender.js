/**
 * 主要封装一些图标渲染
 *
 * @author: cuixiaohuan
 * Date: 16/5/20
 * Time: 上午9:47
 */

/*! jQuery v1.10.1 | (c) 2005, 2013 jQuery Foundation, Inc. | jquery.org/license
*/

//var jq = jQuery.noConflict();
//
//var chartsDataDemo = {
//    containerId: 'categery_pie_bj',
//    title: '北京分公司',
//    subTitle: '模拟数据',
//    legend: ['IT技能培训', '初等职业培训', '兴趣爱好', '学历类', '英语类', '英语类1'],
//    data: [
//        {value: 250590, name: 'IT技能培训'},
//        {value: 196370, name: '初等职业培训'},
//        {value: 182600, name: '兴趣爱好'},
//        {value: 179380, name: '学历类'},
//        {value: 130190, name: '英语类'},
//        {value: 30190, name: '英语类1'}
//    ]
//};
//<script type="text/javascript" src="{$BASE_DIR_PATH}js/jquery/jquery.min.js"></script>*}
//<script type="text/javascript" src="{$BASE_DIR_PATH}js/jquery/jquery.tooltipster.min.js"></script>*}
//<script type="text/javascript">*}
//$.noConflict();*}
//</script>*}

/**
 * 渲染饼图的封装
 *
 * @param renderData
 */
function formatmoney(s, type) {
    if (/[^0-9\.]/.test(s)) return "0";
    if (s == null || s == "") return "0";
    s = s.toString().replace(/^(\d*)$/, "$1.");
    s = (s + "00").replace(/(\d*\.\d\d)\d*/, "$1");
    s = s.replace(".", ",");
    var re = /(\d)(\d{3},)/;
    while (re.test(s))
        s = s.replace(re, "$1,$2");
    s = s.replace(/,(\d\d)$/, ".$1");
    if (type == 0) {// 不带小数位(默认是有小数位)
        var a = s.split(".");
        if (a[1] == "00") {
            s = a[0];
        }
    }
    return s;
}


/**
 * 定义全局变量曲线用于曲线拖动
 * @type {Array}
 */
var trendFlag = [];
//function fmoney(s, n)
//{
//    n = 2;
//    s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
//    var l = s.split(".")[0].split("").reverse(),
//        r = s.split(".")[1];
//    t = "";
//    for(i = 0; i < l.length; i ++ )
//    {
//        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
//    }
//    return t.split("").reverse().join("") + "." + r;
//}


var initEChartsPie = function (renderData) {
    var echarts_all_trend = echarts.init(document.getElementById(renderData.containerId));
    echarts_all_trend.showLoading({
        text: '加载中...',
        effect: 'whirling'
    });

    var echarts_all_option = {
        title: {
            text: renderData.title,
            subtext: renderData.subTitle,
            x: 'center'
        },
        tooltip: {
            trigger: 'item',
            //formatter: "{a} <br/>{b} : {d}%<br/>{c}"
            formatter: "{b} <br/>{c}<br/> {d}%"
        },
        legend: {
            show: true,
            orient: 'horizontal',
            bottom: 'bottom',
            data: renderData.legend
        },
        series: [
            {
                name: renderData.title,
                type: 'pie',
                radius: '55%',
                center: ['50%', '50%'],
                data: renderData.data,
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    },
                    normal: {
                        label: {
                            formatter: function (params) {
                                if(params.percent < 20){
                                    return params.name + "\n" + params.percent + '%';
                                }else{
                                    return params.name + "\n" + params.percent + '%';
                                }
                            }
                        }
                        //,
                        //labelLine: {
                        //    show: true
                        //}
                    }

                }
            }
        ]
    };

    echarts_all_trend.hideLoading();
    echarts_all_trend.setOption(echarts_all_option);
};

/**
 * 生成表格
 *
 * @param data
 * @param specialHeader
 */
var initCommonTable = function (data, specialHeader) {
    var appendHtml = '';
    //appendHtml += '<h3 style="text-align: center">' + data.title + '</h3>';
    appendHtml += '<div class="fixTableContainer"><table class="table table-striped">';

    // 拼接头
    var className = '';
    var appendThead = function (appendHtml, headData) {
        appendHtml += '<thead><tr>';
        for (var key in headData) {
            key == 0 ? className = 'fixCol fix-col-header' : className = 'commCol';
            /**
             * 兼容特殊行的处理，specialHeader是特殊的行标记
             */
            if (specialHeader != undefined) {
                appendHtml += '<th class="' + className + '" colspan="' + specialHeader[key] + '">' + headData[key].toUpperCase() + '</th>';
            } else {
                appendHtml += '<th class="' + className + '">' + headData[key].toUpperCase() + '</th>';
            }
        }
        appendHtml += '</tr></thead><tbody>';
        return appendHtml;
    };

    // 拼接内容
    var randomClass = 'title_' + parseInt(Math.random() * 10000);
    var appendBody = function (appendHtml, bodyData) {
        appendHtml += '<tr>';
        for (var key in bodyData) {
            key == 0 ? className = 'fixCol ' + randomClass : className = 'commCol';
            // 对于空的处理
            if (bodyData[key] === '') {
                bodyData[key] = '空';
            }


            var re = /^(([1-9][0-9]*\.[0-9][0-9]*)|([0]\.[0-9][0-9]*)|([1-9][0-9]*)|([0]{1}))$/;
            if (!re.test(bodyData[key])) {
                var title = bodyData[key].toUpperCase();
                var show = bodyData[key].toUpperCase();
                if (show.length > 6 && key == 0) {
                    show = show.substr(0, 5) + '...';
                }
                appendHtml += '<td class="' + className + '" title="' + title + '">' + show + '</td>';
            } else {
                appendHtml += '<td class="' + className + '">' + formatmoney(bodyData[key], 0) + '</td>';
            }
        }
        appendHtml += '</tr>';
        return appendHtml;
    };

    // 拼接整个表格
    for (var key in data.tableData) {
        if (key == 0) {
            appendHtml = appendThead(appendHtml, data.tableData[key]);
        } else {
            appendHtml = appendBody(appendHtml, data.tableData[key]);
        }
    }

    appendHtml += '</tbody></table></div>';

    $('#' + data.containerId).empty().append(appendHtml);

    // change width
    //var maxWidth = $('.fix-col-header').width();
    // 针对定制宽度
    if (data.width != undefined) {
        jQuery('.fixCol').css('width', data.width + 'rem');
        jQuery('.fixTableContainer').css('margin-left', (data.width - 0.2) + 'rem');
        jQuery('.' + randomClass).tooltipster({arrow: true, maxWidth: 300, position: 'top', contentAsHTML: true});
    } else {
        var maxWidth = Math.max.apply(Math, jQuery('.fixCol').map(function () {
            return $(this).width();
        }).get());

        //+1 预防像素误差
        if (maxWidth < 98) {
            maxWidth = 98;
        }
        var fixColWidth = maxWidth + 2;
        jQuery('.fixCol').css('width', fixColWidth + 'px');
        jQuery('.fixTableContainer').css('margin-left', maxWidth + 'px');
        jQuery('.' + randomClass).tooltipster({arrow: true, maxWidth: 300, position: 'top', contentAsHTML: true});
    }

};

/**
 * 生成表格
 *
 * @param data
 * @param specialHeader
 */
var initFixedTable = function (data, specialHeader) {
    var appendHtml = '';
    appendHtml += '<div class="fixLastTableContainer"><table class="table table-striped">';

    // 拼接头
    var className = '';
    var lastClassName = 'fix-last-col';
    var appendThead = function (appendHtml, headData) {
        appendHtml += '<thead><tr>';
        for (var key in headData) {
            key == 0 ? className = 'fixCol fix-col-header' : className = 'commCol';
            if ((parseInt(key) + 1) == headData.length) {
                appendHtml += '<th class="' + lastClassName + ' fix-col-header">' + headData[key].toUpperCase() + '</th>';
                continue;
            }

            /**
             * 兼容特殊行的处理，specialHeader是特殊的行标记
             */
            if (specialHeader != undefined) {
                appendHtml += '<th class="' + className + '" colspan="' + specialHeader[key] + '">' + headData[key].toUpperCase() + '</th>';
            } else {
                appendHtml += '<th class="' + className + '">' + headData[key].toUpperCase() + '</th>';
            }


        }
        appendHtml += '</tr></thead><tbody>';
        return appendHtml;
    };

    // 拼接内容
    var randomClass = 'title_' + parseInt(Math.random() * 10000);
    var appendBody = function (appendHtml, bodyData) {
        appendHtml += '<tr class="fix-col-tr">';
        for (var key in bodyData) {
            key == 0 ? className = 'fixCol ' + randomClass : className = 'commCol';

            // 对于空的处理
            if(bodyData[key]===''){
                bodyData[key]='空';
            }

            // 调整body 包括连接
            if (bodyData[key] != '整体' && bodyData[key] != '空') {
                className = className + ' fix-link';
            }

            // 最后的连接拼接
            if ((parseInt(key) + 1) == bodyData.length) {
                appendHtml += '<td class="' + lastClassName + '">' + bodyData[key] + '</td>';
                continue;
            }

            var re = /^(([1-9][0-9]*\.[0-9][0-9]*)|([0]\.[0-9][0-9]*)|([1-9][0-9]*)|([0]{1}))$/;
            if (!re.test(bodyData[key])) {
                var title = bodyData[key].toUpperCase();
                var show = bodyData[key].toUpperCase();
                if (show.length > 6 && key == 0) {
                    show = show.substr(0, 5) + '...';
                }
                appendHtml += '<td class="' + className + '" title="' + title + '">' + show + '</td>';
            } else {
                appendHtml += '<td class="' + className + '">' + formatmoney(bodyData[key], 0) + '</td>';
            }


        }
        appendHtml += '</tr>';
        return appendHtml;
    };

    // 拼接整个表格
    for (var key in data.tableData) {
        if (key == 0) {
            appendHtml = appendThead(appendHtml, data.tableData[key]);
        } else {
            appendHtml = appendBody(appendHtml, data.tableData[key]);
        }
    }

    appendHtml += '</tbody></table></div>';

    $('#' + data.containerId).empty().append(appendHtml);

    // change fix width
    // 用户自定义了则用自定义的情况
    if (data.width != undefined) {
        jQuery('.fixCol').css('width', data.width + 'rem');
        jQuery('.fixLastTableContainer').css('margin-left', (data.width - 0.2) + 'rem');
    }else{
        var maxWidth = Math.max.apply(Math, jQuery('.fixCol').map(function () {
            return $(this).width();
        }).get());

        //+1 预防像素误差
        if (maxWidth < 88) {
            maxWidth = 88;
        }
        var fixColWidth = maxWidth + 2;
        jQuery('.fixCol').css('width', fixColWidth + 'px');
        //jQuery('.fixTableContainer').css('padding-left', maxWidth + 'px');
        //alert(jQuery('.fixTableContainer').css('display'));
        jQuery('.fixTableContainer').css('margin-left', maxWidth + 'px');
    }

    // 获取最大值为了预防 为展现为0的情况
    var maxHeight = Math.max.apply(Math, jQuery('.fixCol').map(function () {
        return $(this).height();
    }).get());

    var lineHeight = parseInt(maxHeight);
    // 30 = 14 标签 + 16 padding
    var paddingTop = parseInt((parseInt(maxHeight) - 30 - 2) / 2);
    //jQuery('.fix-last-col').css('height', lineHeight + 'px');
    //jQuery('.fix-last-col a').css('padding-top', paddingTop + 'px');
    jQuery('.' + randomClass).tooltipster({arrow: true, maxWidth: 300, position: 'top', contentAsHTML: true});

    // 扩展跳转范围
    //jQuery('.fix-last-col').on('click',function(){
    //    var href = jQuery(this).find('a').attr('href');
    //    if (href != '' && href != 'undefined' && href != undefined) {
    //        window.location.href = href;
    //    }
    //});

    jQuery('.fix-col-tr').on('click',function(){
        var href = jQuery(this).find('a').attr('href');
        if (href != '' && href != 'undefined' && href != undefined) {
            window.location.href = href;
        }
    }).css('cursor','pointer');
};


/**
 * 渲染highstocks的趋势图
 *
 * hStock 和hCharts的的本质区别在于数据组装方式
 * @param data
 */
var initHighStocksTrend = function(data) {
    Highcharts.setOptions({
        global: {useUTC: false},
        lang:{
            rangeSelectorZoom:'时间区间',
            resetZoom:'重置'
        }
    });

    jQuery('#'+data.containerId).highcharts('StockChart', {
        chart: {
            type: 'spline',
        },
        title: {
            text: data.title
        },
        xAxis: {
            type: 'datetime',
            dateTimeLabelFormats: {
                month: '%m-%d',
                week: '%m-%d',
                day: '%m-%d',
                year: '%Y'
            },
            events: {
                afterSetExtremes: function (e) {
                    var max = this.userMax;
                    var min = this.userMin;
                    for(var i in trendFlag){
                        var className = 'detail_table' + trendFlag[i];
                        if (trendFlag[i] >= min && trendFlag[i] <= max) {
                            jQuery('.'+className).show();
                        }else{
                            jQuery('.'+className).hide();
                        }
                    }
                }
            }

        },
        yAxis: {
            title: {text: ''},
            //type : 'logarithmic',
            minorTickInterval: 0,
            min: 0,
            gridLineWidth: 1,
            minorGridLineWidth: 0,

        },
        legend: {
            enabled: true,
            layout: 'vertical',
            align: 'left',
            verticalAlign: 'top',
            x: 10,
            y: 75,
            floating: true,
            borderWidth: 1,
            backgroundColor: '#FFFFFF'

        },
        exporting: {
            enable: false

        },
        rangeSelector: {
            enabled: true,
            selected: 0,
            inputEnabled: false
        },
        //plotOptions: {
        //    series: {
        //        compare: 'percent'
        //    }
        //},
        tooltip: {
            //pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
            //                                  valueDecimals: 2
            followPointer: false,  // this is already the default, it's just to stress what's said in commit comments and make code "speak"
            followTouchMove: false,
            formatter: function () {
                var s = Highcharts.dateFormat('%Y-%m-%d', this.x) + "<br/>";

                jQuery.each(this.points, function () {
                    //s += '<span style="color:' + this.series.color + '">' + this.series.name + '</span><b>:' + Highcharts.numberFormat(this.y,0,',') +' (' + Highcharts.numberFormat(this.point.change)+'%)</b><br />';
                    s += '<span style="color:' + this.series.color + '">' + this.series.name + '</span><b>:' + Highcharts.numberFormat(this.y, 0, '.', ',') + '</b><br />';
                });
                return s;
            }
        },
        scrollbar: {
            enabled: false
        },
        navigator: {
            enabled: data.needNav
        },

        series: data.seriesData
    });

};

/**
 * 转换echarts data 为highcharts data需要的格式类型
 *
 * 主要转换为highcharts 自带的时间轴的方式，利用自动时间伸缩
 *
 * @param eChartsData
 * @returns {Array}
 */
var trendTimeDataEChart2HighChart = function(eChartsData){
    var highChartsSeries = [];
    for (var i in eChartsData.data) {
        var subLegend = eChartsData.legend[i];
        var seriesData = [];
        for (var j in eChartsData.data[i]) {
            var timestamp = new Date(eChartsData.x[j]).getTime();
            var detailData = [parseInt(timestamp), parseInt(eChartsData.data[i][j])];
            seriesData.push(detailData);
        }
        var detailSubSeries = {
            name: subLegend,
            data: seriesData,
            //color: '#5bc0de',
            marker: {
                enabled: false
            }
        };

        highChartsSeries.push(detailSubSeries);
    }

    return highChartsSeries;
};


var initWaveTrend = function(data) {
    Highcharts.setOptions({
        global: {useUTC: false},
        lang: {
            rangeSelectorZoom:'时间区间',
            resetZoom: '重置'
        }
    });

    jQuery('#'+data.containerId).highcharts('StockChart', {
        chart: {
            type: 'spline',
        },
        title: {
            text: data.title
        },
        xAxis: {
            type: 'datetime',
            dateTimeLabelFormats: {
                month: '%m-%d',
                week: '%m-%d',
                day: '%m-%d',
                year: '%Y'
            },
            events: {
                afterSetExtremes: function (e) {
                    var max = this.userMax;
                    var min = this.userMin;
                    for (var i in trendFlag) {
                        var className = 'detail_table' + trendFlag[i];
                        if (trendFlag[i] >= min && trendFlag[i] <= max) {
                            jQuery('.' + className).show();
                        } else {
                            jQuery('.' + className).hide();
                        }
                    }
                }
            }

        },
        yAxis: {
            title: {},
            //type : 'logarithmic',
            minorTickInterval: 0,
            gridLineWidth: 1,
            minorGridLineWidth: 0
        },
        legend: {
            enabled: true,
            layout: 'vertical',
            align: 'left',
            verticalAlign: 'top',
            x: 10,
            y: 75,
            floating: true,
            borderWidth: 1,
            backgroundColor: '#FFFFFF'

            ////enable: false,
        },
        exporting: { enable: false},

        //exporting: {
        //    enable: false
        //},
        rangeSelector: {
            enabled: true,
            selected: 0,
            inputEnabled: false
        },
        tooltip: {
            followPointer: false,  // this is already the default, it's just to stress what's said in commit comments and make code "speak"
            followTouchMove: false,
            formatter: function () {
                var s = Highcharts.dateFormat('%Y-%m-%d', this.x) + "<br/>";

                jQuery.each(this.points, function () {
                    s += '<span style="color:' + this.series.color + '">' + this.series.name + '</span><b>:' + Highcharts.numberFormat(this.y, 0, '.', ',') + ' 元</b><br />';
                });
                return s;
            }
        },
        scrollbar: {
            enabled: false
        },
        navigator: {
            enabled: true
        },

        series: [
            {
                name: data.name,
                data: getAvgData(data.detailData, 1, 1),
                tooltip: {
                    valueDecimals: 2
                }
            }
            ,
            {
                name: '七日均值',
                data: getAvgData(data.detailData, 7, 1),
                tooltip: {
                    valueDecimals: 2
                }
            }
        ]
    });
};


/**
 * 获取series 的decimal均值，
 * style：1-》replace 替代  2-》expend 扩展一个
 * @param seriesData
 * @param avgDecimal
 * @param style
 * @returns {Array}
 */
var getAvgData = function (seriesData, avgDecimal, style){
    var newSeries = [];
    for(var i in seriesData){
        var decimal = (i > (avgDecimal - 1) ? avgDecimal : (parseInt(i) + 1));
        var sum = 0;
        for (var j = 0; j < decimal; j++) {
            sum += parseInt(seriesData[i - j][1]);
        }

        // 拼凑回调数据样式
        if (style === 1) {
            var series = [seriesData[i][0], parseInt((sum / decimal).toFixed(0))];
        } else if (style === 2) {
            var series = [seriesData[i][0], seriesData[i][1], parseInt((sum / decimal).toFixed(0))];
        }

        newSeries.push(series);
    }
    return newSeries;
};

var initCommonTrend = function (data) {
    var seriesData = [];
    for(var i in data.detailData.data){
        var subSeriesName = data.detailData.legend[i];
        var subSeriesData = [];
        for (var j in data.detailData.data[i]) {
            subSeriesData.push(parseInt(data.detailData.data[i][j]));
        }
        var detailSubSeries = {
            name: subSeriesName,
            data: subSeriesData
        };

        seriesData.push(detailSubSeries);
    }

    jQuery('#' + data.containerId).highcharts({
        title: {
            text: data.title
        },
        xAxis: {
            categories: data.detailData.x
        },
        yAxis: {
            title: {
                text: ''
            },
            minorTickInterval: 0,
            min: 0,
            gridLineWidth: 1,
            minorGridLineWidth: 0
        },
        tooltip: {
            shared:true,
            formatter: function () {
                var s = this.x + "<br/>";

                jQuery.each(this.points, function () {
                    //s += '<span style="color:' + this.series.color + '">' + this.series.name + '</span><b>:' + Highcharts.numberFormat(this.y,0,',') +' (' + Highcharts.numberFormat(this.point.change)+'%)</b><br />';
                    s += '<span style="color:' + this.series.color + '">' + this.series.name + '</span><b>:' + Highcharts.numberFormat(this.y, 0, '.', ',') + '</b><br/>';
                });
                return s;
            }
            //pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.}</b><br/>',
        },
        legend: {},
        series: seriesData
    });

};


/**
 * 传入数据 趋势图数据，
 *
 * 传出数据 表格数据
 * @param data
 */
var getDetailTableData = function (data) {
    var header = [];
    header.push('时间');
    for(var key in data.legend){
        header.push(data.legend[key]);
    }

    var body = [];
    for(var key in data.x){
        var line = []
        line.push(data.x[key]);
        for(var legendKey in data.legend){
            line.push(data.data[legendKey][key]);
        }
        body.push(line);
    }

    var newData = {
        header:header,
        body:body
    };

    return newData
};


/**
 * 绘制stock图形展示数据需要的表格
 */
var initDetailTable = function (data) {
    trendFlag =[];
    var appendHtml = '';
    appendHtml += '<div class=""><table class="table table-striped">';


    var tableData = getDetailTableData(data.data);
    // 拼接头
    var className = '';
    var appendThead = function (appendHtml, headData) {
        appendHtml += '<thead><tr>';
        for (var key in headData) {
            key == 0 ? className = '1' : className = '1';
            appendHtml += '<th class="' + className + '">' + headData[key] + '</th>';
        }
        appendHtml += '</tr></thead><tbody>';
        return appendHtml;
    };

    // 拼接内容
    var appendBody = function (appendHtml, oldBodyData) {
        var oldBodyDataTemp = oldBodyData;
        var bodyData = oldBodyDataTemp.reverse();
        for(var i in bodyData ){
            var classNameFlag = new Date(bodyData[i][0]).getTime();
            trendFlag.push(classNameFlag);
            className = 'detail_table' + classNameFlag;
            appendHtml += '<tr class="' + className + '">';
            for (var key in bodyData[i]) {
                if (bodyData[i][key] === '') {
                    bodyData[i][key] = '空';
                }

                var re = /^(([1-9][0-9]*\.[0-9][0-9]*)|([0]\.[0-9][0-9]*)|([1-9][0-9]*)|([0]{1}))$/;
                if (!re.test(bodyData[i][key])) {
                    appendHtml += '<td class="" title="' + bodyData[i][key] + '">' + bodyData[i][key] + '</td>';
                } else {
                    appendHtml += '<td class="">' + formatmoney(bodyData[i][key], 0) + '</td>';
                }
            }
            appendHtml += '</tr>';
        }
        return appendHtml;
    };

    appendHtml = appendThead(appendHtml, tableData.header);
    appendHtml = appendBody(appendHtml, tableData.body);

    appendHtml += '</tbody></table></div>';

    $('#' + data.containerId).empty().append(appendHtml);

    // 默认展示一个月的
    for(var i in trendFlag){
        className = 'detail_table' + trendFlag[i];

        if (i > 30) {
            jQuery('.'+className).hide();
        }
    }
};

/**
 * 生成time -value 表格
 * @param data
 */
var initKeyValueTable = function (data) {
    trendFlag = [];
    var appendHtml = '';
    appendHtml += '<div class=""><table class="table table-striped">';


    // 拼接头
    var className = '';
    appendHtml += '<thead><tr>';
    appendHtml += '<th>时间</th><th>数据</th><th>七日均值</th>';

    var avgData = getAvgData(data.data, 7, 2);
    var tableData = avgData.reverse();
    for (var i in tableData) {
        trendFlag.push((tableData[i][0]));
        className = 'detail_table' + tableData[i][0];
        appendHtml += '<tr class="' + className + '">';
        appendHtml += '<td >' + convertTimestamp2Data(parseInt(tableData[i][0])) + '</td>';
        appendHtml += '<td >' + formatmoney(tableData[i][1], 0) + '</td>';
        appendHtml += '<td >' + formatmoney(tableData[i][2], 0) + '</td>';
        appendHtml += '</tr>';
    }

    appendHtml += '</tbody></table></div>';

    $('#' + data.containerId).empty().append(appendHtml);

    // 默认展示一个月的
    for (var i in trendFlag) {
        className = 'detail_table' + trendFlag[i];

        if (i > 30) {
            jQuery('.' + className).hide();
        }
    }
};
