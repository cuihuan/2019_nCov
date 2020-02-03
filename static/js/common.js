/*全局需要的js事件*/

//获取本地时间的全局函数
var get_local_Date = function (oldest_day) {
    var res = [];
    var tempDate = new Date();
    tempDate.setDate(tempDate.getDate() - 1);
    res['before_1_date'] = tempDate.toLocaleDateString();
    res['before_1_date'] = res['before_1_date'].replace(/\//g, '-');

    var tempDate = new Date();
    tempDate.setDate(tempDate.getDate() - 2);
    res['before_2_date'] = tempDate.toLocaleDateString();

    if (oldest_day > res['before_2_date']) {
        res['before_2_date'] = oldest_day;
    }
    res['before_2_date'] = res['before_2_date'].replace(/\//g, '-');

    var tempDate = new Date();
    tempDate.setDate(tempDate.getDate() - 14);
    res['before_14_date'] = tempDate.toLocaleDateString();
    if (oldest_day > res['before_14_date']) {
        res['before_14_date'] = oldest_day;
    }
    res['before_14_date'] = res['before_14_date'].replace(/\//g, '-');

    var tempDate = new Date();
    tempDate.setDate(tempDate.getDate() - 30);
    res['before_30_date'] = tempDate.toLocaleDateString();
    if (oldest_day > res['before_30_date']) {
        res['before_30_date'] = oldest_day;
    }
    res['before_30_date'] = res['before_30_date'].replace(/\//g, '-');

    var tempDate = new Date();
    tempDate.setDate(tempDate.getDate() - 60);
    res['before_60_date'] = tempDate.toLocaleDateString();
    if (oldest_day > res['before_60_date']) {
        res['before_60_date'] = oldest_day;
    }
    res['before_60_date'] = res['before_60_date'].replace(/\//g, '-');

    var tempDate = new Date();
    tempDate.setDate(tempDate.getDate() - 30);
    res['before_90_date'] = tempDate.toLocaleDateString();

    var tempDate = new Date();
    tempDate.setDate(tempDate.getDate() - 30);
    res['before_30_date'] = tempDate.toLocaleDateString();

    if (oldest_day > res['before_90_date']) {
        res['before_90_date'] = oldest_day;
    }
    res['before_90_date'] = res['before_90_date'].replace(/\//g, '-');

    var tempDate = new Date();
    tempDate.setDate(tempDate.getDate() - 7);
    res['before_7_date'] = tempDate.toLocaleDateString();
    if (oldest_day > res['before_7_date']) {
        res['before_7_date'] = oldest_day;
    }
    res['before_7_date'] = res['before_7_date'].replace(/\//g, '-');

    res['now_date'] = new Date().toLocaleDateString();
    res['now_date'] = res['now_date'].replace(/\//g, '-');
    return res;
};


//将数字按照三位数字进行切割
var get_format_nu = function (s) {
//    s = s.toString().split('').reverse().join('').replace(/(\d{3})/g, '$1,').split('').reverse().join('');
    //改进，小数不用进行切割
    s = s.toString().split('.')[0]
        .split('').reverse().join('')
        .replace(/(\d{3})/g, '$1,').split('')
        .reverse().join('') + (s.toString().split('.')[1] === undefined
        ? '' : ('.' + s.toString().split('.')[1]));
    if (s.indexOf(',') === 0) {
        s = s.substr(1);
    }
    return s
};

//设置cookie
/**
 * 修改编码方式，由escape 改为encodeURI
 *
 * 原因，windows和mac下对escape编码中文后，解码不一样，win下报错，采用兼容性较好的uriencode进行处理
 *
 * @author :cuihuan@baidu.com
 * @param name
 * @param value
 * @param expDay
 * @param path
 */
function setCookie(name, value, expDay, path) {
    var exp = new Date();
    exp.setTime(exp.getTime() + expDay * 24 * 60 * 60 * 1000);
    document.cookie = name + '=' + encodeURI(value) + ';expires=' + exp.toGMTString() + ';path=' + path;
}

function getCookie(name) {
    var arr;
    var reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
    if (arr = document.cookie.match(reg))
        return decodeURI(arr[2]);
    else
        return null;
}

function getCookieStr(cookiestr, name) {
    var arr;
    var reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
    if (arr = cookiestr.match(reg))
        return decodeURI(arr[2]);
    else
        return null;
}

//删除cookies
function delCookie(name) {
    setCookie(name, '', -1, '/');
}


/**
 * 数字的格式化
 *
 * @param number {string/num}： 需要格式化的数字
 * @param decimal {num}： 格式化的位数
 * @author：cuihuan
 */
var getFormatNu = function (number, decimal) {
    decimal = decimal >= 0 && decimal <= 20 ? decimal : 2;
    number = parseFloat((number + '').replace(/[^\d\.-]/g, '')).toFixed(decimal) + '';
    // 小数部分
    var dec = '';
    if (decimal !== 0) {
        dec = '.' + number.split('.')[1];
    }

    // 整数部分
    var integer = number.split('.')[0].split('').reverse();
    var resInt = '';
    for (var i = 0; i < integer.length; i++) {
        resInt += integer[i] + ((i + 1) % 3 === 0 && (i + 1) !== integer.length ? ',' : '');
    }
    return resInt.split('').reverse().join('') + dec;
};

/**
 * 获取页面tab 的标志
 * @returns {string}
 */
var getNavFlag = function() {
    var url = window.location.href;
    var pregUrl = url.match(/\/site\/\w+/g);
    if(!!pregUrl ){
        return 'nav' + pregUrl[0].substr(6);
    }else{
        return '';
    }

};

/**
 * 获取当前时间
 *
 * @returns {string}
 */
function getTime() {
    var now = new Date(),
        h = now.getHours(),
        m = now.getMinutes(),
        s = now.getSeconds(),
        ms = now.getMilliseconds();
    return (h + ':' + m + ':' + s + ' ' + ms);
}


/**
 * 加密文本
 *
 * @param  {string} inputText 输入
 * @param {string} count 最后几位加密
 *
 * @return {string} 返回处理
 */
var maskText = function (inputText, count) {
    inputText = inputText.toString();
    count = isNaN(count) ? 0 : parseInt(count, 10);
    var length = inputText.length;
    if (count >= length) {
        count = length - 1;
    }

    var secretCode = inputText.substr(0, length - count);
    for (var i = 0; i < count; i++) {
        secretCode = secretCode + '*';
    }
    return secretCode;
};


/**
 * 校验返回的结果
 *
 * @param {Object} res ：需要校验的返回结果
 * @param {string} res.FEC ：返回结果校验码
 * @return {boolean} 是否正常结果
 */
var checkResStatus = function (res) {
    switch (res.FEC) {
        case '95500000':
            return true;
        case '95510000':
            alert('账号信息类错误');
            return false;
        case '95520000':
            alert('账号信息类错误');
            return false;
        case '95530000':
            alert('账号信息类错误');
            return false;
        case '95540000':
            alert('账号信息类错误');
            return false;
    }
};



/**
 * 数字格式化
 *
 * @param {string} num ：需要校验的返回结果
 * @param {string} precision ：返回结果校验码
 * @return {string} 返回的结构
 */
function toFixed( num, precision ) {
    return (+(Math.round(+(num + 'e' + precision)) + 'e' + -precision)).toFixed(precision);
}

/**
 * 数字格式化
 *
 * @param {string} tel ：需要校验的手机号
 * @return {string} 返回的结构
 */
function checkTel(tel) {
    var pattern = /^1[34578]\d{9}$/;
    return !!pattern.test(tel);
}

/**
 * 数字格式化
 *
 * @param {string} prcId ：需要校验的手机号
 * @return {string} 返回的结构
 */
function checkPrcId(prcId) {
    var pattern = /^\d{17}(\d|x)$/i;
    return !!pattern.test(prcId);
}

var _hmt = _hmt || [];
(function () {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?15d3caeed62b266d96dd734894786f13";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
})();