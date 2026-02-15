<template>
    <div class="debug-content">
        <p>此页面用于测试BNPC在部分情况下的表现</p>
        <mdui-text-field label="作品ID"
            @change="contentStore.switchContentData('work', $event.srcElement.inputRef.value.value)"></mdui-text-field>
        <mdui-button @click="deleteUserData()">清除数据(下次打开后生效)</mdui-button>
    </div>
</template>

<script setup>
import { useHomeStore, useContentStore } from '../../../stores/store'
const homeStore = useHomeStore()
const contentStore = useContentStore()

function deleteUserData() {
    window.electronAPI.deleteConfig('identity')
}
</script>

<style>
.debug-content {
    overflow-y: auto;
    height: 100vh;
}
</style>