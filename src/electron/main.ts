import { app, BrowserWindow, screen } from "electron";
import { ipcMainHandle, isDev } from "./util.js";

import { getPreloadPath, getUIPath } from "./pathResolver.js";
import { createTray } from "./tray.js";
import { createMenu } from "./menu.js";
import { deleteToken, getToken, setToken } from "./token-manager.js";

app.on("ready", () => {
  const primaryDisplay = screen.getPrimaryDisplay();
  const { x, y, width, height } = primaryDisplay.workArea;

  const mainWindow = new BrowserWindow({
    x,
    y,
    width,
    height,
    webPreferences: {
      preload: getPreloadPath(),
    },
  });

  if (isDev()) {
    mainWindow.loadURL("http://localhost:5123");
  } else {
    mainWindow.loadFile(getUIPath());
  }

  ipcMainHandle(
    "setToken",
    async (_, payload: { name: string; token: string }) => {
      const { name, token } = payload;

      await setToken(name, token);
      return true;
    }
  );

  ipcMainHandle("getToken", async (_, name: string) => {
    return await getToken(name);
  });

  ipcMainHandle("deleteToken", async (_, name: string) => {
    return await deleteToken(name);
  });

  createTray(mainWindow);
  handleCloseEvents(mainWindow);
  createMenu(mainWindow);
});

app.on("before-quit", async () => {
  try {
    await deleteToken("auth");
    console.log("Auth token deleted on quit");
  } catch (err) {
    console.error("Failed to delete auth token on quit:", err);
  }
});

function handleCloseEvents(mainWindow: BrowserWindow) {
  let willClose = false;

  mainWindow.on("close", (e) => {
    if (willClose) {
      return;
    }
    e.preventDefault();
    mainWindow.hide();
    if (app.dock) {
      app.dock.hide();
    }
  });

  app.on("before-quit", () => {
    willClose = true;
  });

  mainWindow.on("show", () => {
    willClose = false;
  });
}
