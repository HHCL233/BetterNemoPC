import { initLogin } from './loginInit'

export const init = async () => {
    try {
        initLogin()
    } catch (err) {
        console.log('初始化失败:', err)
    }
}