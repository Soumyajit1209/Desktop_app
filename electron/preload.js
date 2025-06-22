
import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  platform: process.platform,
  versions: process.versions,
  
  // Auth methods
  openAuthBrowser: () => ipcRenderer.invoke('open-auth-browser'),
  
  // Auth event listeners
  onAuthSuccess: (callback) => {
    ipcRenderer.on('auth-success', (event, userData) => callback(userData));
  },
  
  onAuthError: (callback) => {
    ipcRenderer.on('auth-error', (event, error) => callback(error));
  },
  
  // Cleanup listeners
  removeAuthListeners: () => {
    ipcRenderer.removeAllListeners('auth-success');
    ipcRenderer.removeAllListeners('auth-error');
  }
});