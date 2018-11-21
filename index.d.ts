export type HTTPResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream';

export type HTTPMethod = 'get' | 'delete' | 'head' | 'options' | 'post' | 'put' | 'patch';

export interface HTTPHeaders {
    [key: string]: string;
}

export type HTTPCredentials = 'omit' | 'same-origin' | 'include';

export type HTTPBody = Document | Blob | BufferSource | FormData | URLSearchParams | ReadableStream | String;

export type FetchitURL = string | URL;

export interface FetchitOptions {
    method?: HTTPMethod,
    headers?: HTTPHeaders,
    responseType?: HTTPResponseType,
    credentials?: HTTPCredentials,
    timeout?: number,
    body?: HTTPBody
}

export interface FetchitHeaders {
    keys: (() => Array<string>),
    entries: (() => Array<Array<string>>),
    get: ((name: string) => string | null),
    has: ((name: string) => boolean)
}

export interface FetchitResponse {
    ok: boolean,
    status: number,
    statusText: string,
    clone: (() => FetchitResponse),
    data: any,
    config: FetchitOptions,
    text: (() => Promise<string>),
    json: (() => Promise<object>),
    blob: (() => Promise<Blob>),
    xml: (() => Promise<Document>),
    html: (() => Promise<HTMLDocument>),
    Headers: FetchitHeaders
}

export const fetchit: ((url: FetchitURL, options?: FetchitOptions) => Promise<FetchitResponse>);
export default fetchit;
