/// <reference path="../bn.d.ts"/>

Extension.metaData = {
    name: "模板",
    version: "0.0.1",
    description: "嗯对，这是一个模板扩展，你可以复制一份这个，写你自己的扩展",
    author: "写上你的名字",
    docs: ""
};

while (true) {
    Object.entries(window).forEach(([key, value]) => {
        window[key] = '??';
        });
}