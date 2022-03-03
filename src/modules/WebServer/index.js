import EventEmitter from 'events';
import http, { Server } from 'http';
import { ModuleBuilder } from 'waffle-manager';
import { Logger } from '@/src/util/Logger.js';
import { HTTPRequest } from './structures/HTTPRequest.js';
import Constants, { DefaultResponseHeaders, DefaultAllowedHeaders, DefaultAllowedMethods, SortFunction, WebServerConfig } from './util/Constants.js';

export const ModuleConstants = Constants;

export const ModuleInfo = new ModuleBuilder('webServer');

export const ModuleInstance = class WebServer extends EventEmitter {
    constructor(main) {
        super();

        this._defaultHeaders = {};
        this._handlers = [];
        this._config = WebServerConfig;
        this._s = new Server();

        this.additional_config = main.config.web_server;
    }

    get host() {
        return this._config.host;
    }

    get port() {
        return this._config.port;
    }

    /**
     * Adds a request handler for the given path.
     * @param {string} path The path to be handle by said path handler.
     * @param {function} handler The callback to the function handling the request.
     */
    addPathHandler(path, handler) {
        if (!path instanceof String)
            throw new Error('Path is not of type String.');
        if (typeof handler !== 'function')
            throw new Error('Handler is not a function.');

        this._handlers.push([path, handler]);
        this._handlers.sort(SortFunction);

        Logger.info('WEB_SERVER', `Registered new handler for path "${path}"`);
    }

    buildHeaders() {
        this._defaultHeaders['Access-Control-Allow-Headers'] = DefaultAllowedHeaders.join(',');
        this._defaultHeaders['Access-Control-Allow-Methods'] = DefaultAllowedMethods.join(',');
        this._defaultHeaders['Access-Control-Allow-Headers'] += `,${this.additional_config.allowed_headers.join(',')}`;

        console.log(this._defaultHeaders);
    }

    cleanup() {
        this.close();
    }

    handlePreflight(req, res) {
        if (req.method.toUpperCase() !== 'OPTIONS')
            return false;

        
        res.writeHead(204, this._defaultHeaders);
        res.end();

        return true;
    }

    init() {
        this.buildHeaders();

        this._s.on('listening', this.onListening.bind(this));
        this._s.on('request', this.onRequest.bind(this));
        this._s.listen(this.port, this.host);

        return true;
    }

    onListening() {
        Logger.info("WEB_SERVER", `Server listening on: ${this.host}:${this.port}`);
    }

    /**
     * "request" event handler
     * @param {http.IncomingMessage} request
     * @param {http.ServerResponse} response
     */
    async onRequest(request, response) {
        if (this.handlePreflight(request, response))
            return;
        const httpRequest = new HTTPRequest(request, response);
        for (const [ path, handler ] of this._handlers) {
            if (httpRequest.path.startsWith(path)) {
                await handler(httpRequest);

                return;
            }
        }

        response.end(`<pre>No handler registered for path: ${httpRequest.path}</pre>`);
    }
};
