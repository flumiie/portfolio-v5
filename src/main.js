import './styles/style.css';
import './styles/boot.css';
import './iss_radar.js';
import './terminal.js';
import './notepad.js';
import './settings.js'
import { initStartMenu } from './start_menu.js';

initStartMenu();

// Save the theme color
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  document.documentElement.style.setProperty('--acent-color', savedTheme);
}

const clockElement = document.querySelector("#sys-clock")

const updateClock = () => {
  const now = new Date();
  const timeString = now.toTimeString().split(' ')[0];
  clockElement.textContent = timeString;
};

setInterval(updateClock, 1000);
updateClock();

const winWelcome = document.querySelector("#win-welcome");
const closeBtnWelcome = winWelcome.querySelector(".window-close-btn");
const tabWelcome = document.querySelector("#running-apps .taskbar-app-tab");

// Open and close Windows func
// Open Window
const closeWindow = (win, tab) => {
  win.style.display = "none";
  if (tab) tab.classList.remove("active");
};
// Close Window
const openWindow = (win, tab) => {
  win.style.display = "block";
  if (tab) tab.classList.add("active");
};

closeBtnWelcome.addEventListener("click", () => {
  closeWindow(winWelcome, tabWelcome);
})
tabWelcome.addEventListener("click", () => {
  if (winWelcome.style.display === "none")  {
    openWindow(winWelcome, tabWelcome);
    highestZIndex++;
    winWelcome.style.zIndex = highestZIndex
  } else {
    closeWindow(winWelcome, tabWelcome)
  }
});

// Draggable Window
const windows = document.querySelectorAll('.window');
let highestZIndex = 10;

windows.forEach(win => {
  const header = win.querySelector('.window-header');

  let isDragging= false;
  let offsetX = 0;
  let offsetY = 0;

  win.addEventListener('mousedown', () => {
    highestZIndex++;
    win.style.zIndex = highestZIndex;
  });

  header.addEventListener('mousedown', (e) => {
    if (e.target.classList.contains('window-close-btn')) return;

    isDragging = true;
    offsetX = e.clientX - win.offsetLeft;
    offsetY = e.clientY - win.offsetTop;
    
    header.style.cursor = 'grabbing';
    document.body.style.userSelect = 'none';
  });

  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    
    let newX = e.clientX - offsetX;
    let newY = e.clientY - offsetY;

    const minX = 0;
    const minY = 10;
    const maxX = window.innerWidth - win.offsetWidth;
    const maxY = window.innerHeight - win.offsetHeight - 45;

    if (newX < minX) newX = minX;
    if (newX > maxX) newX = maxX;
    if (newY < minY) newY = minY;
    if (newY > maxY) newY = maxY;

    win.style.left = `${newX}px`;
    win.style.top = `${newY}px`;
  });

  // Fin du glissement
  document.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      header.style.cursor = 'grab';
      document.body.style.userSelect = '';
    }
  });
});

// App Initialization
const initApp = (iconId, winId, tabId) => {
  const icon = document.querySelector(iconId);
  const win = document.querySelector(winId);
  const tab = document.querySelector(tabId);
  const closeBtn = win ? win.querySelector(".window-close-btn") : null;

  if (icon) {
    icon.addEventListener("click", (e) => {
      e.stopPropagation();
      document.querySelectorAll('.shortcut-icon').forEach(el => el.classList.remove("selected"));
      icon.classList.add("selected");
    });
  }

  if (icon && win && tab) {
    icon.addEventListener("dblclick", () => {
      win.style.display = "block";
      tab.style.display = "block";
      tab.classList.add("active");
      highestZIndex++;
      win.style.zIndex = highestZIndex;
    });
  }

  if (closeBtn && win && tab) {
    closeBtn.addEventListener("click", () => {
      win.style.display = "none";
      tab.style.display = "none";
      tab.classList.remove("active");
    });
  }
};

document.addEventListener("click", () => {
  document.querySelectorAll('.shortcut-icon').forEach(icon => icon.classList.remove("selected"));
});

initApp("#icon-archive", "#win-archive", "#tab-archive");
initApp("#icon-iss", "#win-iss", "#tab-iss");
initApp("#icon-term", "#win-term", "#tab-term");
initApp("#icon-notepad", "#win-notepad", "#tab-notepad");
initApp("#icon-settings", "#win-settings", "#tab-settings");

const archiveData = [
  {
    title: "SYS_TELEMETRY.LOG",
    date: "2026-07-21",
    content: "Telemetry tracking system successfully integrated into FerOS core architecture. Window pipeline tests show stable performance at 60fps. Main orbital dashboard is active."
  },
  {
    title: "ARIANE6_BOOSTER.LOG",
    date: "2026-01-15",
    content: "Solid rocket booster CAD profile complete. Loft operations successful. Static fire chamber pressure simulated and stabilized. Ready for final schematic review."
  },
  {
    title: "JWST_MIRROR_ASSY.LOG",
    date: "2025-12-10",
    content: "James Webb Space Telescope rear instrument chassis and primary mirror esquisse complete. Structural alignment within required tolerance for maquette assembly."
  }
];

const winArchive = document.querySelector("#win-archive");
const sidebar = document.querySelector("#archive-sidebar");
const viewer = document.querySelector("#archive-viewer");

const displayLogContent = (index) => {
  const log = archiveData[index];
  
  const winTitle = winArchive.querySelector(".window-title");
  winTitle.textContent = `LOG_ARCHIVE.EXE // ${log.title}`; 
  
  if (winArchive) {
    const winTitle = winArchive.querySelector(".window-title");
    if (winTitle) winTitle.textContent = `LOG_ARCHIVE.EXE // ${log.title}`; 
  }

  viewer.innerHTML = `
    <h2>${log.title}</h2>
    <p class="log-date">TIMESTAMP: ${log.date}</p>
    <p style="color: #b0b0b0; font-size: 0.9rem; line-height: 1.6; font-family: inherit;">> ${log.content}</p>
  `;
};

archiveData.forEach((item, index) => {
  const entry = document.createElement("div");
  entry.classList.add("sidebar-entry");
  
  entry.innerHTML = `
    <h4>${item.title}</h4>
    <span>${item.date}</span>
  `;
  
  entry.addEventListener("click", () => {
    document.querySelectorAll(".sidebar-entry").forEach(el => el.classList.remove("active"));
    entry.classList.add("active");
    displayLogContent(index);
  });

  sidebar.appendChild(entry);
});