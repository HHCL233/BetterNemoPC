<template>
    <div class="iframe-container">
        <mdui-navigation-rail contained divider value="workspace">
            <mdui-button-icon icon="arrow_back" slot="top"></mdui-button-icon>
            <mdui-navigation-rail-item icon="edit" value="workspace"
                @click="changeTheatre(false)"></mdui-navigation-rail-item>
            <mdui-navigation-rail-item icon="face_6" value="actor"
                @click="changeTheatre(true)"></mdui-navigation-rail-item>
            <mdui-button-icon icon="play_arrow" slot="bottom" variant="outlined"
                @click="setRunState(!runState)"></mdui-button-icon>
        </mdui-navigation-rail>
        <mdui-card class="actor-select" v-if="theatreShow">
            <mdui-list class="actor-list">
                <mdui-list class="actor-list">
                    <mdui-list-item :active="(item.id == currentActor)" v-for="(item, index) in actorList">
                        {{ item?.name ?? '我不知道' }}
                        <mdui-avatar slot="icon">?</mdui-avatar>
                        <span slot="description">{{ `(${item?.x},${item?.y})` }}</span>
                    </mdui-list-item>
                </mdui-list>
            </mdui-list>
        </mdui-card>
        <div class="nemo">
            <iframe ref="iframeRef" :src="iframeSrc" width="100%" height="100%" frameborder="0" id="bn-iframe"></iframe>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { BNWorkspaceBridge } from '../../utils/bnWorkspaceBridge'

// 组件状态
const iframeSrc = ref('')
const iframeRef = ref(null)
const theatreShow = ref(false)
const runState = ref(false)
let bridgeInstance = null
const actorList = ref([])
const currentActor = ref('')
const bcmJson = {
    "actors": {
        "actors_dict": {
            "619fd636-5c60-4be7-82ed-95c180d34585": {
                "blocksXML": "",
                "current_style_id": "4b1459ee-0d00-4055-b6dc-673dd01cd26a",
                "hidden_in_edit": false,
                "id": "619fd636-5c60-4be7-82ed-95c180d34585",
                "locked": false,
                "name": "编程猫跳跳",
                "rotation": 0.0,
                "scale": 100.0,
                "scene_id": "700824a5-44a8-4d03-a7e8-aa95d87e9b2a",
                "styles": [
                    "4b1459ee-0d00-4055-b6dc-673dd01cd26a",
                    "edd7984c-7a4e-47d7-a88d-7dca54079dd3",
                    "7eb43fb3-f1a0-4fcc-b4eb-417266896b28",
                    "b964efd2-7835-4000-a3b0-15f4ca776732",
                    "02bd7cb1-eb43-4b27-a14e-753b2e74de84"
                ],
                "visible": true,
                "x": -46.0,
                "y": 66.0
            },
            "62ec85d1-6e32-4bb4-bafe-4edbe940a312": {
                "blocksXML": "\u003cblock type\u003d\"start_on_click\" id\u003d\"GGMGdukqj2byZ4XbfVVb\" visible\u003d\"visible\" inline\u003d\"true\" x\u003d\"107\" y\u003d\"89\"\u003e\u003cnext\u003e\u003cblock type\u003d\"variables_set\" id\u003d\"DP1S0qoOnx7aqfwlrwNv\" visible\u003d\"visible\" inline\u003d\"true\"\u003e\u003cfield name\u003d\"VAR\"\u003e01c9635d-7867-44c8-b8fd-36ee6766f9c8\u003c/field\u003e\u003cvalue name\u003d\"VALUE\"\u003e\u003cshadow xmlns\u003d\"\" type\u003d\"math_number\" id\u003d\"cyuXn9kw3sDUD678II3W\" visible\u003d\"visible\"\u003e\u003cfield constraints\u003d\"-Infinity,Infinity,0,\" allow_text\u003d\"true\" name\u003d\"NUM\"\u003e0\u003c/field\u003e\u003c/shadow\u003e\u003cblock type\u003d\"get_stage_imageData\" id\u003d\"eJyy0Gaq19pH1mOYhuYa\" visible\u003d\"visible\"\u003e\u003cvalue name\u003d\"range\"\u003e\u003cshadow type\u003d\"text\" id\u003d\"L287nidvppXq1qhmKpay\" visible\u003d\"visible\"\u003e\u003cfield name\u003d\"TEXT\"\u003e[0,0,100,100]\u003c/field\u003e\u003c/shadow\u003e\u003c/value\u003e\u003c/block\u003e\u003c/value\u003e\u003cnext last_next_in_stack\u003d\"true\"\u003e\u003c/next\u003e\u003c/block\u003e\u003c/next\u003e\u003c/block\u003e",
                "current_style_id": "81b2eaeb-af4c-422b-861b-613fba8881dc",
                "hidden_in_edit": false,
                "id": "62ec85d1-6e32-4bb4-bafe-4edbe940a312",
                "locked": false,
                "name": "编程猫跳跳1",
                "rotation": 0.0,
                "scale": 100.0,
                "scene_id": "700824a5-44a8-4d03-a7e8-aa95d87e9b2a",
                "styles": [
                    "81b2eaeb-af4c-422b-861b-613fba8881dc",
                    "67e6a6b8-65ec-4fe6-9379-ceeecd00a587",
                    "da594577-5566-4614-bbae-b5485cc18150",
                    "243071b0-2493-4dcf-a860-ccf22b4c29f4",
                    "bbc8e3a9-abb0-4ef8-8a3b-69f44b67b888"
                ],
                "visible": true,
                "x": 90.0,
                "y": -195.0
            }
        },
        "current_actor": "62ec85d1-6e32-4bb4-bafe-4edbe940a312"
    },
    "app_version": "2.3.0",
    "audios": {
        "sounds": {}
    },
    "block_count": {
        "all_block_count": 24,
        "visible_block_count": 24
    },
    "broadcast": {
        "broadcast_dict": {}
    },
    "procedures": {
        "procedure_dict": {}
    },
    "project_name": "新的作品",
    "scenes": {
        "current_scene": "700824a5-44a8-4d03-a7e8-aa95d87e9b2a",
        "scenes_dict": {
            "700824a5-44a8-4d03-a7e8-aa95d87e9b2a": {
                "actors": [
                    "619fd636-5c60-4be7-82ed-95c180d34585",
                    "62ec85d1-6e32-4bb4-bafe-4edbe940a312"
                ],
                "blocksXML": "\u003cblock type\u003d\"start_on_click\" id\u003d\"hyuMAR5J3tKMqoJ6krLV\" visible\u003d\"visible\" inline\u003d\"true\" x\u003d\"119\" y\u003d\"-1\"\u003e\u003cnext last_next_in_stack\u003d\"true\"\u003e\u003c/next\u003e\u003c/block\u003e\u003cblock type\u003d\"bn_mqtt_connect\" id\u003d\"x9bCMD5bAiu3e1H8N7xu\" visible\u003d\"visible\" inline\u003d\"false\" x\u003d\"213\" y\u003d\"103\"\u003e\u003cvalue name\u003d\"address\"\u003e\u003cshadow type\u003d\"text\" id\u003d\"q9XXUIo1HLzQkAG7DXra\" visible\u003d\"visible\"\u003e\u003cfield name\u003d\"TEXT\"\u003ewss://bemfa.com:9504/wss\u003c/field\u003e\u003c/shadow\u003e\u003c/value\u003e\u003cvalue name\u003d\"clientID\"\u003e\u003cshadow type\u003d\"text\" id\u003d\"6364luNG1u2lfzLqKRtK\" visible\u003d\"visible\"\u003e\u003cfield name\u003d\"TEXT\"\u003e38c3a1b0634b4ad5ba39330d82ef002b\u003c/field\u003e\u003c/shadow\u003e\u003c/value\u003e\u003cvalue name\u003d\"user\"\u003e\u003cshadow type\u003d\"text\" id\u003d\"qL2MIiMjEk6RfHJ2dRaT\" visible\u003d\"visible\"\u003e\u003cfield name\u003d\"TEXT\"\u003e\u003c/field\u003e\u003c/shadow\u003e\u003c/value\u003e\u003cvalue name\u003d\"password\"\u003e\u003cshadow type\u003d\"text\" id\u003d\"SJEWjFhYg8I1KdXR1byv\" visible\u003d\"visible\"\u003e\u003cfield name\u003d\"TEXT\"\u003e\u003c/field\u003e\u003c/shadow\u003e\u003c/value\u003e\u003cvalue name\u003d\"reconnectPeriod\"\u003e\u003cshadow type\u003d\"math_number\" id\u003d\"1Y49zvqgfIFJXiun4hV7\" visible\u003d\"visible\"\u003e\u003cfield constraints\u003d\"-Infinity,Infinity,0,\" name\u003d\"NUM\"\u003e2000\u003c/field\u003e\u003c/shadow\u003e\u003c/value\u003e\u003cvalue name\u003d\"connectTimeout\"\u003e\u003cshadow type\u003d\"math_number\" id\u003d\"65LmrNqQeU9fyJpfEqbs\" visible\u003d\"visible\"\u003e\u003cfield constraints\u003d\"-Infinity,Infinity,0,\" name\u003d\"NUM\"\u003e10000\u003c/field\u003e\u003c/shadow\u003e\u003c/value\u003e\u003cnext last_next_in_stack\u003d\"true\"\u003e\u003c/next\u003e\u003c/block\u003e\u003cblock type\u003d\"bn_mqtt_on_disconnect\" id\u003d\"56LeDLbwyHVq9chBm23n\" visible\u003d\"visible\" inline\u003d\"true\" x\u003d\"114\" y\u003d\"363\"\u003e\u003cnext\u003e\u003cblock type\u003d\"show_stage_dialog\" id\u003d\"MbMgrPfKkcZFRvqJXzNo\" visible\u003d\"visible\" inline\u003d\"true\"\u003e\u003cfield name\u003d\"sprite\"\u003e__self\u003c/field\u003e\u003cvalue name\u003d\"text\"\u003e\u003cshadow type\u003d\"text\" id\u003d\"S92WPj6EWkdVM3qZxdx7\" visible\u003d\"visible\"\u003e\u003cfield name\u003d\"TEXT\"\u003edis\u003c/field\u003e\u003c/shadow\u003e\u003c/value\u003e\u003cnext last_next_in_stack\u003d\"true\"\u003e\u003c/next\u003e\u003c/block\u003e\u003c/next\u003e\u003c/block\u003e\u003cblock type\u003d\"bn_mqtt_on_error\" id\u003d\"G33h3LTmJ2rXb2xz75zF\" visible\u003d\"visible\" inline\u003d\"true\" x\u003d\"162\" y\u003d\"447\"\u003e\u003cvalue name\u003d\"param\"\u003e\u003cblock type\u003d\"__bn_mqtt_on_error_message\" id\u003d\"7pS0458Wes8VsTkv7139\" visible\u003d\"visible\" inline\u003d\"true\"\u003e\u003cfield name\u003d\"TEXT\"\u003e错误信息\u003c/field\u003e\u003c/block\u003e\u003c/value\u003e\u003cnext\u003e\u003cblock type\u003d\"show_stage_dialog\" id\u003d\"D8GOFSKoOuECADfkyWrh\" visible\u003d\"visible\" inline\u003d\"true\"\u003e\u003cfield name\u003d\"sprite\"\u003e__self\u003c/field\u003e\u003cvalue name\u003d\"text\"\u003e\u003cshadow xmlns\u003d\"\" type\u003d\"text\" id\u003d\"jMG2Vp1WcNkTpbNx4VdP\" visible\u003d\"visible\"\u003e\u003cfield name\u003d\"TEXT\"\u003eHi\u003c/field\u003e\u003c/shadow\u003e\u003cblock type\u003d\"bn_mqtt_on_error_message\" id\u003d\"uzGWxs2tHmNItppojrAK\" visible\u003d\"visible\"\u003e\u003c/block\u003e\u003c/value\u003e\u003cnext last_next_in_stack\u003d\"true\"\u003e\u003c/next\u003e\u003c/block\u003e\u003c/next\u003e\u003c/block\u003e\u003cblock type\u003d\"bn_mqtt_on_reconnect\" id\u003d\"cQZ55pCzJBJMs7VA4lzZ\" visible\u003d\"visible\" inline\u003d\"true\" x\u003d\"133\" y\u003d\"556\"\u003e\u003cnext\u003e\u003cblock type\u003d\"show_stage_dialog\" id\u003d\"0eJpYQmTlYQrPLo7m3R9\" visible\u003d\"visible\" inline\u003d\"true\"\u003e\u003cfield name\u003d\"sprite\"\u003e__self\u003c/field\u003e\u003cvalue name\u003d\"text\"\u003e\u003cshadow type\u003d\"text\" id\u003d\"1sF87LUJtZOHVsKU5DoJ\" visible\u003d\"visible\"\u003e\u003cfield name\u003d\"TEXT\"\u003ere\u003c/field\u003e\u003c/shadow\u003e\u003c/value\u003e\u003cnext last_next_in_stack\u003d\"true\"\u003e\u003c/next\u003e\u003c/block\u003e\u003c/next\u003e\u003c/block\u003e\u003cblock type\u003d\"bn_mqtt_on_message\" id\u003d\"LXVhTK3nAoVXsJ37xMgy\" visible\u003d\"visible\" inline\u003d\"true\" x\u003d\"410\" y\u003d\"622\"\u003e\u003cvalue name\u003d\"param\"\u003e\u003cblock type\u003d\"__bn_mqtt_on_message_message\" id\u003d\"APjWQ9WOhT3cqykfCX5u\" visible\u003d\"visible\" inline\u003d\"true\"\u003e\u003cfield name\u003d\"TEXT\"\u003e消息\u003c/field\u003e\u003c/block\u003e\u003c/value\u003e\u003cnext\u003e\u003cblock type\u003d\"show_stage_dialog\" id\u003d\"r01XJeJ8DjPP9ddEu9TH\" visible\u003d\"visible\" inline\u003d\"true\"\u003e\u003cfield name\u003d\"sprite\"\u003e__self\u003c/field\u003e\u003cvalue name\u003d\"text\"\u003e\u003cshadow xmlns\u003d\"\" type\u003d\"text\" id\u003d\"tysbK6LibeSRh0Hk6PTA\" visible\u003d\"visible\"\u003e\u003cfield name\u003d\"TEXT\"\u003ere\u003c/field\u003e\u003c/shadow\u003e\u003cblock type\u003d\"bn_mqtt_on_message_message\" id\u003d\"clJJHSLQtPllpgzj5gy9\" visible\u003d\"visible\"\u003e\u003c/block\u003e\u003c/value\u003e\u003cnext last_next_in_stack\u003d\"true\"\u003e\u003c/next\u003e\u003c/block\u003e\u003c/next\u003e\u003c/block\u003e\u003cblock type\u003d\"bn_mqtt_on_connect\" id\u003d\"2Zb1L5Lqt72VvXwDtwnp\" visible\u003d\"visible\" inline\u003d\"true\" x\u003d\"113\" y\u003d\"670\"\u003e\u003cnext\u003e\u003cblock type\u003d\"bn_mqtt_subscribe\" id\u003d\"yY5ErC2B4LTuCUpud1ZB\" visible\u003d\"visible\" inline\u003d\"true\"\u003e\u003cvalue name\u003d\"topic\"\u003e\u003cshadow type\u003d\"text\" id\u003d\"Ofm1wYAmk8lzU1e2tIbK\" visible\u003d\"visible\"\u003e\u003cfield name\u003d\"TEXT\"\u003enemo002\u003c/field\u003e\u003c/shadow\u003e\u003c/value\u003e\u003cnext\u003e\u003cblock type\u003d\"show_stage_dialog\" id\u003d\"P53bwJbEYWkSrAXQJRkP\" visible\u003d\"visible\" inline\u003d\"true\"\u003e\u003cfield name\u003d\"sprite\"\u003e__self\u003c/field\u003e\u003cvalue name\u003d\"text\"\u003e\u003cshadow type\u003d\"text\" id\u003d\"mBi2sKVuaJa6clA48m4m\" visible\u003d\"visible\"\u003e\u003cfield name\u003d\"TEXT\"\u003eok\u003c/field\u003e\u003c/shadow\u003e\u003c/value\u003e\u003cnext last_next_in_stack\u003d\"true\"\u003e\u003c/next\u003e\u003c/block\u003e\u003c/next\u003e\u003c/block\u003e\u003c/next\u003e\u003c/block\u003e\u003cblock type\u003d\"bn_mqtt_on_publish_error\" id\u003d\"diTKgSIgmYj9mc3jzjTZ\" visible\u003d\"visible\" inline\u003d\"true\" x\u003d\"141\" y\u003d\"824\"\u003e\u003cvalue name\u003d\"param\"\u003e\u003cblock type\u003d\"__bn_mqtt_on_publish_error_message\" id\u003d\"ST2B5n3R5c8rrXbOxAv1\" visible\u003d\"visible\" inline\u003d\"true\"\u003e\u003cfield name\u003d\"TEXT\"\u003e错误信息\u003c/field\u003e\u003c/block\u003e\u003c/value\u003e\u003cnext\u003e\u003cblock type\u003d\"show_stage_dialog\" id\u003d\"z5CRX1NgxN5LwlEOnhDX\" visible\u003d\"visible\" inline\u003d\"true\"\u003e\u003cfield name\u003d\"sprite\"\u003e__self\u003c/field\u003e\u003cvalue name\u003d\"text\"\u003e\u003cshadow xmlns\u003d\"\" type\u003d\"text\" id\u003d\"xAJPhxqUwPVQJljZymDs\" visible\u003d\"visible\"\u003e\u003cfield name\u003d\"TEXT\"\u003eok\u003c/field\u003e\u003c/shadow\u003e\u003cblock type\u003d\"bn_mqtt_on_publish_error_message\" id\u003d\"Rot9Pnu08Vts7JUhEFUV\" visible\u003d\"visible\"\u003e\u003c/block\u003e\u003c/value\u003e\u003cnext last_next_in_stack\u003d\"true\"\u003e\u003c/next\u003e\u003c/block\u003e\u003c/next\u003e\u003c/block\u003e",
                "current_style_id": "623b814d-52e2-4971-8dca-7586d2a385c2",
                "id": "700824a5-44a8-4d03-a7e8-aa95d87e9b2a",
                "name": "背景",
                "styles": [
                    "623b814d-52e2-4971-8dca-7586d2a385c2"
                ],
                "visible": true
            }
        },
        "scenes_order": [
            "700824a5-44a8-4d03-a7e8-aa95d87e9b2a"
        ]
    },
    "split_options": {
        "options_dict": {
            "_split_comma": {
                "id": "_split_comma",
                "name": ","
            },
            "_split_space": {
                "id": "_split_space",
                "name": "空格"
            },
            "_split_minus": {
                "id": "_split_minus",
                "name": "-"
            }
        }
    },
    "stage_size": {
        "height": 900.0,
        "width": 562.0
    },
    "styles": {
        "styles_dict": {
            "623b814d-52e2-4971-8dca-7586d2a385c2": {
                "id": "623b814d-52e2-4971-8dca-7586d2a385c2",
                "name": "背景",
                "path": "https://static.codemao.cn/whale/HJf_PdGnxe",
                "texture": "https://static.codemao.cn/whale/HJf_PdGnxe"
            },
            "4b1459ee-0d00-4055-b6dc-673dd01cd26a": {
                "center_point": {
                    "x": 0.0,
                    "y": 0.0
                },
                "id": "4b1459ee-0d00-4055-b6dc-673dd01cd26a",
                "name": "编程猫跳跳",
                "path": "https://ts2.tc.mm.bing.net/th/id/ODF.kFZMuUgcIUEruLbCQ4WIaw?w=32&h=32&qlt=90&pcl=fffffc&o=6&cb=defcache1&pid=1.2&defcache=1",
                "texture": "https://ts2.tc.mm.bing.net/th/id/ODF.kFZMuUgcIUEruLbCQ4WIaw?w=32&h=32&qlt=90&pcl=fffffc&o=6&cb=defcache1&pid=1.2&defcache=1"
            },
            "edd7984c-7a4e-47d7-a88d-7dca54079dd3": {
                "center_point": {
                    "x": 0.0,
                    "y": 0.0
                },
                "id": "edd7984c-7a4e-47d7-a88d-7dca54079dd3",
                "name": "编程猫跳跳",
                "path": "https://ts2.tc.mm.bing.net/th/id/ODF.kFZMuUgcIUEruLbCQ4WIaw?w=32&h=32&qlt=90&pcl=fffffc&o=6&cb=defcache1&pid=1.2&defcache=1",
                "texture": "https://ts2.tc.mm.bing.net/th/id/ODF.kFZMuUgcIUEruLbCQ4WIaw?w=32&h=32&qlt=90&pcl=fffffc&o=6&cb=defcache1&pid=1.2&defcache=1"
            },
            "7eb43fb3-f1a0-4fcc-b4eb-417266896b28": {
                "center_point": {
                    "x": 0.0,
                    "y": 0.0
                },
                "id": "7eb43fb3-f1a0-4fcc-b4eb-417266896b28",
                "name": "编程猫跳跳",
                "path": "https://ts2.tc.mm.bing.net/th/id/ODF.kFZMuUgcIUEruLbCQ4WIaw?w=32&h=32&qlt=90&pcl=fffffc&o=6&cb=defcache1&pid=1.2&defcache=1",
                "texture": "https://ts2.tc.mm.bing.net/th/id/ODF.kFZMuUgcIUEruLbCQ4WIaw?w=32&h=32&qlt=90&pcl=fffffc&o=6&cb=defcache1&pid=1.2&defcache=1"
            },
            "b964efd2-7835-4000-a3b0-15f4ca776732": {
                "center_point": {
                    "x": 0.0,
                    "y": 0.0
                },
                "id": "b964efd2-7835-4000-a3b0-15f4ca776732",
                "name": "编程猫跳跳",
                "path": "https://ts2.tc.mm.bing.net/th/id/ODF.kFZMuUgcIUEruLbCQ4WIaw?w=32&h=32&qlt=90&pcl=fffffc&o=6&cb=defcache1&pid=1.2&defcache=1g",
                "texture": "https://ts2.tc.mm.bing.net/th/id/ODF.kFZMuUgcIUEruLbCQ4WIaw?w=32&h=32&qlt=90&pcl=fffffc&o=6&cb=defcache1&pid=1.2&defcache=1"
            },
            "02bd7cb1-eb43-4b27-a14e-753b2e74de84": {
                "center_point": {
                    "x": 0.0,
                    "y": 0.0
                },
                "id": "02bd7cb1-eb43-4b27-a14e-753b2e74de84",
                "name": "编程猫跳跳",
                "path": "https://ts2.tc.mm.bing.net/th/id/ODF.kFZMuUgcIUEruLbCQ4WIaw?w=32&h=32&qlt=90&pcl=fffffc&o=6&cb=defcache1&pid=1.2&defcache=1",
                "texture": "https://ts2.tc.mm.bing.net/th/id/ODF.kFZMuUgcIUEruLbCQ4WIaw?w=32&h=32&qlt=90&pcl=fffffc&o=6&cb=defcache1&pid=1.2&defcache=1"
            },
            "81b2eaeb-af4c-422b-861b-613fba8881dc": {
                "center_point": {
                    "x": 0.0,
                    "y": 0.0
                },
                "id": "81b2eaeb-af4c-422b-861b-613fba8881dc",
                "name": "编程猫跳跳",
                "path": "https://ts2.tc.mm.bing.net/th/id/ODF.kFZMuUgcIUEruLbCQ4WIaw?w=32&h=32&qlt=90&pcl=fffffc&o=6&cb=defcache1&pid=1.2&defcache=1",
                "texture": "https://ts2.tc.mm.bing.net/th/id/ODF.kFZMuUgcIUEruLbCQ4WIaw?w=32&h=32&qlt=90&pcl=fffffc&o=6&cb=defcache1&pid=1.2&defcache=1"
            },
            "67e6a6b8-65ec-4fe6-9379-ceeecd00a587": {
                "center_point": {
                    "x": 0.0,
                    "y": 0.0
                },
                "id": "67e6a6b8-65ec-4fe6-9379-ceeecd00a587",
                "name": "编程猫跳跳",
                "path": "https://ts2.tc.mm.bing.net/th/id/ODF.kFZMuUgcIUEruLbCQ4WIaw?w=32&h=32&qlt=90&pcl=fffffc&o=6&cb=defcache1&pid=1.2&defcache=1",
                "texture": "https://ts2.tc.mm.bing.net/th/id/ODF.kFZMuUgcIUEruLbCQ4WIaw?w=32&h=32&qlt=90&pcl=fffffc&o=6&cb=defcache1&pid=1.2&defcache=1"
            },
            "da594577-5566-4614-bbae-b5485cc18150": {
                "center_point": {
                    "x": 0.0,
                    "y": 0.0
                },
                "id": "da594577-5566-4614-bbae-b5485cc18150",
                "name": "编程猫跳跳",
                "path": "https://ts2.tc.mm.bing.net/th/id/ODF.kFZMuUgcIUEruLbCQ4WIaw?w=32&h=32&qlt=90&pcl=fffffc&o=6&cb=defcache1&pid=1.2&defcache=1",
                "texture": "https://ts2.tc.mm.bing.net/th/id/ODF.kFZMuUgcIUEruLbCQ4WIaw?w=32&h=32&qlt=90&pcl=fffffc&o=6&cb=defcache1&pid=1.2&defcache=1"
            },
            "243071b0-2493-4dcf-a860-ccf22b4c29f4": {
                "center_point": {
                    "x": 0.0,
                    "y": 0.0
                },
                "id": "243071b0-2493-4dcf-a860-ccf22b4c29f4",
                "name": "编程猫跳跳",
                "path": "https://ts2.tc.mm.bing.net/th/id/ODF.kFZMuUgcIUEruLbCQ4WIaw?w=32&h=32&qlt=90&pcl=fffffc&o=6&cb=defcache1&pid=1.2&defcache=1",
                "texture": "https://ts2.tc.mm.bing.net/th/id/ODF.kFZMuUgcIUEruLbCQ4WIaw?w=32&h=32&qlt=90&pcl=fffffc&o=6&cb=defcache1&pid=1.2&defcache=1"
            },
            "bbc8e3a9-abb0-4ef8-8a3b-69f44b67b888": {
                "center_point": {
                    "x": 0.0,
                    "y": 0.0
                },
                "id": "bbc8e3a9-abb0-4ef8-8a3b-69f44b67b888",
                "name": "编程猫跳跳",
                "path": "https://ts2.tc.mm.bing.net/th/id/ODF.kFZMuUgcIUEruLbCQ4WIaw?w=32&h=32&qlt=90&pcl=fffffc&o=6&cb=defcache1&pid=1.2&defcache=1",
                "texture": "https://ts2.tc.mm.bing.net/th/id/ODF.kFZMuUgcIUEruLbCQ4WIaw?w=32&h=32&qlt=90&pcl=fffffc&o=6&cb=defcache1&pid=1.2&defcache=1"
            }
        }
    },
    "toolbox": {
        "devices": [
            "microbit"
        ]
    },
    "variable": {
        "variable_dict": {
            "01c9635d-7867-44c8-b8fd-36ee6766f9c8": {
                "create_time": 1770906184,
                "id": "01c9635d-7867-44c8-b8fd-36ee6766f9c8",
                "is_global": true,
                "name": "wow",
                "offset": {
                    "x": 0.0,
                    "y": 0.0
                },
                "position": {
                    "x": -271.0,
                    "y": 442.0
                },
                "scale": 1.0,
                "theme": "common",
                "type": "any",
                "value": 0.0,
                "valueForDebug": [
                    "0"
                ],
                "visible": true
            }
        }
    }
}

// UI交互相关方法
function changeTheatre(show) {
    bridgeInstance?.sendNativeMessage('SET_THEATRE_VISIBLE', show);
    theatreShow.value = show;
}

function setRunState(show) {
    bridgeInstance?.sendNativeMessage('SET_RUN_STATE', show);
    runState.value = show;
}

onMounted(async () => {
    try {
        if (import.meta.env.DEV) {
            iframeSrc.value = '/bn/workspace.html'
        } else {
            iframeSrc.value = await window.electronAPI.getIframeSrc('bn/workspace.html')
        }

        // 初始化bridge实例
        bridgeInstance = new BNWorkspaceBridge(iframeRef)
        bridgeInstance.registerListener()

        // 解析bcmJson
        Object.entries(bcmJson.actors.actors_dict).forEach(([key, value]) => {
            actorList.value.push(value)
        });
        currentActor.value = bcmJson.actors.current_actor

        // iframe加载完成后初始化数据
        if (iframeRef.value) {
            iframeRef.value.onload = () => {
                console.log('BN iframe 加载完成')
                bridgeInstance.initWebviewData()
                bridgeInstance.sendNativeMessage('SET_THEATRE_VISIBLE', false)
                bridgeInstance.sendNativeMessage('SET_DEBUG_STATE', true)
                bridgeInstance.sendBridgeMessage('_dsaf.postMessageAsyn', ['LOAD_BCM', bcmJson])
            }
        }
    } catch (error) {
        console.error('加载iframe失败：', error)
        iframeSrc.value = 'about:blank'
    }
})

onBeforeUnmount(() => {
    // 销毁bridge实例，移除监听
    bridgeInstance?.unregisterListener()
    bridgeInstance = null
})
</script>

<style>
.iframe-container {
    height: 100%;
}

.nemo {
    height: 100%;
}

.actor-select {
    position: fixed;
    top: 0;
    left: 80px;
    width: calc(100% - 525px);
    border-radius: 0;
    height: 100%;
}
</style>
