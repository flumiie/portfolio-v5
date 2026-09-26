const themeButtons = document.querySelectorAll(".theme-btn");

themeButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const selectedColor = btn.getAttribute("data-color");

    document.documentElement.style.setProperty("--accent-color", selectedColor);

    localStorage.setItem("theme", selectedColor);
  });
});
