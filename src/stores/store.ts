import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import HomeContent from '../renderer/components/home/HomeContent.vue'
import MeContent from '../renderer/components/home/MeContent.vue'
import WorkContent from '../renderer/components/home/WorkContent.vue'
import DebugContent from '../renderer/components/home/DebugContent.vue'


type ContentKey = keyof typeof componentMap

const componentMap = {
    home: HomeContent,
    me: MeContent,
    work: WorkContent,
    debug: DebugContent
} as const

export const useContentStore = defineStore('content', () => {
    const currentContent = ref<ContentKey>('home')
    const currentContentData = ref('')
    const userData = ref({})

    const currentContentComponent = computed(() => {
        return componentMap[currentContent.value]
    })

    const switchContent = (key: ContentKey) => {
        currentContentData.value = '';
        currentContent.value = key;
    }

    const switchContentData = (key: ContentKey, data: string) => {
        currentContent.value = key;
        currentContentData.value = data;
    }

    return {
        currentContent,
        currentContentComponent,
        switchContent,
        currentContentData,
        switchContentData,
        userData
    }
})

export const useHomeStore = defineStore('home', () => {
    const homeData = ref({
        'homeBestWorkList': [],
        'homeGoodWorkList': []
    })

    return {
        homeData
    }
})