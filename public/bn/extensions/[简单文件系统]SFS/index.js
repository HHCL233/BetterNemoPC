/// <reference path="../_TYPE.d.ts"/>

Extension.metaData = {
    name: "简单文件系统",
    version: "0.1.0",
    description: "呃一个可以在作品内进行简单文件操作的系统",
    author: "砂墨",
    docs: ""
};


(async () => {
    // 在这里定义了一些必要的API
    /** @type {BetterNemo} */
    const BN = Extension.API;
    const Block = BN.Block;
    const Toolbox = BN.Toolbox;
    // --------------------------------color-------------------------------
    // 这条语句会等待Blockly加载完毕，别动
    await BN.waitBlocklyLoaded();
    BN.regColor("SIMPLE_FILE_SYSTEM_HUE", "#85a5d6", "#476797");
    // --------------------------------blocks-------------------------------
    const SimpleFileSystemBlocks = [
        {
            type: "SFS_create_drive",
            message0: "创建虚拟盘 盘符 %1",
            args0: [
                {
                    type: "input_value",
                    name: "letter",
                    check: "String",
                    value: "",
                },
            ],
            ...Block.methodBlock
        },
        {
            type: "SFS_create_folders",
            message0: "创建文件夹链 %1",
            args0: [
                {
                    type: "input_value",
                    name: "path",
                    check: "String",
                    value: "",
                },
            ],
            ...Block.methodBlock,
        },
        {
            type: "SFS_create_file",
            message0: "创建文件 %1 路径 %2 名称 %3 内容 %4",
            args0: [
                { type: "input_dummy" },
                {
                    type: "input_value",
                    name: "path",
                    check: "String",
                    value: "",
                },
                {
                    type: "input_value",
                    name: "name",
                    check: "String",
                    value: "",
                },
                {
                    type: "input_value",
                    name: "content",
                    check: "String",
                    value: "",
                },
            ],
            ...Block.methodBlock,
            inputsInline: false,
        },
        {
            type: "SFS_write",
            message0: "修改 %1 为 %2",
            args0: [
                {
                    type: "input_value",
                    name: "path",
                    check: "String",
                    value: "",
                },
                {
                    type: "input_value",
                    name: "content",
                    check: "String",
                    value: "",
                },
            ],
            ...Block.methodBlock
        },
        {
            type: "SFS_rename",
            message0: "重命名 %1 为 %2",
            args0: [
                {
                    type: "input_value",
                    name: "path",
                    check: "String",
                    value: "",
                },
                {
                    type: "input_value",
                    name: "name",
                    check: "String",
                    value: "",
                },
            ],
            ...Block.methodBlock
        },
        {
            type: "SFS_delete_drive",
            message0: "删除虚拟盘 盘符 %1",
            args0: [
                {
                    type: "input_value",
                    name: "letter",
                    check: "String",
                    value: "",
                },
            ],
            ...Block.methodBlock
        },
        {
            type: "SFS_delete",
            message0: "删除 %1",
            args0: [
                {
                    type: "input_value",
                    name: "path",
                    check: "String",
                    value: "",
                },
            ],
            ...Block.methodBlock,
        },
        {
            type: "SFS_move",
            message0: "移动 %1 到 %2",
            args0: [
                {
                    type: "input_value",
                    name: "source_path",
                    check: "String",
                    value: "",
                },
                {
                    type: "input_value",
                    name: "target_path",
                    check: "String",
                    value: "",
                },
            ],
            ...Block.methodBlock
        },
        {
            type: "SFS_copy",
            message0: "复制 %1 到 %2",
            args0: [
                {
                    type: "input_value",
                    name: "source_path",
                    check: "String",
                    value: "",
                },
                {
                    type: "input_value",
                    name: "target_path",
                    check: "String",
                    value: "",
                },
            ],
            ...Block.methodBlock
        },
        {
            type: "SFS_read",
            message0: "读取 %1",
            output: "String",
            args0: [
                {
                    type: "input_value",
                    name: "path",
                    check: "String",
                    value: "",
                },
            ],
        },
        {
            type: "SFS_check_existence",
            message0: "是否存在 %1",
            output: "Boolean",
            args0: [
                {
                    type: "input_value",
                    name: "path",
                    check: "String",
                    value: "",
                },
            ],
        },
        {
            type: "SFS_list",
            message0: "列出目录条目 %1",
            output: "String",
            args0: [
                {
                    type: "input_value",
                    name: "path",
                    check: "String",
                    value: "",
                },
            ],
        },
    ].map((block) => { return { ...block, colour: "%{BKY_SIMPLE_FILE_SYSTEM_HUE}" }; });
    // 等待积木对象加载完毕，别动
    await BN.waitBlockLoaded();
    BN.regBlocks(SimpleFileSystemBlocks);
    // --------------------------------积木盒-------------------------------
    // 积木盒定义
    const SFS_XML = [
        Toolbox.title("简单的文件系统 · SFS"),
        Toolbox.title("虚拟盘 操作"),
        Toolbox.block("SFS_create_drive"),
        Toolbox.block("SFS_delete_drive"),
        Toolbox.title("文件/文件夹 操作"),
        Toolbox.block("SFS_create_folders"),
        Toolbox.block("SFS_create_file"),
        Toolbox.title(""),
        Toolbox.block("SFS_rename"),
        Toolbox.block("SFS_write"),
        Toolbox.block("SFS_move"),
        Toolbox.block("SFS_copy"),
        Toolbox.block("SFS_delete"),
        Toolbox.title(""),
        Toolbox.block("SFS_read"),
        Toolbox.block("SFS_check_existence"),
        Toolbox.block("SFS_list"),
        Toolbox.flyout_bottom(),
    ];
    // 积木盒图标
    BN.regIcon(`<symbol id="icon-SFS" viewBox="-2000 -2000 5012 5012"><path d="M903.542857 256.685714L657.6 10.742857c-6.857143-6.857143-16.114286-10.742857-25.828571-10.742857H146.285714c-20.228571 0-36.571429 16.342857-36.571428 36.571429v950.857142c0 20.228571 16.342857 36.571429 36.571428 36.571429h731.428572c20.228571 0 36.571429-16.342857 36.571428-36.571429V282.628571c0-9.714286-3.885714-19.085714-10.742857-25.942857zM614.857143 84.342857L829.942857 299.428571H614.857143V84.342857z"></path></symbol>`);
    // 添加积木盒
    BN.addToolbox("SFS", "icon-SFS", "#85a5d6", SFS_XML);
    // ---------------------------虚拟文件系统实现-----------------------------
    // 非法字符定义
    const INVALID_CHARS = /[<>:"/\\|?*\x00-\x1F]/;
    const RESERVED_NAMES = /^(CON|PRN|AUX|NUL|COM[1-9]|LPT[1-9])$/i;
    const INVALID_DRIVE_CHARS = /[^A-Za-z]/;
    
    // 虚拟文件系统存储结构
    class VirtualFileSystem {
        constructor() {
            this.drives = new Map();
            this.separator = '/';
        }
        
        // 验证盘符
        validateDriveLetter(driveLetter) {
            if (!driveLetter || typeof driveLetter !== 'string' || driveLetter.length !== 1) {
                return '盘符必须是单个字母';
            }
            
            if (INVALID_DRIVE_CHARS.test(driveLetter)) {
                return '盘符只能是字母 A-Z 或 a-z';
            }
            
            return null;
        }
        
        // 验证文件名/文件夹名
        validateName(name) {
            if (!name || typeof name !== 'string' || name.trim() === '') {
                return '名称不能为空';
            }
            
            // 检查长度
            if (name.length > 255) {
                return '名称长度不能超过255个字符';
            }
            
            // 检查非法字符
            if (INVALID_CHARS.test(name)) {
                return '名称包含非法字符 (<>:"/\\|?* 和控制字符)';
            }
            
            // 检查保留名称
            if (RESERVED_NAMES.test(name)) {
                return '名称是系统保留名称';
            }
            
            // 检查结尾字符
            if (name.endsWith('.') || name.endsWith(' ')) {
                return '名称不能以点或空格结尾';
            }
            
            // 检查连续空格
            if (/\s{2,}/.test(name)) {
                return '名称不能包含连续空格';
            }
            
            return null;
        }
        
        // 验证路径
        validatePath(path) {
            if (!path || typeof path !== 'string') {
                return '路径不能为空';
            }
            
            // 基本格式检查
            const driveMatch = path.match(/^([A-Za-z]):\//);
            if (!driveMatch) {
                return '路径格式错误，必须使用"盘符:/路径"格式，例如：C:/folder/file.txt';
            }
            
            const driveLetter = driveMatch[1];
            const driveError = this.validateDriveLetter(driveLetter);
            if (driveError) return driveError;
            
            const relativePath = path.substring(3);
            if (relativePath === '') return null; // 根路径
            
            // 拆分并验证每个部分
            const parts = relativePath.split('/').filter(p => p !== '');
            
            for (let i = 0; i < parts.length; i++) {
                const part = parts[i];
                const nameError = this.validateName(part);
                if (nameError) {
                    return `路径第${i + 1}部分错误: ${nameError}`;
                }
            }
            
            // 检查路径长度
            if (path.length > 260) {
                return '路径总长度不能超过260个字符';
            }
            
            return null;
        }
        
        // 规范化路径
        normalizePath(path) {
            if (!path || typeof path !== 'string') return '';
            
            let normalized = path.replace(/\/+/g, '/');
            
            if (normalized.endsWith('/') && normalized.length > 3) {
                normalized = normalized.slice(0, -1);
            }
            
            return normalized;
        }
        
        // 解析路径
        parsePath(path) {
            path = this.normalizePath(path);
            
            // 先验证路径
            const pathError = this.validatePath(path);
            if (pathError) {
                return [null, [], pathError];
            }
            
            const driveMatch = path.match(/^([A-Za-z]):\//);
            const driveLetter = driveMatch[1].toUpperCase();
            const relativePath = path.substring(3);
            const pathParts = relativePath ? relativePath.split('/').filter(p => p !== '') : [];
            
            return [driveLetter, pathParts, null];
        }
        
        // 获取驱动器的根目录
        getDriveRoot(driveLetter) {
            driveLetter = driveLetter.toUpperCase();
            if (!this.drives.has(driveLetter)) {
                this.drives.set(driveLetter, {
                    type: 'drive',
                    name: driveLetter + ':',
                    children: new Map()
                });
            }
            return this.drives.get(driveLetter);
        }
        
        // 导航到指定位置
        navigateTo(driveLetter, pathParts) {
            let current = this.getDriveRoot(driveLetter);
            
            for (let i = 0; i < pathParts.length; i++) {
                const part = pathParts[i];
                
                if (!current.children.has(part)) {
                    return [null, `路径不存在: ${part}`];
                }
                
                current = current.children.get(part);
                
                if (current.type === 'file' && i < pathParts.length - 1) {
                    return [null, `不能导航到文件内部: ${part}`];
                }
            }
            
            return [current, null];
        }
        
        // 创建文件夹链
        createFolderChain(driveLetter, pathParts) {
            let current = this.getDriveRoot(driveLetter);
            
            for (const part of pathParts) {
                // 验证文件夹名
                const nameError = this.validateName(part);
                if (nameError) {
                    console.warn(`创建文件夹链名称错误: ${part} - ${nameError}`);
                    return false;
                }
                
                if (!current.children.has(part)) {
                    current.children.set(part, {
                        type: 'folder',
                        name: part,
                        children: new Map()
                    });
                }
                current = current.children.get(part);
            }
            
            return true;
        }
        
        // 创建文件
        createFile(driveLetter, pathParts, fileName, content) {
            // 验证文件名
            const nameError = this.validateName(fileName);
            if (nameError) {
                return `文件名无效: ${nameError}`;
            }
            
            // 确保路径存在
            if (pathParts.length > 0) {
                const [parent] = this.navigateTo(driveLetter, pathParts);
                if (!parent) {
                    this.createFolderChain(driveLetter, pathParts);
                }
            }
            
            const [parent] = this.navigateTo(driveLetter, pathParts);
            
            if (!parent || parent.type !== 'folder') {
                return `无法创建文件，父目录不存在或不是文件夹`;
            }
            
            if (parent.children.has(fileName)) {
                return `文件已存在: ${fileName}`;
            }
            
            parent.children.set(fileName, {
                type: 'file',
                name: fileName,
                content: content || '',
                modified: Date.now()
            });
            
            return null;
        }
        
        // 读取文件内容
        readFile(driveLetter, pathParts) {
            const [item, error] = this.navigateTo(driveLetter, pathParts);
            
            if (error) return `读取失败: ${error}`;
            if (!item || item.type !== 'file') return `不是文件或文件不存在`;
            
            return item.content;
        }
        
        // 写入/修改文件内容
        writeFile(driveLetter, pathParts, content) {
            const [item, error] = this.navigateTo(driveLetter, pathParts);
            
            if (error) return `写入失败: ${error}`;
            if (!item || item.type !== 'file') return `不是文件或文件不存在`;
            
            item.content = content || '';
            item.modified = Date.now();
            
            return null;
        }
        
        // 删除文件或文件夹
        deletePath(driveLetter, pathParts) {
            if (pathParts.length === 0) {
                return `不能删除根目录`;
            }
            
            const parentPath = pathParts.slice(0, -1);
            const name = pathParts[pathParts.length - 1];
            
            const [parent] = this.navigateTo(driveLetter, parentPath);
            
            if (!parent || !parent.children.has(name)) {
                return `路径不存在: ${name}`;
            }
            
            parent.children.delete(name);
            return null;
        }
        
        // 重命名文件或文件夹
        renamePath(driveLetter, pathParts, newName) {
            // 验证新名称
            const nameError = this.validateName(newName);
            if (nameError) {
                return `新名称无效: ${nameError}`;
            }
            
            if (pathParts.length === 0) {
                return `不能重命名根目录`;
            }
            
            const parentPath = pathParts.slice(0, -1);
            const oldName = pathParts[pathParts.length - 1];
            
            const [parent] = this.navigateTo(driveLetter, parentPath);
            
            if (!parent || !parent.children.has(oldName)) {
                return `路径不存在: ${oldName}`;
            }
            
            if (parent.children.has(newName)) {
                return `目标名称已存在: ${newName}`;
            }
            
            const item = parent.children.get(oldName);
            item.name = newName;
            parent.children.delete(oldName);
            parent.children.set(newName, item);
            
            return null;
        }
        
        // 移动文件或文件夹
        movePath(sourceDrive, sourceParts, targetDrive, targetParts) {
            if (sourceDrive !== targetDrive) {
                return `跨盘移动暂不支持`;
            }
            
            if (sourceParts.length === 0) {
                return `不能移动根目录`;
            }
            
            const sourceParentPath = sourceParts.slice(0, -1);
            const sourceName = sourceParts[sourceParts.length - 1];
            
            const [sourceParent] = this.navigateTo(sourceDrive, sourceParentPath);
            if (!sourceParent || !sourceParent.children.has(sourceName)) {
                return `源路径不存在: ${sourceName}`;
            }
            
            const [targetParent] = this.navigateTo(targetDrive, targetParts);
            if (!targetParent || targetParent.type !== 'folder') {
                return `目标目录不存在`;
            }
            
            if (targetParent.children.has(sourceName)) {
                return `目标目录已存在同名项: ${sourceName}`;
            }
            
            const item = sourceParent.children.get(sourceName);
            sourceParent.children.delete(sourceName);
            targetParent.children.set(sourceName, item);
            
            return null;
        }
        
        // 复制文件
        copyPath(sourceDrive, sourceParts, targetDrive, targetParts) {
            if (sourceDrive !== targetDrive) {
                return `跨盘复制暂不支持`;
            }
            
            const [sourceItem, sourceError] = this.navigateTo(sourceDrive, sourceParts);
            if (sourceError || !sourceItem) {
                return `源路径不存在: ${sourceError}`;
            }
            
            if (sourceItem.type === 'folder') {
                return `暂不支持复制文件夹`;
            }
            
            // 验证目标名称
            if (targetParts.length > 0) {
                const targetName = targetParts[targetParts.length - 1];
                const nameError = this.validateName(targetName);
                if (nameError) {
                    return `目标名称无效: ${nameError}`;
                }
            }
            
            const targetParentPath = targetParts.slice(0, -1);
            const targetName = targetParts[targetParts.length - 1];
            
            const [targetParent] = this.navigateTo(targetDrive, targetParentPath);
            if (!targetParent || targetParent.type !== 'folder') {
                return `目标目录不存在`;
            }
            
            if (targetParent.children.has(targetName)) {
                return `目标目录已存在同名项: ${targetName}`;
            }
            
            const copiedFile = {
                type: 'file',
                name: targetName,
                content: sourceItem.content,
                modified: Date.now()
            };
            
            targetParent.children.set(targetName, copiedFile);
            
            return null;
        }
        
        // 检查路径是否存在
        pathExists(driveLetter, pathParts) {
            const [item, error] = this.navigateTo(driveLetter, pathParts);
            return !error && item !== null;
        }
        
        // 列出目录内容
        listDirectory(driveLetter, pathParts) {
            const [item, error] = this.navigateTo(driveLetter, pathParts);
            
            if (error) return `目录不存在: ${error}`;
            if (!item || item.type !== 'folder') return `不是目录或目录不存在`;
            
            const items = [];
            for (const [name, child] of item.children.entries()) {
                const type = child.type === 'file' ? '文件' : '文件夹';
                const size = child.type === 'file' ? ` (${child.content.length} 字节)` : '';
                items.push(`${name} [${type}]${size}`);
            }
            
            return items.length > 0 ? items.join('\n') : '空目录';
        }
        
        // 创建虚拟盘
        createDrive(driveLetter) {
            const driveError = this.validateDriveLetter(driveLetter);
            if (driveError) {
                return driveError;
            }
            
            driveLetter = driveLetter.toUpperCase();
            if (this.drives.has(driveLetter)) {
                return `虚拟盘已存在: ${driveLetter}`;
            }
            
            this.drives.set(driveLetter, {
                type: 'drive',
                name: driveLetter + ':',
                children: new Map()
            });
            
            return null;
        }
        
        // 删除虚拟盘
        deleteDrive(driveLetter) {
            const driveError = this.validateDriveLetter(driveLetter);
            if (driveError) {
                return driveError;
            }
            
            driveLetter = driveLetter.toUpperCase();
            if (!this.drives.has(driveLetter)) {
                return `虚拟盘不存在: ${driveLetter}`;
            }
            
            this.drives.delete(driveLetter);
            return null;
        }
    }
    
    // 创建全局文件系统实例
    const vfs = new VirtualFileSystem();
    
    // ---------------------------解释器-------------------------------------
    await BN.waitRunmgrLoaded();
    
    // 辅助函数：处理路径参数
    function parsePathParam(path) {
        if (!path || typeof path !== 'string') {
            return [null, null, '路径参数无效'];
        }
        return vfs.parsePath(path);
    }
    
    // 积木解释器实现
    BN.regMethod('SFS_create_drive', (params, _, __, ___) => {
        const driveLetter = params.letter;
        if (!driveLetter || typeof driveLetter !== 'string') {
            console.warn(`SFS_create_drive 错误: 盘符参数无效`);
            return;
        }
        
        const error = vfs.createDrive(driveLetter);
        if (error) {
            console.warn(`SFS_create_drive 错误: ${error}`);
        }
    });
    
    BN.regMethod('SFS_create_folders', (params, _, __, ___) => {
        const path = params.path;
        if (!path || typeof path !== 'string') {
            console.warn(`SFS_create_folders 错误: 路径参数无效`);
            return;
        }
        
        const [driveLetter, pathParts, error] = parsePathParam(path);
        if (error || !driveLetter) {
            console.warn(`SFS_create_folders 错误: ${error || '无效路径'}`);
            return;
        }
        
        const success = vfs.createFolderChain(driveLetter, pathParts);
        if (!success) {
            console.warn(`SFS_create_folders 错误: 创建文件夹链失败`);
        }
    });
    
    BN.regMethod('SFS_create_file', (params, _, __, ___) => {
        const path = params.path;
        const fileName = params.name;
        const content = params.content || '';
        
        if (!path || typeof path !== 'string' || !fileName || typeof fileName !== 'string') {
            console.warn(`SFS_create_file 错误: 参数无效`);
            return;
        }
        
        const [driveLetter, pathParts, error] = parsePathParam(path);
        if (error || !driveLetter) {
            console.warn(`SFS_create_file 错误: ${error || '无效路径'}`);
            return;
        }
        
        const result = vfs.createFile(driveLetter, pathParts, fileName, content);
        if (result) {
            console.warn(`SFS_create_file 错误: ${result}`);
        }
    });
    
    BN.regMethod('SFS_write', (params, _, __, ___) => {
        const path = params.path;
        const content = params.content || '';
        
        if (!path || typeof path !== 'string') {
            console.warn(`SFS_write 错误: 参数无效`);
            return;
        }
        
        const [driveLetter, pathParts, error] = parsePathParam(path);
        if (error || !driveLetter) {
            console.warn(`SFS_write 错误: ${error || '无效路径'}`);
            return;
        }
        
        const result = vfs.writeFile(driveLetter, pathParts, content);
        if (result) {
            console.warn(`SFS_write 错误: ${result}`);
        }
    });
    
    BN.regMethod('SFS_rename', (params, _, __, ___) => {
        const path = params.path;
        const newName = params.name;
        
        if (!path || typeof path !== 'string' || !newName || typeof newName !== 'string') {
            console.warn(`SFS_rename 错误: 参数无效`);
            return;
        }
        
        const [driveLetter, pathParts, error] = parsePathParam(path);
        if (error || !driveLetter) {
            console.warn(`SFS_rename 错误: ${error || '无效路径'}`);
            return;
        }
        
        const result = vfs.renamePath(driveLetter, pathParts, newName);
        if (result) {
            console.warn(`SFS_rename 错误: ${result}`);
        }
    });
    
    BN.regMethod('SFS_delete_drive', (params, _, __, ___) => {
        const driveLetter = params.letter;
        if (!driveLetter || typeof driveLetter !== 'string') {
            console.warn(`SFS_delete_drive 错误: 盘符参数无效`);
            return;
        }
        
        const error = vfs.deleteDrive(driveLetter);
        if (error) {
            console.warn(`SFS_delete_drive 错误: ${error}`);
        }
    });
    
    BN.regMethod('SFS_delete', (params, _, __, ___) => {
        const path = params.path;
        
        if (!path || typeof path !== 'string') {
            console.warn(`SFS_delete 错误: 参数无效`);
            return;
        }
        
        const [driveLetter, pathParts, error] = parsePathParam(path);
        if (error || !driveLetter) {
            console.warn(`SFS_delete 错误: ${error || '无效路径'}`);
            return;
        }
        
        const result = vfs.deletePath(driveLetter, pathParts);
        if (result) {
            console.warn(`SFS_delete 错误: ${result}`);
        }
    });
    
    BN.regMethod('SFS_move', (params, _, __, ___) => {
        const sourcePath = params.source_path;
        const targetPath = params.target_path;
        
        if (!sourcePath || typeof sourcePath !== 'string' || !targetPath || typeof targetPath !== 'string') {
            console.warn(`SFS_move 错误: 参数无效`);
            return;
        }
        
        const [sourceDrive, sourceParts, sourceError] = parsePathParam(sourcePath);
        const [targetDrive, targetParts, targetError] = parsePathParam(targetPath);
        
        if (sourceError || !sourceDrive) {
            console.warn(`SFS_move 错误: 源路径 ${sourceError || '无效'}`);
            return;
        }
        
        if (targetError || !targetDrive) {
            console.warn(`SFS_move 错误: 目标路径 ${targetError || '无效'}`);
            return;
        }
        
        const result = vfs.movePath(sourceDrive, sourceParts, targetDrive, targetParts);
        if (result) {
            console.warn(`SFS_move 错误: ${result}`);
        }
    });
    
    BN.regMethod('SFS_copy', (params, _, __, ___) => {
        const sourcePath = params.source_path;
        const targetPath = params.target_path;
        
        if (!sourcePath || typeof sourcePath !== 'string' || !targetPath || typeof targetPath !== 'string') {
            console.warn(`SFS_copy 错误: 参数无效`);
            return;
        }
        
        const [sourceDrive, sourceParts, sourceError] = parsePathParam(sourcePath);
        const [targetDrive, targetParts, targetError] = parsePathParam(targetPath);
        
        if (sourceError || !sourceDrive) {
            console.warn(`SFS_copy 错误: 源路径 ${sourceError || '无效'}`);
            return;
        }
        
        if (targetError || !targetDrive) {
            console.warn(`SFS_copy 错误: 目标路径 ${targetError || '无效'}`);
            return;
        }
        
        const result = vfs.copyPath(sourceDrive, sourceParts, targetDrive, targetParts);
        if (result) {
            console.warn(`SFS_copy 错误: ${result}`);
        }
    });
    
    BN.regMethod('SFS_read', (params, _, __, ___) => {
        const path = params.path;
        
        if (!path || typeof path !== 'string') {
            return "错误: 路径参数无效";
        }
        
        const [driveLetter, pathParts, error] = parsePathParam(path);
        if (error || !driveLetter) {
            return `错误: ${error || '无效路径'}`;
        }
        
        return vfs.readFile(driveLetter, pathParts);
    });
    
    BN.regMethod('SFS_check_existence', (params, _, __, ___) => {
        const path = params.path;
        
        if (!path || typeof path !== 'string') {
            return false;
        }
        
        const [driveLetter, pathParts, error] = parsePathParam(path);
        if (error || !driveLetter) {
            return false;
        }
        
        return vfs.pathExists(driveLetter, pathParts);
    });
    
    BN.regMethod('SFS_list', (params, _, __, ___) => {
        const path = params.path;
        
        if (!path || typeof path !== 'string') {
            return "错误: 路径参数无效";
        }
        
        const [driveLetter, pathParts, error] = parsePathParam(path);
        if (error || !driveLetter) {
            return `错误: ${error || '无效路径'}`;
        }
        
        return vfs.listDirectory(driveLetter, pathParts);
    });
    
    console.log("简单文件系统 扩展已加载😋");
})();