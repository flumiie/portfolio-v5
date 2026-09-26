export const initStartMenu = () => {
  const startBtn = document.querySelector("#start-btn");
  const startMenu = document.querySelector("#start-menu");

  startBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (startMenu.style.display === "block") {
      startMenu.style.display = "none";
    } else {
      startMenu.style.display = "block";
    }
  });

  document.addEventListener("click", () => {
    if (startMenu) {
      startMenu.style.display = "none";
    }
  });

  startMenu.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  // 3. Open app from start menu
  let menuZIndex = 50;

  const setupAppShortcut = (menuId, winId, tabId) => {
    const menuItem = document.querySelector(menuId);
    const win = document.querySelector(winId);
    const tab = document.querySelector(tabId);

    if (menuItem && win && tab) {
      menuItem.addEventListener("click", () => {
        win.style.display = "block";
        tab.style.display = "block";
        tab.classList.add("active");
        
        menuZIndex++;
        win.style.zIndex = menuZIndex;
        
        startMenu.style.display = "none";
      });
    }
  };

  // Associate the app with the menu
  setupAppShortcut("#menu-archive", "#win-archive", "#tab-archive");
  setupAppShortcut("#menu-iss", "#win-iss", "#tab-iss");
  setupAppShortcut("#menu-term", "#win-term", "#tab-term");
  setupAppShortcut("#menu-notepad", "#win-notepad", "#tab-notepad");
};