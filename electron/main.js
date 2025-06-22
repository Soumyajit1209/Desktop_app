// electron/main.js
import { app, BrowserWindow, shell, ipcMain, session } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import isDev from 'electron-is-dev';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow;
let authWindow;

// Your Clerk configuration
const CLERK_FRONTEND_API = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
const AUTH_CALLBACK_URL = 'azmth://auth/callback';

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      preload: path.join(__dirname, 'preload.js')
    },
    show: false,
    titleBarStyle: 'default'
  });

  // Fixed URL logic for development vs production
  const startUrl = isDev 
    ? 'http://localhost:3000' 
    : `file://${path.join(__dirname, '../dist/index.html')}`;
  
  console.log('Loading URL:', startUrl);
  console.log('isDev:', isDev);
  
  mainWindow.loadURL(startUrl).catch(err => {
    console.error('Failed to load URL:', err);
    
    // Fallback for development - try alternative localhost ports
    if (isDev) {
      console.log('Trying fallback URL...');
      mainWindow.loadURL('http://127.0.0.1:3000').catch(fallbackErr => {
        console.error('Fallback URL also failed:', fallbackErr);
      });
    }
  });

  mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription, validatedURL) => {
    console.error('Failed to load:', errorCode, errorDescription, validatedURL);
    
    // Show error page in development
    if (isDev) {
      mainWindow.loadURL('data:text/html,<h1>Development server not ready</h1><p>Please ensure Next.js dev server is running on http://localhost:3000</p>');
    }
  });

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  
    if (isDev) {
      mainWindow.webContents.openDevTools();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

function createAuthWindow() {
  authWindow = new BrowserWindow({
    width: 500,
    height: 700,
    show: false,
    parent: mainWindow,
    modal: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    }
  });

  // Load your auth URL
  const authUrl = isDev 
    ? 'http://localhost:3000/auth/electron' 
    : 'https://your-auth-domain.com/auth/electron';
  
  console.log('Loading auth URL:', authUrl);
  
  authWindow.loadURL(authUrl);

  authWindow.once('ready-to-show', () => {
    authWindow.show();
  });

  // Handle navigation to catch the callback
  authWindow.webContents.on('will-navigate', (event, navigationUrl) => {
    console.log('Auth window navigating to:', navigationUrl);
    handleAuthNavigation(navigationUrl);
  });

  authWindow.webContents.on('did-navigate', (event, navigationUrl) => {
    console.log('Auth window navigated to:', navigationUrl);
    handleAuthNavigation(navigationUrl);
  });

  authWindow.on('closed', () => {
    authWindow = null;
  });
}

function handleAuthNavigation(url) {
  console.log('Handling auth navigation:', url);
  
  if (url.startsWith(AUTH_CALLBACK_URL)) {
    const urlObj = new URL(url);
    const token = urlObj.searchParams.get('token');
    const error = urlObj.searchParams.get('error');

    if (error) {
      console.error('Auth error:', error);
      mainWindow.webContents.send('auth-error', error);
    } else if (token) {
      console.log('Auth token received, verifying...');
      verifyTokenAndGetUser(token);
    }

    if (authWindow) {
      authWindow.close();
    }
  }
}

async function verifyTokenAndGetUser(token) {
  try {
    const verifyUrl = isDev 
      ? 'http://localhost:3000/api/auth/verify'
      : 'https://your-domain.com/api/auth/verify';
    
    console.log('Verifying token with:', verifyUrl);
    
    const response = await fetch(verifyUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    });

    if (response.ok) {
      const userData = await response.json();
      console.log('User data received:', userData);
      mainWindow.webContents.send('auth-success', userData);
    } else {
      const errorText = await response.text();
      console.error('Token verification failed:', response.status, errorText);
      mainWindow.webContents.send('auth-error', 'Failed to verify token');
    }
  } catch (error) {
    console.error('Token verification error:', error);
    mainWindow.webContents.send('auth-error', 'Authentication failed');
  }
}

// IPC handlers
ipcMain.handle('open-auth-browser', () => {
  console.log('Opening auth browser...');
  createAuthWindow();
});

// Handle custom protocol for auth callback
app.setAsDefaultProtocolClient('azmth');

app.on('open-url', (event, url) => {
  console.log('Custom protocol opened:', url);
  event.preventDefault();
  if (url.startsWith(AUTH_CALLBACK_URL)) {
    handleAuthNavigation(url);
  }
});

app.whenReady().then(() => {
  console.log('App ready, creating window...');
  
  // Register custom protocol
  session.defaultSession.protocol.registerHttpProtocol('azmth', (request, callback) => {
    console.log('Custom protocol request:', request.url);
    callback({ statusCode: 200 });
  });

  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('web-contents-created', (event, contents) => {
  contents.on('new-window', (event, navigationUrl) => {
    event.preventDefault();
    shell.openExternal(navigationUrl);
  });
});