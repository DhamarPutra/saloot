function Security() {
  document.addEventListener("contextmenu", (e) => {
    e.preventDefault(); // Mencegah klik kanan
  });

  document.addEventListener("keydown", (e) => {
    // Mencegah kombinasi tombol Ctrl+C, Ctrl+X, Ctrl+U, F12, Ctrl+Shift+I dan Ctrl+A
    if (
      (e.ctrlKey &&
        (e.key === "c" || e.key === "x" || e.key === "u" || e.key === "a")) ||
      (e.metaKey && e.key === "c") ||
      e.key === "F12" ||
      ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "I")
    ) {
      e.preventDefault();
    }
  });
}

module.exports = Security;