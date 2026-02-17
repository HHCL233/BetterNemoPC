/// <reference path="../bn.d.ts"/>

Extension.metaData = {
    name: "加密",
    version: "0.0.1",
    description: "没想好要写什么",
    author: "Inventocode",
    docs: ""
};


(async () => {
    // 在这里定义了一些必要的API
    /** @type {BetterNemo} */
    const BN = Extension.API;
    const Block = BN.Block;
    const Toolbox = BN.Toolbox;
    // --------------------------------积木-------------------------------
    // 这条语句会等待Blockly加载完毕，别动
    await isBlocklyLoaded();
    // 开始定义你的自定义积木吧
    const encryptBlocks = [
        {
            type: "encrypt_block",
            message0: "这是模板里的一个自定义积木呀",
            args0: [],
            ...Block.methodBlock
        }
    ].map((block) => { return { ...block, colour: "%{BKY_VARIABLES_HUE}" }; });
    // 注册你的积木
    BN.regBlocks(encryptBlocks);
    // --------------------------------积木盒-------------------------------
    // 等待积木对象加载完毕，别动
    await (async () => {
        while (window['blockObjects'] == [])
            await new Promise((resolve) => requestAnimationFrame(resolve));
        return;
    })();
    // 定义你的积木盒
    const encryptXML = [
        Toolbox.title("加密 · Encrypt"),
        // Toolbox.block("encrypt_block"),
        Toolbox.flyout_bottom(),
    ];
    // 为你的积木盒注册一个图标
    BN.regIcon(`<symbol id="icon-encrypt" viewBox="-2000 -2000 5000 5000"><path d="M579.2 264.5c-24.1 24-37.4 56-37.4 90.2 0 34 13.3 66 37.4 90.1 24 24.1 56 37.4 90.2 37.4 34 0 66-13.3 90.2-37.4 49.7-49.7 49.7-130.6 0-180.2-48.3-48.3-132.3-48.2-180.4-0.1z m133.9 133.9c-23.4 23.3-64.2 23.2-87.5 0-11.7-11.7-18.1-27.2-18.1-43.7 0-16.5 6.5-32.1 18.1-43.7 11.7-11.7 27.2-18.1 43.7-18.1 16.5 0 32.1 6.5 43.7 18.1 24.2 24.1 24.2 63.3 0.1 87.4z" p-id="3706"></path><path d="M920.2 103.8c-138.4-138.4-363.4-138.3-501.8 0-97.9 98-129.5 241.1-83.2 370.2l-41 40.9H187.4c-18.1 0-32.8 14.7-32.8 32.8v82.5H72c-18.1 0-32.8 14.7-32.8 32.8v107L9.6 799.5C3.5 805.7 0 814 0 822.7v168.4c0 18.1 14.7 32.8 32.8 32.8h168.4c8.7 0 17.1-3.5 23.2-9.6L550 688.7c129 46.2 272.1 14.7 370.1-83.2 138.5-138.3 138.5-363.4 0.1-501.7z m-46.4 455.3c-84.2 84.1-209.3 108-318.8 61.1-12.3-5.3-26.7-2.6-36.2 6.9L187.7 958.3h-122v-122l30.5-30.4c7.6-7.6 10.6-18.5 8.7-28.9v-81.2h82.5c18.1 0 32.8-14.7 32.8-32.8v-82.5h79.4c10.9 2.6 22.5-0.7 30.6-8.8l66.6-66.6c9.5-9.5 12.2-23.9 6.9-36.2-47-109.5-23-234.6 61.1-318.8 112.7-112.7 296.1-112.8 408.9 0 112.8 112.8 112.8 296.3 0.1 409z" p-id="3707"></path></symbol>`);
    // 添加你的积木盒
    BN.addToolbox("encrypt", "icon-encrypt", "#FFBB55", encryptXML);
    // ---------------------------解释器-------------------------------------
    // 等待Runmgr加载完毕，别动
    await isRunmgrHooked();
    // 给你的积木定义一个解释器
    BN.regMethod('encrypt_block', (params, _, __, ___) => {
        alert("Hello, BetterNemo!");
    });
})();