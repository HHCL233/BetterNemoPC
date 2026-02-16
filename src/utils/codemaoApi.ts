export const request = async (options: {
    url: string;
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    headers?: Record<string, string>;
    body?: Record<string, any>;
    withCredentials?: boolean;
}) => {
    const result = await window.electronAPI.request(options);
    if (!result.success) {
        throw new Error(`请求失败：${result.error || '未知错误'}`);
    }
    return result;
};

export class codemaoApi {
    public baseURL: string;
    constructor() {
        this.baseURL = 'https://api.codemao.cn'
    }
    login(identity: string, password: string) {
        return request({
            url: this.baseURL + '/tiger/v3/web/accounts/login',
            method: 'POST',
            body: {
                "pid": "65edCTyg",
                "identity": identity,
                "password": password
            },
        });
    }
    getBanners() {
        return request({
            url: this.baseURL + '/web/banners/all?type=OFFICIAL',
            method: 'GET',
        });
    }
    getHomeBestWork() {
        return request({
            url: this.baseURL + '/creation-tools/v1/pc/home/recommend-work?type=1',
            method: 'GET',
        });
    }
    getHomeGoodWork() {
        return request({
            url: this.baseURL + '/creation-tools/v1/pc/home/recommend-work?type=2',
            method: 'GET',
        });
    }
    getWorkInfo(id: string) {
        return request({
            url: this.baseURL + '/creation-tools/v1/works/' + id,
            method: 'GET',
        });
    }
    getUserData(id?: string) {
        if (id == undefined) {
            return request({
                url: this.baseURL + '/creation-tools/v1/user/center/honor',
                method: 'GET',
            });
        } else {
            return request({
                url: this.baseURL + '/creation-tools/v1/user/center/honor?user_id=' + id,
                method: 'GET',
            });
        }
    }
    getUserWork(id: string, offset: string, limit?: string) {
        return request({
            url: this.baseURL + `/creation-tools/v2/user/center/work-list?type=newest&user_id=${id}&offset=${offset}&limit=${limit ?? 15}`,
            method: 'GET',
        });
    }
    likeWork(id: string, isCancel: boolean) {
        return request({
            url: this.baseURL + `/nemo/v2/works/${id}/like`,
            method: (isCancel ? 'DELETE' : 'POST'),
        });
    }
    collectionWork(id: string, isCancel: boolean) {
        return request({
            url: this.baseURL + `/nemo/v2/works/${id}/collection`,
            method: (isCancel ? 'DELETE' : 'POST'),
        });
    }
    forkWork(id: string, isCancel: boolean) {
        return request({
            url: this.baseURL + `/nemo/v2/works/${id}/fork`,
            method: (isCancel ? 'DELETE' : 'POST'),
        });
    }
}

const globalCodemaoApi = new codemaoApi();
declare global {
    interface Window {
        $CodemaoApi: typeof globalCodemaoApi;
    }
}
window.$CodemaoApi = globalCodemaoApi;