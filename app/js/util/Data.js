
/**
 * Create a URL instance of the given URL string and returns it.
 * @param {string|URL} url 
 */
 const getURL = (url) => {
    
    if (url instanceof URL) return url;
    try {
        return new URL(url);
    } catch (error) {
        return new URL(window.location.href.split('/').slice(0, -1).join('/') + "/" + url);
    }
};

/**
 * Merges objects into one object
 * @param  {...any} args 
 */
const merge = (...args) => {
    Object.assign(...args);
}

/**
 * Creates a URLSearchParams instance and assigns it to the given URL instance.
 * @param {URL} url 
 * @param {string|URLSearchParams} searchParams 
 */
const urlAddSearchParams = (url, searchParams) => {
    if (searchParams instanceof URLSearchParams)
        url.search = searchParams;
    else
        url.search = new URLSearchParams(searchParams);
};

/**
 * Creates a POST request and returns the response from fetch
 * @param {string|URL} url 
 * @param {string|Object} [body = ''] 
 * @param {URLSearchParams|Object} [searchParams = {}] 
 * @param {Object} [headers = {}] 
 * @param {Object} [options = {}] 
 */
export const deleteReq = (url, body = '', searchParams = {}, headers = {}, options = {}) => {
    url = getURL(url);
    urlAddSearchParams(url, searchParams);

    if (!(body instanceof FormData) && body instanceof Object)
        body = JSON.stringify(body);

    merge(options, {
        headers,
        method: 'DELETE',
        body
    });

    return fetch(url, options);
}

/**
 * Creates a GET request and returns the response from fetch
 * @param {string|URL} url A relative path or an absolute URL to another host
 * @param {URLSearchParams} [searchParams = {}] Additional search params to add to the request
 * @param {Object} [headers = {}] Custom headers that need to be set
 * @param {Object} [options = {}] Custom options that you might need to pass to fetch
 * @returns {Promise<Response>}
 */
export const get = (url, searchParams = {}, headers = {}, options = {}) => {
    url = getURL(url);
    urlAddSearchParams(url, searchParams);
    
    merge(options, {
        headers,
        method: 'GET',
    });
    return fetch(url, options);
};

/**
 * Creates a POST request and returns the response from fetch
 * @param {string|URL} url 
 * @param {string|Object} [body = ''] 
 * @param {URLSearchParams|Object} [searchParams = {}] 
 * @param {Object} [headers = {}] 
 * @param {Object} [options = {}] 
 */
export const post = (url, body = '', searchParams = {}, headers = {}, options = {}) => {
    url = getURL(url);
    urlAddSearchParams(url, searchParams);

    if (!(body instanceof FormData) && body instanceof Object)
        body = JSON.stringify(body);

    merge(options, {
        headers,
        method: 'POST',
        body
    });

    return fetch(url, options);
};

/**
 * Creates a PUT request and returns the response from fetch
 * @param {string|URL} url 
 * @param {string|Object} [body = ''] 
 * @param {URLSearchParams|Object} [searchParams = {}] 
 * @param {Object} [headers = {}] 
 * @param {Object} [options = {}] 
 */
export const put = (url, body = '', searchParams = {}, headers = {}, options = {}) => {
    url = getURL(url);
    urlAddSearchParams(url, searchParams);

    if (!(body instanceof FormData) && body instanceof Object)
        body = JSON.stringify(body);

    merge(options, {
        headers,
        method: 'PUT',
        body
    });

    return fetch(url, options);
};

export const getSession = (url, body = '', searchParams = {}, headers = {}, options = {}) => {
    url = getURL(url);
    urlAddSearchParams(url, searchParams);

    if (!(body instanceof FormData) && body instanceof Object)
        body = JSON.stringify(body);

    merge(options, {
        headers,
        method: 'POST',
        body
    });

    return fetch(url, options);
}

export default {
    delete: deleteReq,
    get,
    post,
    put
};