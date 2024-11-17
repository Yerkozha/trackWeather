export interface FetchOptions {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    mode?: 'no-cors' | 'cors' | 'same-origin';
    cache?: 'default' | 'no-cache' | 'reload' | 'force-cache' | 'only-if-cached';
    credentials?: 'include' | 'same-origin' | 'omit';
    headers?:  Record<string, string>;
    redirect?: 'manual' | 'follow' | 'error';
    referrerPolicy?: | 'no-referrer'
                | 'no-referrer-when-downgrade'
                | 'origin'
                | 'origin-when-cross-origin'
                | 'same-origin'
                | 'strict-origin'
                | 'strict-origin-when-cross-origin'
                | 'unsafe-url'; // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body?: unknown;                // body data type must match "Content-Type" header
}