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
    "1001": { name: "Aman Sharma", stream: "BCA" },
    "1002": { name: "Neha Verma", stream: "B.Com" },
    "1003": { name: "Rohit Singh", stream: "B.Sc" },
    "1004": { name: "Priya Gupta", stream: "BA" },
    "1005": { name: "Karan Yadav", stream: "B.Tech" },
    "1006": { name: "Anjali Mehta", stream: "BBA" },
    "1007": { name: "Arjun Rathore", stream: "MCA" },
    "1008": { name: "Meena Kumari", stream: "MBA" },
    "1009": { name: "Suresh Chauhan", stream: "M.Sc" },
    "1010": { name: "Kavita Joshi", stream: "B.Ed" }
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
        if (studentData[decodedText] && currentColumn) {
          const student = studentData[decodedText];
          currentColumn.value = `${student.name} (${decodedText}) - ${student.stream}`;
          popup.classList.add("hidden");
          enrollInput.value = "";
          personDetail.textContent = "";
        }
        html5QrCode.stop();
        stopScanBtn.classList.add("hidden");
        startScanBtn.classList.remove("hidden");
      },
      (err) => {
        console.log("Scan error:", err);
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
