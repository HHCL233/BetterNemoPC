import type { Dialog, TextField, Snackbar } from 'mdui';
import { SecureAES } from '../utils/crypto'
import { useContentStore } from '../stores/store'


export const initLogin = async () => {
    try {

        console.log('登录初始化...');

        const contentStore = useContentStore()

        const loginDialog = document.querySelector(".login-action") as Dialog;
        const identityInput = document.querySelector(".login-identity") as TextField;

        //window.electronAPI.deleteConfig('identity')
        const confIdentity = await window.electronAPI.getConfig('identity');
        const confPassword = await window.electronAPI.getConfig('password');
        if (confIdentity == undefined) {
            loginDialog.open = true;
            const formElement = document.getElementById('loginForm');
            const loginForm = formElement as HTMLFormElement;
            loginForm!.addEventListener('submit', async (e) => {
                e.preventDefault();

                const formData = new FormData(loginForm);

                try {
                    const response: any = await window.$CodemaoApi.login(String(formData.get('identity')), String(formData.get('password')))
                    console.log(response)
                    if (response['success'] == true && response['status'] == 200) {
                        loginDialog.open = false;
                        identityInput.setCustomValidity('');
                        window.electronAPI.setConfig('identity', String(formData.get('identity')));
                        window.electronAPI.setConfig('password', SecureAES.encrypt(String(formData.get('password'))));
                        contentStore.userData = ((await window.$CodemaoApi.getUserData()).data ?? {})
                        console.log('登陆成功!')
                    } else {
                        identityInput.setCustomValidity('登录失败:' + response['data']['error_message'])
                    }
                } catch (err) {
                    console.error('请求失败：', err);
                    identityInput.setCustomValidity('请求失败:' + err)
                }
            });
        } else {
            loginDialog.open = false;
            const autoLoginSuccess = document.querySelector(".auto-login-success") as Snackbar;
            const autoLoginError = document.querySelector(".auto-login-error") as Snackbar;
            const password = SecureAES.decrypt(confPassword);
            const response: any = await window.$CodemaoApi.login(String(confIdentity), String(password));

            if (response['success'] == true && response['status'] == 200) {
                autoLoginSuccess.open = true;
                contentStore.userData = ((await window.$CodemaoApi.getUserData()).data ?? {})
            } else {
                autoLoginError.open = true;
            };
        }

    } catch (err) {
        console.log('登录初始化失败:', err)
    }
}