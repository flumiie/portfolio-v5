const textarea = document.querySelector("#notepad-textarea");

if (textarea) {
  const savedNote = localStorage.getItem("note");
  if (savedNote) {
    textarea.value = savedNote;
  }

  textarea.addEventListener("input", () => {
    localStorage.setItem("note", textarea.value);
  });
}