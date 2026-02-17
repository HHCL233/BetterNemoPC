// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer, type IpcRendererEvent } from 'electron';

interface ExposedApi {
    // 网络请求
    request: (options: {
        url: string;
        method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
        headers?: Record<string, string>;
        body?: Record<string, any>;
        withCredentials?: boolean;
    }) => Promise<{
        success: boolean;
        status: number;
        data?: any;
        error?: string;
    }>;
    // 应用退出
    appQuit: () => void;
    // 对话框相关
    showOpenDialog: (options: Electron.OpenDialogOptions) => Promise<Electron.OpenDialogReturnValue>;
    showSaveDialog: (options: Electron.SaveDialogOptions) => Promise<Electron.SaveDialogReturnValue>;
    // 文件操作相关
    readFile: (filePath: string) => Promise<string | Buffer>;
    writeFile: (filePath: string, content: string | Buffer) => Promise<void>;
    openFile: (filePath: string) => Promise<void>;
    readDirFiles: (filePath: string) => Promise<string[]>;
    getConfig: (key: string) => Promise<string>;
    setConfig: (key: string, value: any) => Promise<boolean>;
    deleteConfig: (key: string) => Promise<boolean>;
    claerData: () => Promise<boolean>;
    getIframeSrc: (fileName: string) => Promise<string>;
}

const api: ExposedApi = {
    // 网络请求转发
    request: async (options) => {
        try {
            return await ipcRenderer.invoke('universal-request', options);
        } catch (error) {
            console.error('preload: 请求转发失败', error);
            return {
                success: false,
                status: 0,
                error: (error as Error).message,
            };
        }
    },
    // 应用退出
    appQuit: () => {
        ipcRenderer.invoke('app-quit')
    },
    // 打开文件对话框
    showOpenDialog: (options) => ipcRenderer.invoke('show-open-dialog', options),
    // 保存文件对话框
    showSaveDialog: (options) => ipcRenderer.invoke('show-save-dialog', options),
    // 读取文件内容
    readFile: (filePath) => ipcRenderer.invoke('read-file', filePath),
    // 写入文件内容
    writeFile: (filePath, content) => ipcRenderer.invoke('write-file', filePath, content),
    // 打开文件
    openFile: (filePath) => ipcRenderer.invoke('open-file', filePath),
    // 读取目录下文件列表
    readDirFiles: (filePath) => ipcRenderer.invoke('open-dir-files', filePath),
    // 获取配置
    getConfig: (key) => {
        return ipcRenderer.invoke('get-config', key);
    },
    // 设置配置
    setConfig: (key, value) => {
        return ipcRenderer.invoke('set-config', key, value);
    },
    // 删除配置
    deleteConfig: (key) => {
        return ipcRenderer.invoke('delete-config', key);
    },
    // 清除数据
    claerData: () => {
        return ipcRenderer.invoke('claer-data');
    },
    // 获取本地HTML文件的自定义协议路径
    getIframeSrc: (fileName) => ipcRenderer.invoke('get-iframe-src', fileName)
};

contextBridge.exposeInMainWorld('electronAPI', api);

declare global {
    interface Window {
        electronAPI: ExposedApi;
    }
}