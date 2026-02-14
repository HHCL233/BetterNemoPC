import CryptoJS from 'crypto-js';

export class SecureAES {
    static readonly PBKDF2_ITERATIONS = 100000;
    static readonly MAX_DATE_RANGE = 30;
    static readonly DATE_PATTERN = 'yyyyMMdd';

    private static keyCache: Map<string, CryptoJS.lib.WordArray> = new Map();

    /**
     * AES 加密（使用今日日期生成密钥）
     */
    static encrypt(plaintext: string): string {
        // 1. 生成日期密钥
        const today = new Date();
        const dateKey = this.formatDate(today);
        const password = this.generatePasswordFromDate(today);

        // 2. 生成随机数
        const salt = CryptoJS.lib.WordArray.random(16);
        const iv = CryptoJS.lib.WordArray.random(16);

        // 3. 派生密钥
        const key = CryptoJS.PBKDF2(
            password,
            salt,
            {
                keySize: 256 / 32, // 256位
                iterations: this.PBKDF2_ITERATIONS,
                hasher: CryptoJS.algo.SHA256
            }
        );


        // 4. 分割密钥
        const encryptKey = CryptoJS.lib.WordArray.create(key.words.slice(0, 8));
        const hmacKey = CryptoJS.lib.WordArray.create(key.words.slice(8, 16));


        // 5. AES加密
        const encrypted = CryptoJS.AES.encrypt(
            plaintext,
            encryptKey,
            {
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            }
        ).toString();


        // 6. HMAC计算
        const hmacSource = salt.toString(CryptoJS.enc.Base64) +
            iv.toString(CryptoJS.enc.Base64) +
            encrypted;
        const hmac = CryptoJS.HmacSHA256(hmacSource, hmacKey);
        const hmacB64 = hmac.toString(CryptoJS.enc.Base64);

        // 7. 组装结果
        const result = [
            dateKey,
            salt.toString(CryptoJS.enc.Base64),
            iv.toString(CryptoJS.enc.Base64),
            encrypted,
            hmacB64
        ].join(':');

        return result;
    }

    /**
     * AES 解密
     */
    static decrypt(ciphertext: string): string {
        try {


            // 1. 解析密文
            const parts = ciphertext.split(':');
            if (parts.length !== 5) {
                throw new Error(`无效的密文格式：字段数量错误 (期望5, 实际${parts.length})`);
            }

            const [dateKey, saltB64, ivB64, encryptedB64, hmacB64] = parts;

            // 2. 解析base64
            const salt = CryptoJS.enc.Base64.parse(saltB64);
            const iv = CryptoJS.enc.Base64.parse(ivB64);
            const expectedHmac = CryptoJS.enc.Base64.parse(hmacB64);

            // 3. 获取加密时的日期并生成密码
            const encryptDate = this.parseDate(dateKey);
            const password = this.generatePasswordFromDate(encryptDate);

            // 4. 派生密钥（与加密完全一致）
            const key = CryptoJS.PBKDF2(
                password,
                salt,
                {
                    keySize: 256 / 32, // 与加密保持一致
                    iterations: this.PBKDF2_ITERATIONS,
                    hasher: CryptoJS.algo.SHA256
                }
            );


            // 5. 分割密钥
            const encryptKey = CryptoJS.lib.WordArray.create(key.words.slice(0, 8));
            const hmacKey = CryptoJS.lib.WordArray.create(key.words.slice(8, 16));


            // 6. HMAC验证
            const hmacSource = saltB64 + ivB64 + encryptedB64;
            const actualHmac = CryptoJS.HmacSHA256(hmacSource, hmacKey);
            const actualHmacB64 = actualHmac.toString(CryptoJS.enc.Base64);

            if (actualHmacB64 !== hmacB64) {
                throw new Error('HMAC校验失败');
            }


            // 7. AES解密
            const decrypted = CryptoJS.AES.decrypt(
                encryptedB64,
                encryptKey,
                {
                    iv: iv,
                    mode: CryptoJS.mode.CBC,
                    padding: CryptoJS.pad.Pkcs7
                }
            );

            // 8. 转换为UTF8字符串
            const plaintext = decrypted.toString(CryptoJS.enc.Utf8);

            if (!plaintext) {
                throw new Error('解密结果为空');
            }

            return plaintext;
        } catch (e) {
            const errorMsg = e instanceof Error ? e.message : '未知错误';
            console.error('[解密] 失败:', errorMsg);
            throw new Error(`解密失败：${errorMsg}`);
        }
    }

    /**
     * 生成密码
     */
    private static generatePasswordFromDate(date: Date): string {
        const dateStr = this.formatDate(date);
        return `SECURE_KEY_${dateStr}`;
    }

    /**
     * 格式化日期
     */
    private static formatDate(date: Date): string {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}${month}${day}`;
    }

    /**
     * 解析日期
     */
    private static parseDate(dateStr: string): Date {
        const year = parseInt(dateStr.substring(0, 4), 10);
        const month = parseInt(dateStr.substring(4, 6), 10) - 1;
        const day = parseInt(dateStr.substring(6, 8), 10);
        return new Date(year, month, day);
    }

    /**
     * 验证日期格式
     */
    private static isValidDateFormat(dateStr: string): boolean {
        return /^\d{8}$/.test(dateStr);
    }

    /**
     * 测试方法
     */
    static test(): boolean {
        try {
            console.log('=== SecureAES 自测开始 ===');
            const testStr = 'test_password_123';
            console.log('原文:', testStr);

            const encrypted = this.encrypt(testStr);
            console.log('加密结果:', encrypted);

            const decrypted = this.decrypt(encrypted);
            console.log('解密结果:', decrypted);

            const success = testStr === decrypted;
            console.log('测试结果:', success ? '成功' : '失败');
            console.log('=== SecureAES 自测结束 ===');

            return success;
        } catch (e) {
            console.error('测试失败:', e);
            return false;
        }
    }
}