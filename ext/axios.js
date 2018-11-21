import fetchit from '../index';

const merge = function merge(target, source) {
    const merged = Object(target);
    const keysArray = Object.keys(Object(source));
    for (let nextIndex = 0, len = keysArray.length, nextKey = null; nextIndex < len; ++nextIndex) {
        nextKey = keysArray[nextIndex];
        merged[nextKey] = source[nextKey];
    }
    return merged;
};

const encode = function encode(uri) {
    return window.encodeURIComponent('' + uri).replace(/[!'()*]/g, (c) => {
        return '%' + c.charCodeAt(0).toString(16).toUpperCase();
    });
};

const stringifyGet = function stringifyGet(params) {
    params = Object(params);
    const result = [];
    for (let name in params) {
        if (Object.prototype.hasOwnProperty.call(params, name)) {
            result.push(name + '=' + encode(params[name]));
        }
    }
    return result.join('&');
};

const createURL = function createURL(url, base) {
    if (base) {
        return '' + ((/^https?:\/\//i).test(url) ? url : base + url);
    }
    return '' + url;
};

/**
 * @external axios
 * @see {@link https://npmjs.com/package/axios/ axios}
 */
const axios = function axios(config) {
    config = config || {};
    config.body = config.data || null;
    config.headers = merge(axios.defaults.headers.common, config.headers);
    config.credentials = config.withCredentials ? 'include' : null;

    if (config.method) {
        config.headers = merge(axios.defaults.headers[('' + config.method).toLowerCase()], config.headers);
    }

    return fetchit(createURL(config.url, config.baseURL), config);
};

axios.defaults = {
    headers: {
        common: {},
        post: {},
        get: {},
        put: {},
        delete: {}
    }
};

axios.get = function axiosGet(url, config) {
    config = config || {};
    url = '' + (config.params ? url + '?' + stringifyGet(config.params) : url);
    return fetchit(url, merge(config, { method: 'get', body: null }));
};

axios.post = function axiosPost(url, config) {
    config = config || {};
    return fetchit(url, merge(config, { method: 'post', body: window.JSON.stringify(config) }));
};

axios.put = function axiosPut(url, config) {
    config = config || {};
    return fetchit(url, merge(config, { method: 'put', body: window.JSON.stringify(config) }));
};

axios.delete = function axiosDelete(url, config) {
    config = config || {};
    url = '' + (config.params ? url + '?' + stringifyGet(config.params) : url);
    return fetchit(url, merge(config, { method: 'delete', body: null }));
};

export { axios };
export default axios;
