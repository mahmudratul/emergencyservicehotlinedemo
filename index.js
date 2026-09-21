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

        // Toggle korbo heart ar style korbo full red dekhabo. this diye bojhay user kon button e click korse ota.
        const icon = this.querySelector("i");
        if (icon) {
            icon.classList.remove("fa-regular");
            icon.classList.add("fa-solid", "text-red-500");
        }
        // eikhaner ei property ta fontawsome er icon er class change korar jonno use kora hoyeche. jodi user kono heart button e click kore tahole oi button er icon ta full red hoye jabe.
    });
});

// 2. Call Button Click Handler
const callButtons = document.querySelectorAll(".call-btn");
callButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
        // Check coin balance requirement
        if (coinCount < 20) {
            alert("Insufficient coins! You need at least 20 coins to make an emergency call.");
            return;
        }
        // eikhane return disi karon hoilo jodi eita condition true hoy tahole baki code gulo execute hobe na. mane jodi coin count 20 er kom hoy tahole alert show korbe and baki code gulo execute hobe na.

        // Identify card and details
        const card = this.closest(".card");
        const serviceName = card.querySelector(".service-name").innerText.trim();
        const serviceNumber = card.querySelector(".service-number").innerText.trim();

        // Deduct coins & update UI
        coinCount -= 20;
        coinCountEl.textContent = coinCount;

        // Trigger alert
        alert(`Calling ${serviceName} at ${serviceNumber}...`);

        // Hide empty state placeholder
        if (emptyHistoryText) {
            emptyHistoryText.style.display = "none";
        }
        // Get current local time formatted (e.g. 11:36:58 AM)
        const callTime = new Date().toLocaleTimeString();

        // Append to Call History
        const historyItem = document.createElement("div");
        historyItem.className = "flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100";
        historyItem.innerHTML = `
      <div>
        <h4 class="text-xs font-bold text-gray-800 leading-tight">${serviceName}</h4>
        <span class="text-xs text-gray-500 font-medium">${serviceNumber}</span>
      </div>
      <div class="text-[11px] text-gray-500 font-medium tracking-tight">
        ${callTime}
      </div>
    `;

        historyContainer.prepend(historyItem);
        // appendChild() দিলে নতুন কলটি তালিকার সবার নিচে ঢুকত।

        // কিন্তু কল হিস্ট্রির স্বাভাবিক নিয়ম হলো সবচেয়ে সাম্প্রতিক কলটি সবার উপরে থাকবে। তাই prepend() মেথড ব্যবহার করা হয়েছে, যা নতুন এলিমেন্টকে কন্টেইনারের একদম শুরুতে ঢুকিয়ে দেয়।
    });
});


// 3. Copy Button Click Handler
const copyButtons = document.querySelectorAll(".copy-btn");
copyButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
        const card = this.closest(".card");
        const serviceNumber = card.querySelector(".service-number").innerText.trim();

        // Write to clipboard
        navigator.clipboard.writeText(serviceNumber)
            .then(() => {
                // Increment Copy Count mane hoilo copy korsi seta barbe
                copyCount++;
                copyCountEl.textContent = copyCount;
                alert(`Number ${serviceNumber} copied to clipboard!`);
            })
            .catch((err) => {
                console.error("Failed to copy number: ", err);
            });
    });
});

//  Clear History button
clearHistoryBtn.addEventListener("click", function () {
    historyContainer.innerHTML = "";
    if (emptyHistoryText) {
        emptyHistoryText.style.display = "block";
        historyContainer.appendChild(emptyHistoryText);
        // যেহেতু সব হিস্ট্রি ডিলিট হয়ে গেছে, এখন আবার আগের মতো নোটিফিকেশন টেক্সট ("No call history recorded yet.") দেখানো দরকার।
    }
});