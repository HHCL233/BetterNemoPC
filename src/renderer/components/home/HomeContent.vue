<template>
    <div class="home-content">
        <div class="margin">
        </div>
        <div class="home-banners">
            <s-carousel v-model.lazy="bannerSelect" autoplay="true" style="width: 720px;height: 360px;">
                <s-carousel-item :value="index" :style="'background-image: url(' + item.background_url + ')'"
                    v-for="(item, index) in bannersList" :key="index"></s-carousel-item>
            </s-carousel>
        </div>
        <div class="margin">
        </div>
        <div class="home-title">点N精选</div>
        <div class="home-best-work">
            <mdui-card clickable variant="filled" class="home-work-card"
                @click="contentStore.switchContentData('work', item['id'])"
                v-for="(item, index) in homeStore.homeData?.homeBestWorkList" :key="index">
                <mdui-card src="" class="home-work-card-cover" variant="filled"
                    :style="'background-image: url(' + item['preview'] + ');'">
                </mdui-card>
                <div class="home-work-card-info">
                    <h4 class="home-work-card-title">{{ item['name'] ?? 'Oldsquaw-BetterNemo' }}</h4>
                    <div class="home-work-card-user">
                        <mdui-avatar class="home-work-card-user-avatar" :src="item['user']['avatar_url']"></mdui-avatar>
                        <p class="home-work-card-user-name">{{ item['user']['nickname'] ?? 'Inventocode' }}</p>
                    </div>
                </div>
            </mdui-card>
        </div>
        <h3 class="home-title">新作NN看</h3>
        <div class="home-good-work">
            <mdui-card clickable variant="filled" class="home-work-card"
                @click="contentStore.switchContentData('work', item['id'])"
                v-for="(item, index) in homeStore.homeData?.homeGoodWorkList" :key="index">
                <mdui-card src="" class="home-work-card-cover" variant="filled"
                    :style="'background-image: url(' + item['preview'] + ');'">
                </mdui-card>
                <div class="home-work-card-info">
                    <h4 class="home-work-card-title">{{ item['name'] ?? 'Oldsquaw-BetterNemo' }}</h4>
                    <div class="home-work-card-user">
                        <mdui-avatar class="home-work-card-user-avatar" :src="item['user']['avatar_url']"></mdui-avatar>
                        <p class="home-work-card-user-name">{{ item['user']['nickname'] ?? 'Inventocode' }}</p>
                    </div>
                </div>
            </mdui-card>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { initHome } from '../../../init/homeInit'
import { useHomeStore, useContentStore } from '../../../stores/store'
const bannerSelect = ref(0)
const bannersList = ref({})
const homeStore = useHomeStore()
const contentStore = useContentStore()

onMounted(async () => {
    bannersList.value = (await window.$CodemaoApi.getBanners()).data.items;
    initHome()
})
</script>

<style scoped>
.home-content {
    overflow-y: auto;
    height: 100vh;
}

.home-banners {
    margin: auto;
    width: 720px;
    height: 360px;
}



.home-best-work {
    margin: auto;
    min-width: 500px;
    width: 800px;
    max-width: 1500px;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
}

.home-good-work {
    margin: auto;
    min-width: 500px;
    width: 800px;
    max-width: 1500px;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
}


.home-work-card {
    width: auto;
    height: 280px;
    margin-right: calc(4% / 3);
    margin-bottom: calc(4% / 3);
    flex: 0 0 24%;
}

.home-work-card-info {
    padding: 6px 12px;
}

.home-work-card:nth-child(4n) {
    margin-right: 0;
}

.home-work-card:last-child {
    margin-right: auto;
}

.home-title {
    margin: 24px auto;
    min-width: 500px;
    width: 800px;
    max-width: 1500px;
    font-weight: bolder;
    text-align: left;
    font-size: large;
}

.home-work-card-cover {
    width: 100%;
    aspect-ratio: 1 / 1;
    border: 0;
    display: block;
    background-size: 100% 100%;
}

.home-work-card-title {
    margin: 8px 0;
}

.home-work-card-user {
    display: inline-block;
}

.home-work-card-user-avatar {
    height: 24px;
    width: 24px;
}

.home-work-card-user-name {
    margin: 0 0 0 4px;
    display: inline-block;
}
</style>