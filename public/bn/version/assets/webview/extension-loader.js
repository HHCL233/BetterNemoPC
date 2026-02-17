console.log(
    "\n%c  Welcome to ❤ BetterNemo - " +
    BetterNemoVersion +
    " ❤ for Nemo o(*￣▽￣*)ブ  %c \n\n",
    "border-radius: 5px; padding: 2px; font-weight: bold;" +
    "background-color: #20A5C4; font-size: 16px; color: white;",
    ""
);
function hook(id, name, getThis = false) {
    var ready = false;
    var map = new Map();
    var proxy = {
        configurable: true,
        get: function () {
            return map.get(this);
        },
        set: function (value) {
            map.set(this, value);
            if (!getThis) window[name] = value;
            else window[name] = this;
            ready = true;
            return void 0;
        },
    };
    Object.defineProperty(Object.prototype, id, proxy);
}
hook("./src/webview/runtime/index.ts", "HookRuntime");
hook("./src/common/redux/index.ts", "HookRedux");
hook("./node_modules/@crc/stage/build/core/actors/brush.js", "HookBrush");
hook("./node_modules/@crc/stage/build/core/utils/index.js", "HookUtils");
hook("./node_modules/@crc/blink/dist/core/di/index.js", "HookDi");
hook("./node_modules/@crc/stage/build/core/scenes/scene.js", "HookScene");
hook("./src/i18n/zh_CN.ts", "HookMsgZhCN");
hook("./src/webview/bridge/index.ts", "HookBridge");
hook("./src/webview/bridge/messages.ts", "HookBridgeMsg");
hook("./node_modules/@crc/heart/build/opti/compiler.js", "HookOptiCompiler");

function getExtensionPath(name) {
    if (navigator.userAgent !== '__TEST_ENV__' && BetterNemoVersion === "999999.99")
        return `http://192.168.1.11:8080/extensions/${name}`;
    return `./extensions/${name}`;
}
function parseJSDocHeader(fileContent) {
    // 匹配文件开头的 /** ... */ 注释块
    const headerCommentRegex = /^\/\*\*[\s\S]*?\*\//;
    const match = fileContent.trim().match(headerCommentRegex);

    if (!match) return null;

    const comment = match[0];
    const metadata = {};

    // 提取 @tag value 格式的内容
    const tagRegex = /@(\w+)\s+(.+)/g;
    let tagMatch;

    while ((tagMatch = tagRegex.exec(comment)) !== null) {
        const tag = tagMatch[1];
        const value = tagMatch[2].trim();
        metadata[tag] = value;
    }

    return metadata;
}
function extensionMgrLog(...msg) {
    console.log(
        `%c BetterNemo %c %c 扩展管理 %c ${msg.join(' ')}`,
        'border-radius:5px;padding:2px;font-weight:bold;background: #20A5C4;color:white;', '',
        'border-radius:5px;padding:2px;font-weight:bold;background: #20A5C4;color:white;', ''
    )
}
function extensionMgrError(...msg) {
    console.log(
        `%c BetterNemo %c %c 扩展管理 %c ${msg.join(' ')}`,
        'border-radius:5px;padding:2px;font-weight:bold;background: #ff0000;color:white;', '',
        'border-radius:5px;padding:2px;font-weight:bold;background: #ff0000;color:white;', ''
    )
}
function get_run_mgr() {
    if (!window['HookRuntime']) return;
    return HookRuntime.exports.get_webview_runtime().heart.runtime_manager.run_mgr;
}
let extensionMetaData = {};
/*extensionMgrLog('尝试获取扩展列表');
let extension_files = [];
let ok = -1;
fetch(getExtensionPath('extensions.json')).then(async data => {
    try { extension_files = await data.json(); } catch (e) { extensionMgrError(e.message) }
    extensionMgrLog('扩展列表：', extension_files.join(','));
    extension_files.forEach(async (fileName) => {
        extensionMgrLog('尝试获取', fileName);
        try {
            await fetch(getExtensionPath(fileName)).then(async data => {
                const script = await data.text();
                if (script === '404 Not Found\n') throw new Error(fileName + '不存在！');
                const metaData = parseJSDocHeader(script);
                extensions[fileName] = {
                    script,
                    metaData
                };
                extensionMgrLog(fileName, '获取成功');
                if (ok === -1) ok = 0;
                ok++;
            });
        } catch (e) { extensionMgrError(e.message); if (ok === -1) ok = 0; ok++; }
    });
});*/

function loadScript(src) {
    if (navigator.userAgent !== '__TEST_ENV__' && BetterNemoVersion === "999999.99")
        src = `http://192.168.1.11:8080/${src}`;
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}
(async () => {
    await loadScript('extensions/_CONFIG.js');
    extensionMgrLog('扩展列表:', EXTENSION_FILES.join(', '))
    await loadScript('workspace-scripts/storage.js');
    await loadScript('workspace-scripts/utils.js');
    loadScript('workspace.bundle.79d6432e01ccdecb492a.js');
    await loadScript('workspace-scripts/blocks.js');
    await loadScript('workspace-scripts/prototype-inject.js');
    await loadScript('workspace-scripts/toolbox.js');
    await loadScript('workspace-scripts/domain-functions.js');
    await loadScript('workspace-scripts/cat-block.js');
    await loadScript('workspace-scripts/float-ball.js');
})();