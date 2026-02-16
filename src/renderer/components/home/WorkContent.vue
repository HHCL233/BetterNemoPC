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
            <p class="work-type">{{ '作品由 ' + (workInfo?.type ?? '未知') + '(' + workInfo?.ide_type + ') 创作' }}</p>
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
            <div class="work-control">
                <mdui-button icon="thumb_up--outlined" class="work-control-button"
                    :variant="workInfo?.abilities?.is_praised ? 'filled' : 'tonal'"
                    @click="likeWork(workInfo?.id ?? -1)">{{ workInfo?.abilities?.is_praised ? '已点赞' :
                        '点赞' }}</mdui-button>
                <mdui-button icon="star_border--outlined" class="work-control-button"
                    :variant="workInfo?.abilities?.is_collected ? 'filled' : 'tonal'"
                    @click="collectionWork(workInfo?.id ?? -1)" v-if="workInfo?.type != 'COCO'">{{
                        workInfo?.abilities?.is_collected ? '已收藏' : '收藏'
                    }}</mdui-button>
                <!--<mdui-button icon="cloud_download--outlined" class="work-control-button"
                    :variant="workInfo?.abilities?.is_owned ? 'filled' : 'tonal'"
                    @click="forkWork(workInfo?.id ?? -1)">{{ workInfo?.abilities?.is_owned ? '已学习' : '学习'
                    }}</mdui-button>-->
            </div>
            <mdui-card class="work-comment" variant="filled">
                <p>评论</p>
            </mdui-card>
        </mdui-card>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useContentStore } from '../../../stores/store'
import { timeStamp2Date } from '../../../utils/time';
import { snackbar } from 'mdui/functions/snackbar.js';

const contentStore = useContentStore()
let workInfo = ref({})

onMounted(async () => {
    await updateWorkInfo()
})

async function updateWorkInfo() {
    workInfo.value = (await window.$CodemaoApi.getWorkInfo(contentStore.currentContentData)).data;
    console.log(workInfo.work_name)
    const workInfoDrawer = document.querySelector(".work-info-drawer");
    workInfoDrawer.open = true;
}

async function likeWork(id) {
    try {
        const request = await window.$CodemaoApi.likeWork(id, (workInfo?.value.abilities?.is_praised))
        if (request['status'] == 200) {
            await updateWorkInfo()
            snackbar({
                message: (workInfo?.value.abilities?.is_praised ? `已点赞作品 ${id}` : `已取消点赞作品 ${id}`),
                closeable: true
            });
        } else {
            snackbar({
                message: (workInfo?.value.abilities?.is_praised ? `点赞作品 ${id} 失败` : `取消点赞作品 ${id} 失败`),
                closeable: true
            });
            console.error(`点赞作品 ${id} 失败:`, request)
            console.error(request)
        }
    } catch (err) {
        snackbar({
            message: (workInfo?.value.abilities?.is_praised ? `点赞作品 ${id} 失败:${err}` : `取消点赞作品 ${id} 失败:${err}`),
            closeable: true
        });
        console.error(`点赞作品 ${id} 请求失败:`, err)
    }
}

async function collectionWork(id) {
    try {
        const request = await window.$CodemaoApi.collectionWork(id, (workInfo?.value.abilities?.is_collected))
        if (request['status'] == 200) {
            await updateWorkInfo()
            snackbar({
                message: (workInfo?.value.abilities?.is_praised ? `已收藏作品 ${id}` : `已取消收藏作品 ${id}`),
                closeable: true
            });
        } else {
            snackbar({
                message: (workInfo?.value.abilities?.is_praised ? `收藏作品 ${id} 失败` : `取消收藏作品 ${id} 失败`),
                closeable: true
            });
            console.error(`收藏作品 ${id} 失败:`, request)
            console.error(request)
        }
    } catch (err) {
        snackbar({
            message: (workInfo?.value.abilities?.is_praised ? `收藏作品 ${id} 失败:${err}` : `取消收藏作品 ${id} 失败:${err}`),
            closeable: true
        });
        console.error(`收藏作品 ${id} 请求失败:`, err)
    }
}

/*function forkWork(id) {
    snackbar({
        message: `作品 ${id} 不是再创作作品`,
        closeable: true
    });
}*/
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

.work-time,
.work-type {
    margin: 12px 0;
}

.work-title {
    margin: 12px 0;
}

.work-description-content {
    overflow-wrap: break-word;
}

.work-control {
    display: flex;
    gap: 4px
}

.work-control-button {
    flex: 1;
}

.work-comment {
    min-height: 400px;
    width: 100%;
    padding: 0 16px;
    margin-top: 4px;
}
</style>