"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.watchRebuildPlugin = watchRebuildPlugin;
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
const ws_1 = require("ws");
const interpreter_1 = __importDefault(require("../interpreter"));
const constant_1 = require("../constant");
const injectionsPath = node_path_1.default.resolve(__dirname, '..', '..', '..', 'build', 'injections');
const refreshCode = node_fs_1.default.readFileSync(node_path_1.default.resolve(injectionsPath, 'refresh.js'), 'utf-8');
const reloadCode = node_fs_1.default.readFileSync(node_path_1.default.resolve(injectionsPath, 'reload.js'), 'utf-8');
function watchRebuildPlugin(config) {
    let ws = null;
    const id = Math.random().toString(36);
    let reconnectTries = 0;
    const { refresh, reload } = config;
    const hmrCode = (refresh ? refreshCode : '') + (reload ? reloadCode : '');
    function initializeWebSocket() {
        ws = new ws_1.WebSocket(constant_1.LOCAL_RELOAD_SOCKET_URL);
        ws.onopen = () => {
            console.log(`[HMR] Connected to dev-server at ${constant_1.LOCAL_RELOAD_SOCKET_URL}`);
        };
        ws.onerror = () => {
            console.error(`[HMR] Failed to connect server at ${constant_1.LOCAL_RELOAD_SOCKET_URL}`);
            console.warn('Retrying in 3 seconds...');
            ws = null;
            if (reconnectTries <= 2) {
                setTimeout(() => {
                    reconnectTries++;
                    initializeWebSocket();
                }, 3000);
            }
            else {
                console.error(`[HMR] Cannot establish connection to server at ${constant_1.LOCAL_RELOAD_SOCKET_URL}`);
            }
        };
    }
    return {
        name: 'watch-rebuild',
        writeBundle() {
            var _a;
            (_a = config.onStart) === null || _a === void 0 ? void 0 : _a.call(config);
            if (!ws) {
                initializeWebSocket();
                return;
            }
            /**
             * When the build is complete, send a message to the reload server.
             * The reload server will send a message to the client to reload or refresh the extension.
             */
            ws.send(interpreter_1.default.send({ type: constant_1.BUILD_COMPLETE, id }));
        },
        generateBundle(_options, bundle) {
            for (const module of Object.values(bundle)) {
                if (module.type === 'chunk') {
                    module.code = `(function() {let __HMR_ID = "${id}";\n` + hmrCode + '\n' + '})();' + '\n' + module.code;
                }
            }
        },
    };
}
