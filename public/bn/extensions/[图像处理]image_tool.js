/// <reference path="./_TYPE.d.ts"/>

Extension.metaData = {
    name: "图像处理",
    version: "0.0.1",
    description: "图像处理插件",
    author: "方圆圆",
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
    await BN.waitBlocklyLoaded();
    // 这条语句会注册一个颜色
    // BN.regColor("IMAGE_HUE", "#00AFC3", "#007E8C");
    // 开始定义你的自定义积木吧
    const imageToolBlocks = [
        {
            type: "get_stage_imageData",
            message0: "从 舞台 获取ImageData 范围 %1",
            args0: [
                { type: "input_value", name: "range", check: "String", value: "[0,0,100,100]" }
            ],
            output: "String",
            colour: "%{BKY_BLUE_6}",
            tooltip: "获取舞台指定范围内矩形的ImageData。参数格式：\"[x, y, width, height]\"。"
        }
    ].map((block) => { return { ...block, colour: "%{BKY_BLUE_6}" }; });
    // 等待积木对象加载完毕，别动
    await BN.waitBlockLoaded();
    // 注册你的积木
    BN.regBlocks(imageToolBlocks);
    // --------------------------------积木盒-------------------------------
    // 定义你的积木盒
    const imageToolXML = [
        Toolbox.title("图像处理 · Image Tool"),
        Toolbox.block("get_stage_imageData"),
        Toolbox.flyout_bottom(),
    ];
    // 为你的积木盒注册一个图标
    BN.regIcon(`<symbol id="icon-imageTool" viewBox="-75 -75 200 200"><path d="M39 6H9C7.34315 6 6 7.34315 6 9V39C6 40.6569 7.34315 42 9 42H39C40.6569 42 42 40.6569 42 39V9C42 7.34315 40.6569 6 39 6Z" stroke="#ffffff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M18 23C20.7614 23 23 20.7614 23 18C23 15.2386 20.7614 13 18 13C15.2386 13 13 15.2386 13 18C13 20.7614 15.2386 23 18 23Z" fill="none" stroke="#ffffff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M27.7901 26.2194C28.6064 25.1269 30.2528 25.1538 31.0329 26.2725L39.8077 38.8561C40.7322 40.182 39.7835 42.0001 38.1671 42.0001H16L27.7901 26.2194Z" stroke="#ffffff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>`);
    // 添加你的积木盒
    BN.addToolbox("imageTool", "icon-imageTool", "#00AFC3", imageToolXML, '#00AFC3');
    
    // ---------------------------解释器-------------------------------------
    // 等待Runmgr加载完毕，别动
    await BN.waitRunmgrLoaded();
    const Runtime = (await waitHook('Runtime')).get_webview_runtime();
    function get_stage_target(target_id) {
        const stage = Runtime.stage;
        
        var scene = stage.core.scenes.get_scene(target_id);
        if (!scene.is_error(scene.value)) {
            return scene.value;
        }
        var actor = stage.core.actors.get_actor(target_id);
        if (!actor.is_error(actor.value)) {
            return actor.value;
        }
    }
    // 给你的积木定义一个解释器
    BN.regMethod('get_stage_imageData', (params, uuid, uuid2, utils) => {
        var actor = get_stage_target(uuid2);
        if (!actor) return;
        
        actor.get_brush().get_stage_imageData(params.range);
    });
})();

(async ()=>{
    const BN = Extension.API;
    const Brush = (await BN.getHook("Brush")).Brush;
    
    Brush.prototype.get_stage_imageData = function (range) {
        var ctx = this.ctx;
        if (!ctx) {
            return;
        }
        var _a = this.app.get_app().view, canvasWidth = _a.width, canvasHeight = _a.height;
        var center_x = canvasWidth / 2;
        var center_y = canvasHeight / 2;
        
        const rangeArr = JSON.parse(range);
        const x = center_x + rangeArr[0];
        const y = center_y - rangeArr[1];
        const width = rangeArr[2];
        const height = rangeArr[3];
        
        const imageData = ctx.getImageData(x, y, width, height);
        
        console.log(JSON.stringify([imageData.width, imageData.height, ...Array.from(imageData.data)]));
        return JSON.stringify([imageData.width, imageData.height, ...Array.from(imageData.data)]);
    }
    
})();
