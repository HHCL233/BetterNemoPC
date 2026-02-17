/// <reference path="./_TYPE.d.ts"/>

Extension.metaData = {
    name: "ottama",
    version: "0.0.1",
    description: "与OpenAI兼容的AI模型聊天",
    author: "cika",
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
    BN.regColor("OTTAMA_HUE", "#10B981", "#059669");
    
    // 定义AI事件图标字段
    const aiEventIconField = {
        type: "field_icon",
        is_head: true,
        src: "data:image/svg+xml;charset=utf-8;base64,PHN2ZyB3aWR0aD0iMjMuOTk5OTk5OTk5OTk5OTk2IiBoZWlnaHQ9IjIzLjk5OTk5OTk5OTk5OTk5NiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBmaWxsPSIjMDAwMDAwIj4KIDxnPgogIDx0aXRsZT5MYXllciAxPC90aXRsZT4KICA8cGF0aCBmaWxsPSIjZmZmZmZmIiBpZD0ic3ZnXzEiIGQ9Im0xMiwyYy01LjUyLDAgLTEwLDQuNDggLTEwLDEwczQuNDgsMTAgMTAsMTBzMTAsLTQuNDggMTAsLTEwcy00LjQ4LC0xMCAtMTAsLTEwem0tMiwxNWwtNSwtNWwxLjQxLC0xLjQxbDMuNTksMy41OGw3LjU5LC03LjU5bDEuNDEsMS40MmwtOSw5eiIvPgogPC9nPgoKPC9zdmc+",
        width: 38,
        height: 38,
        alt: "*",
    };
    
    const ottamaBlocks = [
        {
            type: "ottama_set_apikey",
            message0: "设置API密钥 %1",
            args0: [
                {
                    type: "input_value",
                    name: "apikey",
                    check: "String",
                    value: "",
                },
            ],
            ...Block.methodBlock,
        },
        {
            type: "ottama_send_simple",
            message0: "发送消息 %1 API地址 %2 模型ID %3 消息内容 %4",
            args0: [
                { type: "input_dummy" },
                {
                    type: "input_value",
                    name: "api_url",
                    check: "String",
                    value: "https://api.deepseek.com/chat/completions",
                },
                {
                    type: "input_value",
                    name: "model",
                    check: "String",
                    value: "deepseek-chat",
                },
                {
                    type: "input_value",
                    name: "message",
                    check: "String",
                    value: "你好",
                },
            ],
            ...Block.methodBlock,
            inputsInline: false,
        },
        {
            type: "ottama_send_advanced",
            message0: "发送消息 %1 API地址 %2 模型ID %3 消息内容 %4 温度 %5 最大令牌数 %6 上下文 %7 top_p %8",
            args0: [
                { type: "input_dummy" },
                {
                    type: "input_value",
                    name: "api_url",
                    check: "String",
                    value: "https://api.deepseek.com/chat/completions",
                },
                {
                    type: "input_value",
                    name: "model",
                    check: "String",
                    value: "deepseek-chat",
                },
                {
                    type: "input_value",
                    name: "message",
                    check: "String",
                    value: "你好",
                },
                {
                    type: "input_value",
                    name: "temperature",
                    check: "Number",
                    value: 0.7,
                },
                {
                    type: "input_value",
                    name: "max_tokens",
                    check: "Number",
                    value: 2048,
                },
                {
                    type: "input_value",
                    name: "context",
                    check: "String",
                    value: "[]",
                },
                {
                    type: "input_value",
                    name: "top_p",
                    check: "Number",
                    value: 1.0,
                },
            ],
            ...Block.methodBlock,
            inputsInline: false,
        },
        {
            type: "ottama_on_response",
            message0: "%1 当 AI回复 %2",
            args0: [
                aiEventIconField,
                { type: "input_value", name: "param", check: "undefined" },
            ],
            ...Block.eventBlock,
        },
        {
            type: "ottama_on_response_json",
            text: "JSON",
            output: "String",
            EventParam: {
                eventBlockId: "ottama_on_response",
                colorId: "OTTAMA_HUE",
            },
        },
        {
            type: "ottama_on_error",
            message0: "%1 当 AI回复出错 %2",
            args0: [
                aiEventIconField,
                { type: "input_value", name: "param", check: "undefined" },
            ],
            ...Block.eventBlock,
        },
        {
            type: "ottama_on_error_json",
            text: "JSON",
            output: "String",
            EventParam: {
                eventBlockId: "ottama_on_error",
                colorId: "OTTAMA_HUE",
            },
        }
    ].map((block) => { return { ...block, colour: "%{BKY_OTTAMA_HUE}" }; });
    
    // 等待积木对象加载完毕，别动
    await BN.waitBlockLoaded();
    // 注册你的积木
    BN.regBlocks(ottamaBlocks);
    // --------------------------------积木盒-------------------------------
    // 定义你的积木盒
    const ottamaXML = [
        Toolbox.title("AI对话 · Ottama"),
        Toolbox.block("ottama_set_apikey"),
        Toolbox.block("ottama_send_simple"),
        Toolbox.block("ottama_send_advanced"),
        Toolbox.simpleEventBlock("ottama_on_response", [
            "param",
            "ottama_on_response_json",
        ]),
        Toolbox.simpleEventBlock("ottama_on_error", [
            "param",
            "ottama_on_error_json",
        ]),
        Toolbox.flyout_bottom(),
    ];
    // 为你的积木盒注册一个图标
    BN.regIcon(`<symbol id="icon-ottama" viewBox="-1200 -1230 3000 3000"><path d="M290.8 48.6l78.4 29.7L288 109.5 206.8 78.3l78.4-29.7c1.8-.7 3.8-.7 5.7 0zM136 92.5l0 112.2c-1.3 .4-2.6 .8-3.9 1.3l-96 36.4C14.4 250.6 0 271.5 0 294.7L0 413.9c0 22.2 13.1 42.3 33.5 51.3l96 42.2c14.4 6.3 30.7 6.3 45.1 0L288 457.5l113.5 49.9c14.4 6.3 30.7 6.3 45.1 0l96-42.2c20.3-8.9 33.5-29.1 33.5-51.3l0-119.1c0-23.3-14.4-44.1-36.1-52.4l-96-36.4c-1.3-.5-2.6-.9-3.9-1.3l0-112.2c0-23.3-14.4-44.1-36.1-52.4l-96-36.4c-12.8-4.8-26.9-4.8-39.7 0l-96 36.4C150.4 48.4 136 69.3 136 92.5zM392 210.6l-82.4 31.2 0-89.2L392 121l0 89.6zM154.8 250.9l78.4 29.7L152 311.7 70.8 280.6l78.4-29.7c1.8-.7 3.8-.7 5.7 0zm18.8 204.4l0-100.5L256 323.2l0 95.9-82.4 36.2zM421.2 250.9c1.8-.7 3.8-.7 5.7 0l78.4 29.7L424 311.7l-81.2-31.1 78.4-29.7zM523.2 421.2l-77.6 34.1 0-100.5L528 323.2l0 90.7c0 3.2-1.9 6-4.8 7.3z"></path></symbol>`);
    // 添加你的积木盒
    BN.addToolbox("ottama", "icon-ottama", "#059669", ottamaXML);
    // ---------------------------全局变量-------------------------------
    let globalApiKey = "";
    
    // 添加事件参数获取函数（从mqtt.js中复制）
    function getEventParams(utils) {
        if (!utils) return null;
        const eventParams = utils.getEventParams();
        if (!eventParams) return null;
        return eventParams;
    }
    
    // ---------------------------解释器-------------------------------------
    // 等待Runmgr加载完毕，别动
    await BN.waitRunmgrLoaded();
    
    // 注册简单事件
    BN.regSimpleEvent('ottama_on_response');
    BN.regSimpleEvent('ottama_on_error');
    
    // 设置API密钥
    BN.regMethod('ottama_set_apikey', (params, _, __, ___) => {
        globalApiKey = params.apikey;
    });
    
    // 简易版发送消息
    BN.regMethod('ottama_send_simple', async (params, _, __, ___) => {
        const apiUrl = params.api_url;
        const model = params.model;
        const message = params.message;
        
        if (!globalApiKey) {
            BN.emitSimpleEvent('ottama_on_error', { 
                json: JSON.stringify({ error: "API密钥未设置" }), 
                status: 401 
            });
            return;
        }
        
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${globalApiKey}`
                },
                body: JSON.stringify({
                    model: model,
                    messages: [{ role: "user", content: message }],
                    temperature: 0.7,
                    max_tokens: 2048
                })
            });
            
            const responseData = await response.json();
            
            if (response.ok) {
                const content = responseData.choices?.[0]?.message?.content || "";
                const usage = JSON.stringify(responseData.usage || {});
                BN.emitSimpleEvent('ottama_on_response', { 
                    content: content,
                    json: JSON.stringify(responseData),
                    usage: usage
                });
            } else {
                BN.emitSimpleEvent('ottama_on_error', { 
                    json: JSON.stringify(responseData),
                    status: response.status
                });
            }
        } catch (error) {
            BN.emitSimpleEvent('ottama_on_error', { 
                json: JSON.stringify({ error: error.message }),
                status: 0
            });
        }
    });
    
    // 复杂版发送消息
    BN.regMethod('ottama_send_advanced', async (params, _, __, ___) => {
        const apiUrl = params.api_url;
        const model = params.model;
        const message = params.message;
        const temperature = params.temperature;
        const maxTokens = params.max_tokens;
        const context = params.context;
        const topP = params.top_p;
        
        if (!globalApiKey) {
            BN.emitSimpleEvent('ottama_on_error', { 
                json: JSON.stringify({ error: "API密钥未设置" }), 
                status: 401 
            });
            return;
        }
        
        try {
            let messages = [];
            
            // 处理上下文
            if (context && typeof context === "string") {
                try {
                    messages = JSON.parse(context);
                } catch (e) {
                    BN.emitSimpleEvent('ottama_on_error', { 
                        json: JSON.stringify({ error: "上下文格式错误" }),
                        status: 400 
                    });
                    return;
                }
            }
            
            // 添加当前消息
            messages.push({ role: "user", content: message });
            
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${globalApiKey}`
                },
                body: JSON.stringify({
                    model: model,
                    messages: messages,
                    temperature: temperature,
                    max_tokens: maxTokens,
                    top_p: topP
                })
            });
            
            const responseData = await response.json();
            
            if (response.ok) {
                const content = responseData.choices?.[0]?.message?.content || "";
                const usage = JSON.stringify(responseData.usage || {});
                BN.emitSimpleEvent('ottama_on_response', { 
                    content: content,
                    json: JSON.stringify(responseData),
                    usage: usage
                });
            } else {
                BN.emitSimpleEvent('ottama_on_error', { 
                    json: JSON.stringify(responseData),
                    status: response.status
                });
            }
        } catch (error) {
            BN.emitSimpleEvent('ottama_on_error', { 
                json: JSON.stringify({ error: error.message }),
                status: 0
            });
        }
    });
    
    // 事件参数获取方法
    BN.regMethod('ottama_on_response_content', (_, __, ___, utils) => {
        const params = getEventParams(utils);
        if (params) return params.content;
        return "ERROR_NOT_IN_ACTION";
    });
    
    BN.regMethod('ottama_on_response_json', (_, __, ___, utils) => {
        const params = getEventParams(utils);
        if (params) return params.json;
        return "ERROR_NOT_IN_ACTION";
    });
    
    BN.regMethod('ottama_on_response_usage', (_, __, ___, utils) => {
        const params = getEventParams(utils);
        if (params) return params.usage;
        return "ERROR_NOT_IN_ACTION";
    });
    
    BN.regMethod('ottama_on_error_json', (_, __, ___, utils) => {
        const params = getEventParams(utils);
        if (params) return params.json;
        return "ERROR_NOT_IN_ACTION";
    });
    
    BN.regMethod('ottama_on_error_status', (_, __, ___, utils) => {
        const params = getEventParams(utils);
        if (params) return params.status;
        return -1;
    });
})();