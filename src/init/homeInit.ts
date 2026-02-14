import { useHomeStore } from '../stores/store'

export const initHome = async () => {
    try {
        const homeStore = useHomeStore()
        const bestList: any = await window.$CodemaoApi.getHomeBestWork();
        console.log(homeStore)
        if (bestList['success'] == true && bestList['status'] == 200) {
            homeStore.homeData.homeBestWorkList = bestList['data'];
        } else {
            console.error('[首页展示区1]请求失败:', bestList['data'])
        }

        const goodList: any = await window.$CodemaoApi.getHomeGoodWork();
        console.log(homeStore)
        if (goodList['success'] == true && goodList['status'] == 200) {
            homeStore.homeData.homeGoodWorkList = goodList['data'];
        } else {
            console.error('[首页展示区1]请求失败:', goodList['data'])
        }
    } catch (err) {
        console.error('[首页展示区1]请求失败:', err)
    }
}