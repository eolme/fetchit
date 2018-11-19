const fetchit = function fetchit(url, options) {
    options = options || {};
    return new window.Promise((resolve, reject) => {
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

        request.onload = () => {
            resolve(response());
        };

        request.onerror = reject;

        request.send(options.body || null);

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
                data: request.response,
                config: options,
                text: () => window.Promise.resolve(request.responseText),
                json: () => window.Promise.resolve(request.responseText).then(JSON.parse),
                blob: () => window.Promise.resolve(new Blob([request.response])),
                xml: () => window.Promise.resolve(new DOMParser().parseFromString(request.responseText, 'application/xml')),
                html: () => window.Promise.resolve(new DOMParser().parseFromString(request.responseText, 'text/html')),
                headers: {
                    keys: () => keys,
                    entries: () => all,
                    get: n => headers[n.toLowerCase()],
                    has: n => n.toLowerCase() in headers
                }
            };
        };
    });
};

export { fetchit };
export default fetchit;