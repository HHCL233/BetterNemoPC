<template>
    <div class="debug-content">
        <p>此页面用于测试BNPC在部分情况下的表现</p>
        <mdui-text-field label="作品ID"
            @change="contentStore.switchContentData('work', $event.srcElement.inputRef.value.value)"></mdui-text-field>
    </div>
</template>

<script setup>
import { useHomeStore, useContentStore } from '../../../stores/store'
const homeStore = useHomeStore()
const contentStore = useContentStore()
</script>

<style></style>