// declare of variables
let heartCount = 0;
let coinCount = 100;
let copyCount = 0;

// Navbar DOM references
const heartCountEl = document.getElementById("heart-count");
const coinCountEl = document.getElementById("coin-count");
const copyCountEl = document.getElementById("copy-count");

// History references
const historyContainer = document.getElementById("history-container");
const clearHistoryBtn = document.getElementById("clear-history-btn");
const emptyHistoryText = document.getElementById("empty-history-text");

// 1. Heart Button Click Handler
const heartButtons = document.querySelectorAll(".heart-btn");
heartButtons.forEach((btn) => {
  btn.addEventListener("click", function () {
    heartCount++;
    heartCountEl.textContent = heartCount;

    // Toggle active filled heart styling
    const icon = this.querySelector("i");
    if (icon) {
      icon.classList.remove("fa-regular");
      icon.classList.add("fa-solid", "text-red-500");
    }
  });
});