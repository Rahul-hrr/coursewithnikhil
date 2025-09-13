const addColumnBtn = document.getElementById('addColumn');
const columnsContainer = document.getElementById('columns');
const popup = document.getElementById('popup');
const closePopup = document.getElementById('closePopup');
const okBtn = document.getElementById('okBtn');
const enrollInput = document.getElementById('enrollInput');
const personDetail = document.getElementById('personDetail');
const qrReader = document.getElementById('qr-reader');

let activeInput = null;
let html5QrCode = null;

const students = {
  1001: { name: "Aman Sharma", stream: "BCA" },
  1002: { name: "Neha Verma", stream: "BCA" },
  1003: { name: "Rohit Singh", stream: "B.Tech" },
  1004: { name: "Priya Gupta", stream: "B.Tech" },
  1005: { name: "Karan Yadav", stream: "B.Sc" },
  1006: { name: "Anjali Mehta", stream: "B.Sc" },
  1007: { name: "Arjun Rathore", stream: "MCA" },
  1008: { name: "Meena Kumari", stream: "MCA" },
  1009: { name: "Suresh Chauhan", stream: "M.Tech" },
  1010: { name: "Kavita Joshi", stream: "M.Tech" }
};

function createColumn() {
  const col = document.createElement('div');
  col.className = "column";

  for (let i = 0; i < 5; i++) {
    const input = document.createElement('input');
    input.type = "text";
    input.placeholder = "Click me";
    input.readOnly = true;

    input.addEventListener('click', () => {
      activeInput = input;
      popup.classList.remove('hidden');
      enrollInput.value = "";
      personDetail.textContent = "";
      qrReader.innerHTML = "";
      startScanner();
    });

    col.appendChild(input);
  }

  const plus = document.createElement('button');
  plus.textContent = "+";
  plus.className = "plus";
  plus.addEventListener('click', createColumn);
  col.appendChild(plus);

  columnsContainer.appendChild(col);
}

addColumnBtn.addEventListener('click', createColumn);

closePopup.addEventListener('click', () => {
  popup.classList.add('hidden');
  stopScanner();
});

enrollInput.addEventListener('input', () => {
  const num = enrollInput.value;
  if (students[num]) {
    personDetail.textContent = `${students[num].name} – ${num} – ${students[num].stream}`;
  } else {
    personDetail.textContent = "Not found!";
  }
});

okBtn.addEventListener('click', () => {
  const num = enrollInput.value;
  if (activeInput && students[num]) {
    activeInput.value = students[num].name;
  }
  popup.classList.add('hidden');
  stopScanner();
});

function startScanner() {
  if (!html5QrCode) html5QrCode = new Html5Qrcode("qr-reader");

  Html5Qrcode.getCameras().then(devices => {
    if (devices && devices.length) {
      html5QrCode.start(
        devices[0].id,
        { fps: 10, qrbox: 250 },
        qrCodeMessage => {
          if (students[qrCodeMessage]) {
            enrollInput.value = qrCodeMessage;
            personDetail.textContent = `${students[qrCodeMessage].name} – ${qrCodeMessage} – ${students[qrCodeMessage].stream}`;
          } else {
            enrollInput.value = qrCodeMessage;
            personDetail.textContent = `Unknown Student – ${qrCodeMessage}`;
          }
        }
      ).catch(err => console.error(err));
    } else {
      alert("No camera found. Please allow camera access.");
    }
  }).catch(err => console.error(err));
}

function stopScanner() {
  if (html5QrCode) {
    html5QrCode.stop().then(() => {
      html5QrCode.clear();
    }).catch(err => console.error(err));
  }
}
