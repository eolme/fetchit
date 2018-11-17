import fetchit from './index';

const merge = (function merge(target, source) {
    const merged = Object(target);
    const keysArray = Object.keys(Object(source));
    for (let nextIndex = 0, len = keysArray.length, nextKey = null; nextIndex < len; ++nextIndex) {
        nextKey = keysArray[nextIndex];
        merged[nextKey] = source[nextKey];
    }
    return merged;
});

const encode = (function encode(uri) {
    return window.encodeURIComponent('' + uri).replace(/[!'()*]/g, (c) => {
        return "%" + c.charCodeAt(0).toString(16).toUpperCase()
    });
});

const stringifyGet = (function stringifyGet(params) {
    params = Object(params);
    const result = [];
    for (let name in params) {
        result.push(name + '=' + encode(params[name]));
    }
    return result.join('&');
});

const axios = (function axios(config) {
    config = config || {};
    config.body = config.data || null;
    config.headers = merge(axios.defaults.headers.common, config.headers);
    
    if (config.method) {
        config.headers = merge(axios.defaults.headers[('' + config.method).toLowerCase()], config.headers);
    }

    return fetchit(config.url, config);
});

axios.defaults = {
    headers: {
        common: {},
        post: {},
        get: {},
        put: {},
        delete: {}
    },
};

axios.prototype = {
    get(url, config) {
        return fetchit(url, merge(config, { method: 'get', body: stringifyGet(config.params) }));
    },
    post(url, config) {
        return fetchit(url, merge(config, { method: 'post', body: window.JSON.stringify(config) }));
    },
    put(url, config) {
        return fetchit(url, merge(config, { method: 'put', body: window.JSON.stringify(config) }));
    },
    delete(url, config) {
        return fetchit(url, merge(config, { method: 'delete', body: stringifyGet(config.params) }));
    }
};

export { axios };
export default axios;
