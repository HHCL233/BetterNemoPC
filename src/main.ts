import { app, BrowserWindow, Menu, session, ipcMain, dialog } from 'electron';
import path from 'node:path';
import started from 'electron-squirrel-startup';
import fetch, { RequestInit as NodeFetchRequestInit } from 'node-fetch';
import { parse } from 'set-cookie-parser';
import * as os from "os";
import * as fs from "fs/promises";
import Store from 'electron-store'

interface CookiesSetDetails {
  url: string;
  name: string;
  value: string;
  domain?: string;
  path?: string;
  secure?: boolean;
  httpOnly?: boolean;
  expirationDate?: number;
  sameSite?: 'no_restriction' | 'unspecified' | 'lax' | 'strict';
  hostOnly?: boolean;
}

type SameSiteCookie = 'no_restriction' | 'unspecified' | 'lax' | 'strict';

declare global {
  var store: Store<Record<string, unknown>>;
}

const store = new Store()
global.store = store

function getDocumentsFolder(directory: string) {
  const platform = os.platform();
  const homeDir = os.homedir();

  if (platform === "win32") {
    return path.join(homeDir, directory);
  } else if (platform === "darwin") {
    return path.join(homeDir, directory);
  } else {
    return path.join(homeDir, directory);
  }
}

interface RequestOptions {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: Record<string, any>;
  withCredentials?: boolean;
}

const createWindow = () => {
  Menu.setApplicationMenu(null)
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    minWidth: 1280,
    minHeight: 720,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      partition: 'persist:main-session',
      webSecurity: true,
      allowRunningInsecureContent: false,
      session: session.defaultSession,
    },
  });

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`),
    );
  }

  mainWindow.webContents.openDevTools();
};

app.on('ready', createWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});


ipcMain.handle('universal-request', async (_, options: RequestOptions) => {
  const {
    url,
    method = 'GET',
    headers = {},
    body = {},
    withCredentials = true,
  } = options;

  try {
    const fetchOptions: NodeFetchRequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    };

    if (['POST', 'PUT', 'DELETE'].includes(method) && body) {
      fetchOptions.body = JSON.stringify(body) as string;
    }

    const cookieSession = session.defaultSession;
    if (withCredentials) {
      const urlObj = new URL(url);
      const cookies = await cookieSession.cookies.get({ url: urlObj.href });
      if (cookies.length > 0) {
        const cookieStr = cookies.map(c => `${c.name}=${c.value}`).join('; ');
        fetchOptions.headers = {
          ...fetchOptions.headers,
          Cookie: cookieStr,
        };
      }
    }

    const response = await fetch(url, fetchOptions);

    const setCookieHeaders = response.headers.raw()['set-cookie'] || [];
    if (setCookieHeaders.length > 0) {
      const parsedCookies = parse(setCookieHeaders, {
        decodeValues: true,
        map: false
      });
      const urlObj = new URL(url);
      const cookieDomain = urlObj.hostname;
      const cookieProtocol = urlObj.protocol;

      for (const cookie of parsedCookies) {
        const validSameSiteValues: SameSiteCookie[] = ['no_restriction', 'unspecified', 'lax', 'strict'];
        const sameSiteValue: SameSiteCookie = validSameSiteValues.includes(cookie.sameSite as SameSiteCookie)
          ? (cookie.sameSite as SameSiteCookie)
          : 'no_restriction';

        const cookieOptions: CookiesSetDetails = {
          url: `${cookieProtocol}//${cookieDomain}`,
          name: cookie.name,
          value: cookie.value,
          domain: cookie.domain || cookieDomain,
          path: cookie.path || '/',
          httpOnly: cookie.httpOnly || false,
          secure: cookie.secure || cookieProtocol === 'https:',
          expirationDate: cookie.expires ? cookie.expires.getTime() / 1000 : undefined,
          sameSite: sameSiteValue,
          hostOnly: !cookie.domain,
        };

        try {
          await cookieSession.cookies.set(cookieOptions as any);
          console.log(`成功设置Cookie`);
        } catch (err) {
          console.error(`设置Cookie失败:`);
        }
      }
    }

    let responseData: any;
    const responseClone = response.clone();

    try {
      responseData = await response.json();
    } catch (jsonError) {
      try {
        responseData = await responseClone.text();
      } catch (textError) {
        responseData = '';
        console.warn('响应体解析失败，返回空字符串:', textError);
      }
    }
    console.log('请求完成')
    return {
      success: true,
      status: response.status,
      data: responseData,
    };
  } catch (error) {
    console.error(`请求${url}失败：`, error);
    return {
      success: false,
      error: (error as Error).message,
      status: 0,
    };
  }
});

ipcMain.handle("show-open-dialog", async (event, options) => {
  try {
    const result = await dialog.showOpenDialog(options);
    return result;
  } catch (error) {
    return null;
  }
});

ipcMain.handle("read-file", async (event, filePath) => {
  console.log(getDocumentsFolder(filePath));
  try {
    const data = await fs.readFile(getDocumentsFolder(filePath), "utf8");
    return { success: true, data };
  } catch (error: any) {
    console.error({ success: false, error: error.message });
    return { success: false, error: error.message };
  }
});

ipcMain.handle('get-config', (event, key) => {
  return store.get(key)
});

ipcMain.handle('set-config', (event, key, value) => {
  store.set(key, value);
  return true;
});

ipcMain.handle('delete-config', (event, key) => {
  store.delete(key);
  return true;
});

ipcMain.handle('claer-data', (event) => {
  const cookieSession = session.defaultSession;
  cookieSession.clearData()
  return true;
});