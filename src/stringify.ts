/** 复制于:https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON */
export function stringify(value: any): any {
    const toString = Object.prototype.toString;
    const isArray = Array.isArray
        || function (a) { return toString.call(a) === '[object Array]'; };
    const escMap = {
        '"': '\\"',
        '\\': '\\\\',
        '\b': '\\b',
        '\f': '\\f',
        '\n': '\\n',
        '\r': '\\r',
        '\t': '\\t'
    };
    const escFunc = function (m: keyof typeof escMap) {
        return escMap[m] ||
            '\\u' + (m.charCodeAt(0) + 0x10000).toString(16).substr(1);
    };
    const escRE = /[\\"\u0000-\u001F\u2028\u2029]/g;
    function _stringify(value: any): any {
        if (value == null) {
            return 'null';
            // 添加了这两行
        } else if (typeof value === 'bigint') {
            return value.toString();
        } else if (typeof value === 'number') {
            return isFinite(value) ? value.toString() : 'null';
        } else if (typeof value === 'boolean') {
            return value.toString();
        } else if (typeof value === 'object') {
            if (typeof value.toJSON === 'function') {
                return _stringify(value.toJSON());
            } else if (isArray(value)) {
                var res = '[';
                for (var i = 0; i < value.length; i++)
                    res += (i ? ', ' : '') + _stringify(value[i]);
                return res + ']';
            } else if (toString.call(value) === '[object Object]') {
                var tmp = [];
                for (var k in value) {
                    if (value.hasOwnProperty(k))
                        tmp.push(_stringify(k) + ': ' + _stringify(value[k]));
                }
                return '{' + tmp.join(', ') + '}';
            }
        }
        return '"' + value.toString().replace(escRE, escFunc) + '"';
    };

    return _stringify(value)
}

// console.log(stringify({
//     a: 0.1,
//     b: false,
//     c: true,
//     d: null,
//     e: 'hello',
//     f: [123456789876543210n, 2, { a: 1, b: false, c: true, d: null, e: '你好' }],
// }))