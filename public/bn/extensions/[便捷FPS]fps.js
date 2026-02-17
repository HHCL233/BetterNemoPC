/// <reference path="../bn.d.ts"/>

Extension.metaData = {
    name: "FPS检测",
    version: "0.0.1",
    description: "获取设备实时FPS，支持开启/关闭检测",
    author: "元宝",
    docs: ""
};
(async () => {
    /** @type {BetterNemo} */
    const BN = Extension.API;
    const Block = BN.Block;
    const Toolbox = BN.Toolbox;
    await isBlocklyLoaded();

    // 注册积木颜色
    BN.regColor("FPS_HUE", "#4CAF50", "#4CAF50");

    // 定义FPS检测核心变量
    let isFPSDetecting = false;
    let currentFPS = 0;
    let frameCount = 0;
    let lastTime = Date.now();
    let fpsTimer = null;

    // FPS检测核心方法
    function updateFPS() {
        frameCount++;
        const now = Date.now();
        const delta = now - lastTime;
        if (delta >= 1000) {
            currentFPS = Math.round((frameCount * 1000) / delta);
            frameCount = 0;
            lastTime = now;
        }
        if (isFPSDetecting) fpsTimer = requestAnimationFrame(updateFPS);
    }

    // 定义自定义积木
    const fpsBlocks = [
        // 开启FPS检测积木（执行类）
        {
            type: "fps_start_detect",
            message0: "开启FPS检测",
            args0: [],
            ...Block.methodBlock
        },
        // 关闭FPS检测积木（执行类）
        {
            type: "fps_stop_detect",
            message0: "关闭FPS检测",
            args0: [],
            ...Block.methodBlock
        },
        // 获取当前FPS值积木（数值类）
        {
            type: "fps_get_value",
            message0: "当前FPS值",
            args0: [],
            output: "Number",
            ...Block.valueBlock
        }
    ].map((block) => { return { ...block, colour: "%{BKY_FPS_HUE}" }; });

    // 注册积木
    BN.regBlocks(fpsBlocks);

    // 等待积木对象加载
    await (async () => {
        while (window['blockObjects'] == [])
            await new Promise((resolve) => requestAnimationFrame(resolve));
        return;
    })();

    // 定义积木盒XML
    const fpsXML = [
        Toolbox.title("FPS检测 · FPS Detect"),
        Toolbox.block("fps_start_detect"),
        Toolbox.block("fps_stop_detect"),
        Toolbox.block("fps_get_value"),
        Toolbox.flyout_bottom(),
    ];

    // 注册积木盒图标（绿色叶子图标，适配FPS主题）
    BN.regIcon(`<symbol id="icon-fps" viewBox="-33 -33 90 90"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></symbol>`);

    // 添加积木盒到编程猫界面
    BN.addToolbox("fps", "icon-fps", "#4CAF50", fpsXML);

    // 等待Runmgr加载，注册积木解释器
    await isRunmgrHooked();

    // 开启FPS检测解释器
    BN.regMethod('fps_start_detect', (params) => {
        if (!isFPSDetecting) {
            isFPSDetecting = true;
            frameCount = 0;
            lastTime = Date.now();
            updateFPS();
        }
    });

    // 关闭FPS检测解释器
    BN.regMethod('fps_stop_detect', (params) => {
        if (isFPSDetecting) {
            isFPSDetecting = false;
            cancelAnimationFrame(fpsTimer);
            currentFPS = 0; // 关闭后重置FPS值
        }
    });

    // 获取当前FPS值解释器
    BN.regMethod('fps_get_value', (params) => {
        return currentFPS;
    });
})();
