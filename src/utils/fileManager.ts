
export class fileControl {
    static async writeConf(fileText: string) {
        return await window.electronAPI.writeFile('.cmusic', fileText)
    }

    static openConf() {
        window.electronAPI.openFile('.cmusic')
    }

    static async openFile() {
        const result = await window.electronAPI.showOpenDialog({
            title: '选择文件',
            properties: ['openFile'], // 允许选择文件
            filters: [
                { name: 'Music', extensions: ['mp3'] },
                { name: 'All Files', extensions: ['*'] }]
        });
        if (result.filePaths.length > 0) {
            console.log('选中的文件:', result.filePaths);
            return result.filePaths
        } else {
            return [null]
        }
    }

    static async openDirectory() {
        const result = await window.electronAPI.showOpenDialog({
            title: '选择文件夹',
            properties: ['openDirectory'], // 允许选择文件
        });
        if (result.filePaths.length > 0) {
            console.log('选择的文件夹:', result.filePaths);
            return result.filePaths
        } else {
            return [null]
        }
    }
};