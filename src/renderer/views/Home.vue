<template>
    <div style="position: relative;height: 100%;">
        <mdui-navigation-rail contained divider value="home" alignment="center">
            <mdui-fab lowered icon="add--outlined" slot="top"></mdui-fab>
            <mdui-navigation-rail-item icon="home--outlined" value="home" active-icon="home--filled"
                @click="contentStore.switchContent('home')">主页</mdui-navigation-rail-item>
            <mdui-navigation-rail-item icon="person--outlined" value="me" active-icon="person--filled"
                @click="contentStore.switchContent('me')">我的</mdui-navigation-rail-item>
            <mdui-navigation-rail-item icon="bug_report--outlined" value="debug" active-icon="bug_report--filled"
                @click="contentStore.switchContent('debug')">调试</mdui-navigation-rail-item>
            <mdui-navigation-rail-item icon="settings--outlined" value="settings" active-icon="settings--filled"
                @click="contentStore.switchContent('settings')">设置</mdui-navigation-rail-item>
        </mdui-navigation-rail>
        <div class="right-container">
            <KeepAlive>
                <transition name="content-fade" mode="out-in">
                    <component :is="contentStore.currentContentComponent" :key="contentStore.currentContent" />
                </transition>
            </KeepAlive>
        </div>
    </div>
    <mdui-dialog headline="登录Nemo账户" class="login-action">
        <form id="loginForm" class="login-form">
            <mdui-text-field label="账号" class="login-identity" name="identity"></mdui-text-field>
            <mdui-text-field label="密码" class="login-password" name="password" type="password"
                toggle-password></mdui-text-field>
        </form>
        <mdui-button slot="action" variant="text" class="no-login-btn">暂不登录</mdui-button>
        <mdui-button slot="action" variant="filled" type="submit" form="loginForm" class="login-btn">登录</mdui-button>
    </mdui-dialog>
    <mdui-snackbar closeable class="auto-login-success">登录成功!</mdui-snackbar>
    <mdui-snackbar closeable class="auto-login-error">登录失败</mdui-snackbar>
    <!--<iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=330 height=86
        src="//music.163.com/outchain/player?type=2&id=514761070&auto=1&height=66" class="music-player"></iframe>-->
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import 'mdui/components/icon.js';
import { useContentStore } from '../../stores/store'
import { init } from '../../init'

const contentStore = useContentStore()

onMounted(() => {
    init()
})
</script>

<style>
.right-container {
    height: 100vh;
}

.content-fade-enter-from {
    opacity: 0;
    transform: translateY(20px);
}

.content-fade-leave-to {
    opacity: 0;
}

.content-fade-enter-active {
    transition: all 0.25s cubic-bezier(0.25, 0.10, 0.25, 1.00);
}

.margin {
    height: 50px;
    width: 100%;
}

.music-player {
    display: none;
}
</style>