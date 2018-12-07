/**
 * Promise based HTTP client with compatible API.
 * @param {!FetchitURL} url - The server URL that will be used for the request.
 * @param {?FetchitOptions} [options={}] - The config options for making request.
 * @param {?HTTPMethod} [options.method='get'] - The HTTP request method to use.
 * @param {?HTTPHeaders} [options.headers] - The proper HTTP headers.
 * @param {?HTTPResponseType} [options.responseType=''] - The string value specifying the type of data contained in the response.
 * @param {?HTTPCredentials} [options.credentials] - The request’s credentials mode.
 * @param {?number} [options.timeout=30000] - The number of milliseconds that can pass before the request is terminated.
 * @param {?HTTPBody} [options.body] - The body of data to be sent in the request.
 *
 * @returns {Promise<FetchitResponse>} Promise
 */
const fetchit = function fetchit(url, options) {
    options = options || {};
    return new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();

        request.open(options.method || 'get', url, true);

        for (let name in options.headers) {
            if (Object.prototype.hasOwnProperty.call(options.headers, name)) {
                request.setRequestHeader(name, options.headers[name]);
            }
        }

        request.responseType = options.responseType || '';
        request.withCredentials = options.credentials === 'include';
        request.timeout = options.timeout || 30000;

        /**
         * @returns {FetchitResponse}
         */
        const response = function response() {
            const keys = [];
            const all = [];
            const headers = {};

            let header = null;

            request.getAllResponseHeaders().replace(/^(.*?):[^\S\n]*([\s\S]*?)$/gm, (m, key, value) => {
                keys.push(key = key.toLowerCase());
                all.push([key, value]);
                header = headers[key];
                headers[key] = header ? `${header},${value}` : value;
            });

            return {
                ok: request.status >= 200 && request.status < 300,
                status: request.status,
                statusText: request.statusText,
                url: request.responseURL,
                clone: response,
                data: (() => {
                    let data = request.response;
                    if (typeof data === 'string') {
                        try {
                            data = JSON.parse(data);
                        } catch (e) { }
                    }
                    return data;
                })(),
                config: options,
                text: () => Promise.resolve(request.responseText),
                json: () => Promise.resolve(request.responseText).then(JSON.parse),
                blob: () => Promise.resolve(new Blob([request.response])),
                xml: () => Promise.resolve(new DOMParser().parseFromString(request.responseText, 'application/xml')),
                html: () => Promise.resolve(new DOMParser().parseFromString(request.responseText, 'text/html')),
                headers: {
                    keys: () => keys,
                    entries: () => all,
                    get: n => headers[n.toLowerCase()],
                    has: n => n.toLowerCase() in headers
                }
            };
        };

        request.onload = () => {
            resolve(response());
        };

        request.onerror = reject;

        request.send(options.body || null);
    });
};

export { fetchit };
export default fetchit;

/**
 * @typedef HTTPResponseType
 * @type {('arraybuffer'|'blob'|'document'|'json'|'text'|'stream')}
 */

/**
 * @typedef HTTPMethod
 * @type {('get'|'delete'|'head'|'options'|'post'|'put'|'patch')}
 */

/**
 * @typedef HTTPHeaders
 * @type {Object.<!string, !string>}
 */

/**
 * @typedef HTTPCredentials
 * @type {('omit'|'same-origin'|'include')}
 */

/**
 * @typedef HTTPBody
 * @type {(Document|Blob|BufferSource|FormData|URLSearchParams|ReadableStream|USVString)}
 */

/**
 * @typedef FetchitURL
 * @type {(string|URL)}
 */

/**
 * @typedef FetchitOptions
 * @property {?HTTPMethod} method
 * @property {?HTTPHeaders} headers
 * @property {?HTTPResponseType} responseType
 * @property {?HTTPCredentials} credentials
 * @property {?number} timeout
 * @property {?HTTPBody} body
 */

/**
 * @typedef FetchitHeaders
 * @property {function(): Array.<string>} keys
 * @property {function(): Array.<Array.<string>>} entries
 * @property {function(string): ?string} get
 * @property {function(string): boolean} has
 */

/**
 * @typedef FetchitResponse
 * @property {boolean} ok
 * @property {number} status
 * @property {string} statusText
 * @property {function(): !FetchitResponse} clone
 * @property {any} data
 * @property {FetchitOptions} config
 * @property {function(): Promise<string>} text
 * @property {function(): Promise<object>} json
 * @property {function(): Promise<Blob>} blob
 * @property {function(): Promise<Document>} xml
 * @property {function(): Promise<HTMLDocument>} html
 * @property {FetchitHeaders} headers
 */
