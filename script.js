const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const viewer = document.getElementById('viewer');
const bValLabel = document.getElementById('bright-val');
const pValLabel = document.getElementById('pixel-val');
const aiBtn = document.getElementById('ai-btn');

let imgObj = new Image();
let brightness = 100;
let pixels = 0;
let isAiOn = false;
let prevB = 100, prevP = 0;

// File Selection
document.getElementById('fileInput').onchange = (e) => handleFile(e.target.files[0]);
window.addEventListener('dragover', (e) => e.preventDefault());
window.addEventListener('drop', (e) => {
    e.preventDefault();
    handleFile(e.dataTransfer.files[0]);
});

function handleFile(file) {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
        imgObj.onload = () => {
            canvas.width = imgObj.width;
            canvas.height = imgObj.height;
            viewer.classList.remove('viewer-hidden');
            render();
        };
        imgObj.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

function adjustBrightness(amount) {
    brightness = Math.min(Math.max(brightness + amount, 0), 400);
    render();
}

function adjustPixel(amount) {
    pixels = Math.min(Math.max(pixels + amount, 0), 10);
    render();
}

function render() {
    if (!imgObj.src) return;
    bValLabel.innerText = brightness + "%";
    pValLabel.innerText = pixels;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.filter = `brightness(${brightness}%) contrast(${100 + pixels * 15}%) saturate(${100 + pixels * 3}%)`;
    ctx.drawImage(imgObj, 0, 0, canvas.width, canvas.height);
}

aiBtn.onclick = () => {
    if (!isAiOn) {
        prevB = brightness; prevP = pixels;
        brightness = 190; pixels = 5;
        aiBtn.innerText = "✅ AI Enhance: ON";
        aiBtn.style.background = "#4CAF50";
        isAiOn = true;
    } else {
        brightness = prevB; pixels = prevP;
        aiBtn.innerText = "✨ AI Enhance: OFF";
        aiBtn.style.background = "rgba(20, 20, 20, 0.8)";
        isAiOn = false;
    }
    render();
};

document.getElementById('close-btn').onclick = () => location.reload();