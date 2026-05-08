const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const viewer = document.getElementById('viewer');
const bSlider = document.getElementById('brightness');
const sSlider = document.getElementById('sharpness');
const bValLabel = document.getElementById('bright-val');
const aiBtn = document.getElementById('ai-btn');
const closeBtn = document.getElementById('close-btn');

let imgObj = new Image();

// --- CLOSE FUNCTION ---
closeBtn.onclick = () => {
    viewer.classList.add('viewer-hidden');
    imgObj = new Image(); // Clear image memory
    closeBtn.onclick = () => {
    // 1. Viewer ko chhupayein
    viewer.classList.add('viewer-hidden');
    
    // 2. Image memory saaf karein
    imgObj = new Image();
    
    // 3. Canvas ko bilkul khali (white/black) kar dein
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // 4. Sliders ko wapas normal (default) position par le aayein
    bSlider.value = 100;
    sSlider.value = 0;
    
    // 5. Labels ko reset karein
    bValLabel.innerText = "100%";
    
    // AI button ka text bhi reset kar dein
    aiBtn.innerText = "✨ AI Auto-Enhance";
    aiBtn.style.background = "#ffd700";
};
};

// Global Drop handling
window.addEventListener('dragover', (e) => e.preventDefault());
window.addEventListener('drop', (e) => {
    e.preventDefault();
    handleFile(e.dataTransfer.files[0]);
});

document.getElementById('fileInput').onchange = (e) => handleFile(e.target.files[0]);

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

function render() {
    if (!imgObj.src) return;
    const b = bSlider.value;
    const s = sSlider.value;
    bValLabel.innerText = b + "%";

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Powerful Filtering
    ctx.filter = `brightness(${b}%) contrast(${100 + s * 15}%) saturate(${100 + s * 3}%)`;
    ctx.imageSmoothingEnabled = (s < 2); 
    ctx.drawImage(imgObj, 0, 0, canvas.width, canvas.height);
}

bSlider.oninput = render;
sSlider.oninput = render;

aiBtn.onclick = () => {
    bSlider.value = 190;
    sSlider.value = 5;
    render();
    aiBtn.innerText = "✅ AI Enhanced";
};