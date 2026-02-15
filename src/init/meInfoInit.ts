import { useContentStore } from '../stores/store'

export const initMeInfo = async () => {
    try {
        console.log('个人信息初始化...');
        const contentStore = useContentStore()

        const userData = (await window.$CodemaoApi.getUserData()).data ?? {}
        contentStore.userData = userData

        /*if (contentStore.userWork.length > 15) {
            const userWork = (await window.$CodemaoApi.getUserWork(userData?.user_id, '0')).data.items ?? {}
            contentStore.userWork = userWork
        }*/

    } catch (err) {
        console.log('[个人信息]请求失败:', err);
    }
}