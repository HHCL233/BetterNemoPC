<template>
    <div class="me-content">
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
    </div>
</template>

<script setup>
import { useContentStore } from '../../../stores/store'

const contentStore = useContentStore()
</script>

<style>
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

@media (prefers-color-scheme: light) {
    .me-info {
        background: linear-gradient(rgb(229, 223, 232, 0.75), rgb(229, 223, 232, 0.75)),
            var(--user-cover-url);
    }
}
</style>