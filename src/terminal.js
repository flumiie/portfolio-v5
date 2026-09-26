import "./styles/terminal.css";

const outputArea = document.querySelector("#terminal-output");
const inputField = document.querySelector("#terminal-input");
const promptUserSpan = document.querySelector("#terminal-prompt-user");

// Get UserName
let currentUsername = localStorage.getItem("user") || "flumi";
if (promptUserSpan) {
  promptUserSpan.textContent = `${currentUsername}@fer-os:~$`;
}

// Boot Screen
const bootScreen = document.querySelector("#boot-screen");
const bootInput = document.querySelector("#boot-username-input");
const bootBtn = document.querySelector("#boot-btn");

if (bootInput && bootScreen) {
  bootScreen.style.display = "none";
}

const handleBoot = () => {
  const enteredName = bootInput.value.trim();
  if (enteredName !== "") {
    currentUsername = enteredName;
    localStorage.setItem("user", currentUsername);
  }
  if (promptUserSpan) {
    promptUserSpan.textContent = `${currentUsername}@fer-os:~$`;
  }
  if (bootScreen) {
    bootScreen.style.display = "none";
  }
};

if (bootBtn) {
  bootBtn.addEventListener("click", handleBoot);
}
if (bootInput) {
  bootInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleBoot();
  });
}

const printf = (text, color = "#00ffcc") => {
  const p = document.createElement("p");
  p.style.color = color;
  p.textContent = text;
  outputArea.appendChild(p);
  const terminalBody = document.querySelector("#terminal-body");
  terminalBody.scrollTop = terminalBody.scrollHeight;
};

const handleCommand = (cmd) => {
  const cleanCmd = cmd.trim().toLowerCase();
  printf(`${currentUsername}@fer-os:~$ ${cmd}`, "#888");

  switch (cleanCmd) {
    case "help":
      printf("Available commands:");
      printf(" help - Show this help menu");
      printf(" date - Display current system time");
      printf(" iss - Quick query on ISS telemetry");
      printf(" portf - Check out my portfolio in CLI");
      printf(" whoami - Display current session user");
      printf(" clear, cls  - Clear terminal screen");
      break;

    case "date":
      printf(new Date().toString());
      break;

    case "iss":
      printf("Fetching ISS status via orbital relay...");
      fetch("https://api.wheretheiss.at/v1/satellites/25544")
        .then((res) => res.json())
        .then((data) => {
          printf(
            `-> Lat: ${data.latitude.toFixed(2)} | Lon: ${data.longitude.toFixed(2)} | Alt: ${data.altitude.toFixed(0)} km`,
          );
        })
        .catch(() => printf("Error: Orbital uplink failed.", "red"));
      break;

    case "portf":
      printf("-----------------------------------------------------");
      printf("Welcome to the portfolio of Ferick Andrew a.k.a flumi");
      printf("-----------------------------------------------------");
      printf("-", "transparent");
      printf("lorem");
      printf("-", "transparent");
      break;

    case "whoami":
      printf(`${currentUsername} [Authorized Mission Control Operator]`);
      break;

    case "clear":
      outputArea.innerHTML = "";
      break;
    case "cls":
      outputArea.innerHTML = "";
      break;

    case "":
      break;

    default:
      printf(
        `Command not recognized: '${cmd}'. Type 'help' for options.`,
        "#ff0000",
      );
      break;
  }
};

if (inputField) {
  inputField.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      handleCommand(inputField.value);
      inputField.value = "";
    }
  });
}
// Input focus on terminal body click000
const terminalBody = document.querySelector("#terminal-body");
if (terminalBody && inputField) {
  terminalBody.addEventListener("click", () => {
    inputField.focus();
  });
}

const termIcon = document.querySelector("#icon-term");
const menuTerm = document.querySelector("#menu-term");

const focusTerminal = () => {
  setTimeout(() => {
    if (inputField) inputField.focus();
  }, 50); // Petit délai pour laisser la fenêtre s'afficher
};

if (termIcon) termIcon.addEventListener("dblclick", focusTerminal);
if (menuTerm) menuTerm.addEventListener("click", focusTerminal);
