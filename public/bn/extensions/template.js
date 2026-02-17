/// <reference path="../bn.d.ts"/>

Extension.metaData = {
    name: "模板",
    version: "0.0.1",
    description: "嗯对，这是一个模板扩展，你可以复制一份这个，写你自己的扩展",
    author: "写上你的名字",
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
    // 这条语句会注册一个颜色
    BN.regColor("TEMPLATE_HUE", "#ff9900", "#ff9900");
    // 开始定义你的自定义积木吧
    const templateBlocks = [
        {
            type: "template_block",
            message0: "这是模板里的一个自定义积木呀",
            args0: [],
            ...Block.methodBlock
        }
    ].map((block) => { return { ...block, colour: "%{BKY_TEMPLATE_HUE}" }; });
    // 注册你的积木
    BN.regBlocks(templateBlocks);
    // --------------------------------积木盒-------------------------------
    // 等待积木对象加载完毕，别动
    await (async () => {
        while (window['blockObjects'] == [])
            await new Promise((resolve) => requestAnimationFrame(resolve));
        return;
    })();
    // 定义你的积木盒
    const templateXML = [
        Toolbox.title("模板 · Template"),
        Toolbox.block("template_block"),
        Toolbox.flyout_bottom(),
    ];
    // 为你的积木盒注册一个图标
    BN.regIcon(`<symbol id="icon-template" viewBox="-1030 -960 2500 2500"><path d="M224 0c35.3 0 64 21.5 64 48 0 10.4-4.4 20-12 27.9-6.6 6.9-12 15.3-12 24.9 0 15 12.2 27.2 27.2 27.2l44.8 0c26.5 0 48 21.5 48 48l0 44.8c0 15 12.2 27.2 27.2 27.2 9.5 0 18-5.4 24.9-12 7.9-7.5 17.5-12 27.9-12 26.5 0 48 28.7 48 64s-21.5 64-48 64c-10.4 0-20.1-4.4-27.9-12-6.9-6.6-15.3-12-24.9-12-15 0-27.2 12.2-27.2 27.2L384 464c0 26.5-21.5 48-48 48l-56.8 0c-12.8 0-23.2-10.4-23.2-23.2 0-9.2 5.8-17.3 13.2-22.8 11.6-8.7 18.8-20.7 18.8-34 0-26.5-28.7-48-64-48s-64 21.5-64 48c0 13.3 7.2 25.3 18.8 34 7.4 5.5 13.2 13.5 13.2 22.8 0 12.8-10.4 23.2-23.2 23.2L48 512c-26.5 0-48-21.5-48-48L0 343.2c0-12.8 10.4-23.2 23.2-23.2 9.2 0 17.3 5.8 22.8 13.2 8.7 11.6 20.7 18.8 34 18.8 26.5 0 48-28.7 48-64s-21.5-64-48-64c-13.3 0-25.3 7.2-34 18.8-5.5 7.4-13.5 13.2-22.8 13.2-12.8 0-23.2-10.4-23.2-23.2L0 176c0-26.5 21.5-48 48-48l108.8 0c15 0 27.2-12.2 27.2-27.2 0-9.5-5.4-18-12-24.9-7.5-7.9-12-17.5-12-27.9 0-26.5 28.7-48 64-48z"></path></symbol>`);
    // 添加你的积木盒
    BN.addToolbox("template", "icon-template", "#ff9900", templateXML);
    // ---------------------------解释器-------------------------------------
    // 等待Runmgr加载完毕，别动
    await isRunmgrHooked();
    // 给你的积木定义一个解释器
    BN.regMethod('template_block', (params, _, __, ___) => {
        alert("Hello, BetterNemo!");
    });
})();