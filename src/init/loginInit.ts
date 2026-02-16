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

        const loginSuccess = document.querySelector(".auto-login-success") as Snackbar;
        const loginError = document.querySelector(".auto-login-error") as Snackbar;
        if (confIdentity == undefined) {
            loginDialog.open = true;
            const noLoginBtn = document.querySelector(".no-login-btn");
            const formElement = document.getElementById('loginForm');
            const loginForm = formElement as HTMLFormElement;

            noLoginBtn!.addEventListener("click", () => loginDialog.open = false);

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
                        loginSuccess.open = true;
                        console.log('登陆成功!')
                    } else {
                        identityInput.setCustomValidity('登录失败:' + response['data']['error_message']);
                        loginError.open = true;
                    }
                } catch (err) {
                    console.error('请求失败：', err);
                    identityInput.setCustomValidity('请求失败:' + err)
                }
            });
        } else {
            loginDialog.open = false;
            const password = SecureAES.decrypt(confPassword);
            const response: any = await window.$CodemaoApi.login(String(confIdentity), String(password));

            if (response['success'] == true && response['status'] == 200) {
                loginSuccess.open = true;
            } else {
                loginError.open = true;
            };
        }

    } catch (err) {
        console.log('登录初始化失败:', err)
    }
}