<template>
    <div class="me-content" ref="meContent">
        <mdui-card variant="filled" class="me-info" :style="{
            '--user-cover-url': contentStore.userData?.user_cover
                ? `url(${contentStore.userData.user_cover})`
                : 'none'
        }">
            <mdui-avatar class="me-avatar" :src="contentStore.userData?.avatar_url"></mdui-avatar>
            <div class="me-text">
                <h3 class="me-name">{{ contentStore.userData?.nickname ?? '默认用户' }}</h3>
                <p class="me-description">{{ contentStore.userData?.user_description ?? '该用户没有简介哦' }}</p>
                <p class="me-uid">{{ 'UID:' + (contentStore.userData?.user_id ?? '-1') }}</p>
            </div>
            <div class="me-statistics">
                <mdui-card clickable class="me-statistics-item">
                    <p class="me-statistics-item-times">{{ contentStore.userData?.attention_total ?? '-1' }}</p>
                    <p class="me-statistics-item-title">关注</p>
                </mdui-card>
                <mdui-card clickable class="me-statistics-item">
                    <p class="me-statistics-item-times">{{ contentStore.userData?.fans_total ?? '-1' }}</p>
                    <p class="me-statistics-item-title">粉丝</p>
                </mdui-card>
            </div>
        </mdui-card>
        <div class="me-work">
            <mdui-card clickable variant="filled" class="me-work-card"
                @click="contentStore.switchContentData('work', item['id'])"
                v-for="(item, index) in contentStore.userWork" :key="index">
                <mdui-card src="" class="me-work-card-cover" :style="'background-image: url(' + item['preview'] + ');'">
                </mdui-card>
                <div class="me-work-card-info">
                    <h4 class="me-work-card-title">{{ item['work_name'] ?? 'Oldsquaw-BetterNemo' }}</h4>
                </div>
            </mdui-card>
        </div>
        <div class="loading" v-if="isLoading"><mdui-circular-progress></mdui-circular-progress></div>
        <div class="no-more" v-if="hasMore === false && contentStore.userWork.length > 0">你来到了宇宙的尽头~</div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useContentStore } from '../../../stores/store'
import { initMeInfo } from '../../../init/meInfoInit'
import { useInfiniteScroll } from '@vueuse/core'

const meContent = ref(null)
const isLoading = ref(false)
const hasMore = ref(true)
const page = ref(0)

const contentStore = useContentStore()

const fetchData = async () => {
    if (isLoading.value || !hasMore.value) return

    try {
        isLoading.value = true
        const newData = (await window.$CodemaoApi.getUserWork(contentStore.userData.user_id, String(page.value * 15))).data
        const newWork = newData.items
        await new Promise(resolve => setTimeout(resolve, 800))
        if ([...contentStore.userWork, ...newWork].length >= newData.total) {
            hasMore.value = false
            isLoading.value = false
        } else {
            console.log(newData)
            contentStore.userWork = [...contentStore.userWork, ...newWork]
            page.value++
        }
    } catch (error) {
        console.error('加载失败：', error)
    } finally {
        isLoading.value = false
    }
}

onMounted(async () => {
    await initMeInfo()

    useInfiniteScroll(
        meContent,
        () => {
            fetchData()
        },
        {
            distance: 150,
            disabled: () => isLoading.value || !hasMore.value,
            immediate: false
        }
    )
})
</script>

<style>
.me-content {
    overflow-y: auto;
    height: 100vh;
}

.me-info {
    height: 160px;
    width: 100%;
    padding: 16px;
    display: flex;
    align-items: center;
    background: linear-gradient(rgb(57, 55, 61, 0.75), rgb(57, 55, 61, 0.75)),
        var(--user-cover-url);
    background-position: center cover;
    background-repeat: no-repeat;
    background-size: cover;
    margin-bottom: 32px;
}

.me-avatar {
    height: 80%;
    width: auto;
    aspect-ratio: 1 / 1;
}

.me-text {
    margin-left: 16px;
    display: block;
    margin-right: auto;
}

.me-name {
    display: block;
    font-size: 32px;
    margin: 0;
}

.me-description {
    margin: 4px 0;
}

.me-uid {
    margin: 4px 0;
}

.me-statistics {
    float: right;
    display: flex;
    gap: 8px;
    height: 100%;
}

.me-statistics-item-times {
    font-size: 48px;
    margin: 0;
    width: 100%;
    text-align: center;
}

.me-statistics-item-title {
    font-size: 16px;
    width: 100%;
    text-align: center;
    margin: 0;
}

.me-statistics-item {
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding: 8px 0;
}

.me-work {
    margin: auto;
    min-width: 500px;
    width: 800px;
    max-width: 1500px;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
}

.me-work-card {
    width: auto;
    height: 280px;
    margin-right: calc(4% / 3);
    margin-bottom: calc(4% / 3);
    flex: 0 0 24%;
}

.me-work-card:nth-child(4n) {
    margin-right: 0;
}

.me-work-card:last-child {
    margin-right: auto;
}

.me-work-card-cover {
    width: 100%;
    aspect-ratio: 1 / 1;
    border: 0;
    display: block;
    background-size: 100% 100%;
}

.me-work-card-info {
    padding: 6px 12px;
}

.me-work-card-title {
    margin: 12px 0;
}

.loading,
.no-more {
    text-align: center;
    margin-bottom: 24px;
}

@media (prefers-color-scheme: light) {
    .me-info {
        background: linear-gradient(rgb(229, 223, 232, 0.75), rgb(229, 223, 232, 0.75)),
            var(--user-cover-url);
    }
}
</style>