import "./styles/terminal.css";

const outputArea = document.querySelector("#terminal-output");
const inputField = document.querySelector("#terminal-input");
const promptUserSpan = document.querySelector("#terminal-prompt-user");

// Get UserName
let currentUsername = localStorage.getItem("user") || "root";
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

const printToTerminal = (text, color = "#00ffcc") => {
  const p = document.createElement("p");
  p.style.color = color;
  p.textContent = text;
  outputArea.appendChild(p);
  const terminalBody = document.querySelector("#terminal-body");
  terminalBody.scrollTop = terminalBody.scrollHeight;
};

const handleCommand = (cmd) => {
  const cleanCmd = cmd.trim().toLowerCase();
  printToTerminal(`${currentUsername}@fer-os:~$ ${cmd}`, "#888");

  switch (cleanCmd) {
    case "help":
      printToTerminal("Available commands:");
      printToTerminal("  help   - Show this help menu");
      printToTerminal("  date   - Display current system time");
      printToTerminal("  iss    - Quick query on ISS telemetry");
      printToTerminal("  clear  - Clear terminal screen");
      printToTerminal("  whoami - Display current session user");
      break;

    case "date":
      printToTerminal(new Date().toString());
      break;

    case "iss":
      printToTerminal("Fetching ISS status via orbital relay...");
      fetch("https://api.wheretheiss.at/v1/satellites/25544")
        .then((res) => res.json())
        .then((data) => {
          printToTerminal(
            `-> Lat: ${data.latitude.toFixed(2)} | Lon: ${data.longitude.toFixed(2)} | Alt: ${data.altitude.toFixed(0)} km`,
          );
        })
        .catch(() => printToTerminal("Error: Orbital uplink failed.", "red"));
      break;

    case "clear":
      outputArea.innerHTML = "";
      break;

    case "whoami":
      printToTerminal(
        `${currentUsername} [Authorized Mission Control Operator]`,
      );
      break;

    case "":
      break;

    default:
      printToTerminal(
        `Command not recognized: '${cmd}'. Type 'help' for options.`,
        "#ff4a00",
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
