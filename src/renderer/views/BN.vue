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
                <mdui-list-item active>
                    角色1
                    <mdui-avatar slot="icon">?</mdui-avatar>
                    <span slot="description">其实这只是UI测试,是假的</span>
                </mdui-list-item>
                <mdui-list-item>
                    角色2
                    <mdui-avatar slot="icon">?</mdui-avatar>
                    <span slot="description">说点大家不知道的</span>
                </mdui-list-item>
            </mdui-list>
        </mdui-card>
        <div class="nemo">
            <iframe ref="iframeRef" :src="iframeSrc" width="100%" height="100%" frameborder="0" id="bn-iframe"></iframe>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const iframeSrc = ref('')
const iframeRef = ref(null)
const theatreShow = ref(false)
const runState = ref(false)

function postToWorkspace(message) {
    const targetWindow = iframeRef.value?.contentWindow
    if (!targetWindow) return false
    targetWindow.postMessage(message, '*')
    return true
}

function sendNativeMessage(type, payload = {}) {
    return postToWorkspace({ type, payload })
}

function sendBridgeMessage(api, args = []) {
    return postToWorkspace({
        __bn_bridge__: true,
        direction: 'native->webview',
        api,
        args,
    })
}

function resolveBridgeCallback(callbackId, result = '') {
    return postToWorkspace({
        __bn_bridge__: true,
        direction: 'host->webview-callback',
        callbackId,
        result,
    })
}

function onIframeBridgeMessage(event) {
    if (!iframeRef.value?.contentWindow) return
    if (event.source !== iframeRef.value.contentWindow) return

    const data = event.data
    if (!data || typeof data !== 'object' || !data.__bn_bridge__) return

    if (data.direction === 'webview->host') {
        console.log('[BN Bridge][from workspace]', data)

        // 默认自动回调，避免 webview 侧等待 callback 卡住
        if (data.callbackId) {
            resolveBridgeCallback(data.callbackId, '')
        }
    }
}

function changeTheatre(show) {
    sendNativeMessage('SET_THEATRE_VISIBLE', show);
    theatreShow.value = show;
}

function setRunState(show) {
    sendNativeMessage('SET_RUN_STATE', show);
    runState.value = show;
}

onMounted(async () => {
    try {
        if (import.meta.env.DEV) {
            iframeSrc.value = '/bn/workspace.html'
        } else {
            iframeSrc.value = await window.electronAPI.getIframeSrc('bn/workspace.html')
        }

        window.addEventListener('message', onIframeBridgeMessage)

        // 暴露给外部调试/调用
        window.BNWorkspaceBridge = {
            postToWorkspace,
            sendNativeMessage,
            sendBridgeMessage,
            resolveBridgeCallback,
        }

        if (iframeRef.value) {
            iframeRef.value.onload = () => {
                console.log('BN iframe 加载完成')
                window.BNWorkspaceBridge.sendNativeMessage('INIT_WEBVIEW_DATA', {
                    "nickname": "我不知道",
                    "bcm_version": "0.9.3",
                    "is_login": true
                })
                window.BNWorkspaceBridge.sendNativeMessage('SET_THEATRE_VISIBLE', false)
            }
        }
    } catch (error) {
        console.error('加载iframe失败：', error)
        iframeSrc.value = 'about:blank'
    }
})

onBeforeUnmount(() => {
    window.removeEventListener('message', onIframeBridgeMessage)
    if (window.BNWorkspaceBridge) delete window.BNWorkspaceBridge
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
    width: calc(100% - 530px);
    border-radius: 0;
    height: 100%;
}
</style>
