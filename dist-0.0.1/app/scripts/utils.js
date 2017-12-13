module.exports = {
    isNull: what  => {
        return what === null || typeof(what) === 'undefined';
    },

    isArr: what  =>{
        return (!module.exports.isNull(what) && what.constructor.toString().indexOf('Array') > -1);
    },

    isStr: what  => {
        return typeof what === 'string' || what instanceof String;
    },

    isNum: what  => {
        return !isNaN(parseFloat(what)) && isFinite(what);
    },

    isFn: what => {
        return (what && (typeof what === 'function' || what instanceof Function));
    },

    isBool: what => {
        return what === true || what === false;
    },

    isBasic: what => {
        return  module.exports.isStr(what) || module.exports.isNum(what) || module.exports.isBool(what) || module.exports.isFn(what) || module.exports.isArr(what);
    },

    isEmpty: what => {
        if(module.exports.isArr(what)) {
            var i = 0,
                length = what.length;
            for(;i<length;i++) {
                // TODO 进一步判定类型
                if(module.exports.isObjEmpty(what[i])) { 
                    return true;
                }
            }
            return false;
        } else {
            return module.exports.isObjEmpty(what);
        }
    },

    isObjEmpty: what => {
        if(what) {
            var key;
            for(key in what) {
                return false;
            }
        }
        return false;
    },

    merge: (a, b) => {
        if(!a || !b) {
            return a || b;
        }

        Object.keys(b).forEach((bk) => {
            if(module.exports.isNull(b[bk]) || module.exports.isBasic(b[bk])) {
                a[bk] = b[bk];
            } else if(module.exports.isArr(b[bk])) {
                a[bk] = [];
                b[bk].forEach((i) => {
                    if(module.exports.isNull(i) || module.exports.isBasic(i)) {
                        a[bk].push(i);
                    } else {
                        a[bk].push(module.exports.merge(module.exports.isArr(i)? [] : {}, i));
                    }
                })
            } else if(b[bk].tagName && b[bk].appendChild && b[bk].removeChild && b[bk].style) {
                a[bk] = b[bk];
            } else {
                a[bk] = a[bk] || {};
                module.exports.merge(a[bk], b[bk]);
            }
        });
        return a;
    },

    post: (url, data, success, error) => {
        module.exports.ajax({
            url: url,
            type: 'POST',
            data: data,
            autoFire: true,
            success: success,
            error: error
        });
    },

    get: (url, data, success, error) => {
        module.exports.ajax({
            url: url,
            data: data,
            autoFire: true,
            success: success,
            error: error
        });
    },

    ajax: (params) => {
        var props = module.exports.merge({
            url: false,
            type: 'GET',
            dataType: 'json',
            success: false,
            error: false,
            data: {},
            autoFire: true
        }, params),
            headers = {
                json: 'application/json',
                xml: 'application/xml',
                text: 'text/plain',
                octet: 'application/octet-stream'
            },
            r = new XMLHttpRequest();
        
            if(!props.url) return false;

        r.open(props.type, props.url, true);
        r.setRequestHeader('Content-type', headers[props.dataType] || headers.text);

        r.onreadystatechange = () => {
            if(r.readyState === 4 && r.status === 200) {
                if(props.dataType === 'json') {
                    try {
                        var json = JSON.parse(r.responseText);
                        if(module.exports.isFn(props.success)) {
                            props.success(json);
                        }
                    } catch(e) {
                        if(module.exports.isFn(props.error)) {
                            props.error(e.toString(), r.responseText);
                        }
                    }
                } else{
                    if(module.exports.isFn(props.success)) {
                        props.success(r.responseText);
                    }
                }
            } else if(r.readyState === 4) {
                if(module.exports.isFn(props.error)) {
                    props.error(r.status, r.statusText);
                }
            }
        };

        function fire() {
            if(!props.data) {
                r.send();
                return false;
            }
            try {
                r.send(JSON.stringify(props.data));
            } catch(e) {
                r.send(props.data || true);
            }
        }

        if(props.autoFire) {
            fire();
        }
        return {
            fire: fire,
            request: r
        }
    },

    getOrPost: (url, data, success, isGet) => {
        module.exports.ajax({
            url: url,
            data: data,
            autoFire: true,
            type: isGet ? 'GET' : 'POST',
            success: (data) => {
                if(data.isSuccess) {
                    success(data.context);   
                } else {
                    console.log(data.msg);
                }
            },
            error: (status, msg) =>{
                console.log(url, status, msg)
                // TODO 统一的错误处理
            }
        });
    }
}