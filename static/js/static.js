/**
 * @file ：统计页面各个请将的加载次数
 *
 * @author: cuixiaohuan
 *
 * Date: 16/11/7
 * Time: 下午4:16
 */

var times = function () {
    var timing = performance.timing;
    var loadTime = timing.loadEventEnd - timing.navigationStart;
    // 过早获取时,loadEventEnd有时会是0
    if (loadTime <= 0) {
        // 未加载完，延迟200ms后继续times方法，直到成功
        setTimeout(function () {
            times();
        }, 200);
        return;
    }

    var readyStart = timing.fetchStart - timing.navigationStart;
    var redirectTime = timing.redirectEnd - timing.redirectStart;
    var appcacheTime = timing.domainLookupStart - timing.fetchStart;
    var unloadEventTime = timing.unloadEventEnd - timing.unloadEventStart;
    var lookupDomainTime = timing.domainLookupEnd - timing.domainLookupStart;
    var connectTime = timing.connectEnd - timing.connectStart;
    var requestTime = timing.responseEnd - timing.requestStart;
    var initDomTreeTime = timing.domInteractive - timing.responseEnd;
    var domReadyTime = timing.domComplete - timing.domInteractive;
    // 过早获取时,domComplete有时会是0
    var loadEventTime = timing.loadEventEnd - timing.loadEventStart;

    // 为console.table方法准备对象，包含耗时的describe和消耗的时间
    var perfDataJson = [
        {'name': 'readyStart', 'describe': '准备新页面时间耗时', 'time': readyStart},
        {'name': 'redirectTime', 'describe': 'redirect 重定向耗时', 'time': redirectTime},
        {'name': 'appcacheTime', 'describe': 'Appcache 耗时', 'time': appcacheTime},
        {'name': 'unloadEventTime', 'describe': 'unload 前文档耗时', 'time': unloadEventTime},
        {'name': 'lookupDomainTime', 'describe': 'DNS 查询耗时', 'time': lookupDomainTime},
        {'name': 'connectTime', 'describe': 'TCP连接耗时', 'time': connectTime},
        {'name': 'requestTime', 'describe': 'request请求耗时', 'time': requestTime},
        {'name': 'initDomTreeTime', 'describe': '请求完毕至DOM加载', 'time': initDomTreeTime},
        {'name': 'domReadyTime', 'describe': '解释dom树耗时', 'time': domReadyTime},
        {'name': 'loadEventTime', 'describe': 'load事件耗时', 'time': loadEventTime},
        {'name': 'loadTime', 'describe': '从开始至load总耗时', 'time': loadTime}
    ];

    //$.ajax({
    //    data: {perfDataJson: perfDataJson, loadTime: loadTime},
    //    /* globals base_url_path */
    //    url: base_url_path + 'static/frontPerf',
    //    success: function () {
    //    }
    //});

};
window.onload = times;// onload时，触发times方法


