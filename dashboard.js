document.addEventListener("DOMContentLoaded", () => {
  const addColumnBtn = document.getElementById("addColumn");
  const columnsDiv = document.getElementById("columns");
  const popup = document.getElementById("popup");
  const closePopup = document.getElementById("closePopup");
  const okBtn = document.getElementById("okBtn");
  const enrollInput = document.getElementById("enrollInput");
  const personDetail = document.getElementById("personDetail");
  const startScanBtn = document.getElementById("startScan");
  const stopScanBtn = document.getElementById("stopScan");
  let currentColumn = null;
  let html5QrCode;

  const studentData = {
    "101": { name: "Aman Sharma", stream: "BCA" },
    "102": { name: "Priya Verma", stream: "B.Com" },
    "103": { name: "Rohit Singh", stream: "B.Sc" },
    "104": { name: "Sneha Gupta", stream: "BA" },
    "105": { name: "Arjun Mehta", stream: "B.Tech" }
  };

  addColumnBtn.addEventListener("click", () => {
    const column = document.createElement("div");
    column.className = "column";
    for (let i = 0; i < 5; i++) {
      const input = document.createElement("input");
      input.type = "text";
      input.placeholder = "Click to add";
      input.readOnly = true;
      input.addEventListener("click", () => {
        currentColumn = input;
        popup.classList.remove("hidden");
      });
      column.appendChild(input);
    }
    columnsDiv.appendChild(column);
  });

  closePopup.addEventListener("click", () => {
    popup.classList.add("hidden");
    personDetail.textContent = "";
    enrollInput.value = "";
    if (html5QrCode) {
      html5QrCode.stop();
      stopScanBtn.classList.add("hidden");
      startScanBtn.classList.remove("hidden");
    }
  });

  okBtn.addEventListener("click", () => {
    const enroll = enrollInput.value.trim();
    if (studentData[enroll] && currentColumn) {
      currentColumn.value = `${studentData[enroll].name} (${enroll}) - ${studentData[enroll].stream}`;
    }
    popup.classList.add("hidden");
    personDetail.textContent = "";
    enrollInput.value = "";
  });

  enrollInput.addEventListener("input", () => {
    const enroll = enrollInput.value.trim();
    if (studentData[enroll]) {
      personDetail.textContent = `${studentData[enroll].name} - ${studentData[enroll].stream}`;
    } else {
      personDetail.textContent = "";
    }
  });

  startScanBtn.addEventListener("click", () => {
    html5QrCode = new Html5Qrcode("qr-reader");
    const config = { fps: 10, qrbox: 250 };

    html5QrCode.start(
      { facingMode: "environment" },
      config,
      (decodedText) => {
        if (studentData[decodedText]) {
          enrollInput.value = decodedText;
          personDetail.textContent = `${studentData[decodedText].name} - ${studentData[decodedText].stream}`;
        }
        html5QrCode.stop();
        stopScanBtn.classList.add("hidden");
        startScanBtn.classList.remove("hidden");
      },
      (err) => {
        console.log(err);
      }
    );

    startScanBtn.classList.add("hidden");
    stopScanBtn.classList.remove("hidden");
  });

  stopScanBtn.addEventListener("click", () => {
    if (html5QrCode) {
      html5QrCode.stop();
      stopScanBtn.classList.add("hidden");
      startScanBtn.classList.remove("hidden");
    }
  });
});
