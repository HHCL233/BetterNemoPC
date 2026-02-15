<template>
    <div class="work-content">
        <div class="main-content">
            <mdui-card class="work-player-content">
                <div class="player">
                    <iframe class="player-iframe" :src="workInfo?.player_url"></iframe>
                </div>
            </mdui-card>
        </div>
        <mdui-card class="work-info-drawer">
            <h2 class="work-title">{{ workInfo.work_name }}</h2>
            <p class="work-time">{{ '更新时间: ' + timeStamp2Date(workInfo?.publish_time ?? 0) }}</p>
            <mdui-card clickable class="work-user" variant="filled">
                <mdui-avatar class="work-user-avatar" :src="workInfo?.user_info?.avatar"></mdui-avatar>
                <p class="work-user-name">{{ workInfo?.user_info?.nickname ?? 'Inventocode' }}</p>
            </mdui-card>
            <mdui-card class="work-description" variant="filled">
                <mdui-list>
                    <mdui-collapse>
                        <mdui-collapse-item>
                            <mdui-list-item slot="header">作品简介</mdui-list-item>
                            <div style="margin-left: 2.5rem">
                                <mdui-list-item class="work-description-content">{{ workInfo?.description ??
                                    'BetterNemo我们喜欢你'
                                    }}</mdui-list-item>
                            </div>
                        </mdui-collapse-item>
                        <mdui-collapse-item>
                            <mdui-list-item slot="header">操作说明</mdui-list-item>
                            <div style="margin-left: 2.5rem">
                                <mdui-list-item class="work-description-content">{{ workInfo?.operation ??
                                    '我们喜欢Inventocode,方圆圆,砂磨'
                                    }}</mdui-list-item>
                            </div>
                        </mdui-collapse-item>
                    </mdui-collapse>
                </mdui-list>
            </mdui-card>
        </mdui-card>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useContentStore } from '../../../stores/store'
import { timeStamp2Date } from '../../../utils/time';

const contentStore = useContentStore()
let workInfo = ref({})

onMounted(async () => {
    workInfo.value = (await window.$CodemaoApi.getWorkInfo(contentStore.currentContentData)).data;
    console.log(workInfo.work_name)
    const workInfoDrawer = document.querySelector(".work-info-drawer");
    workInfoDrawer.open = true;
})
</script>

<style>
.player-iframe {
    height: 100vh;
    width: 100%;
    border: 0;
}

.player {
    height: 100vh;
    width: 100%;
}

.main-content {
    height: 100vh;
    width: 70%;
}

.work-content {
    height: 100vh;
    width: 100%;
    display: flex;
}

.work-player-content {
    height: 100vh;
    width: 100%;
}

.work-info-drawer {
    width: 30%;
    height: 100%;
    padding: 6px 24px;
    overflow: auto;
}

.work-user {
    display: inline-block;
    text-align: left;
    padding: 6px;
    width: 100%;
}

.work-user-avatar {
    height: 36px;
    width: 36px;
}

.work-user-name {
    margin: 0 0 0 8px;
    display: inline-block;
    font-size: large;
    line-height: 36px;
}

.work-description {
    width: 100%;
}

.work-time {
    margin: 12px 0;
}

.work-title {
    margin: 12px 0;
}

.work-description-content {
    overflow-wrap: break-word;
}
</style>