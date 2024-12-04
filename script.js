// 当前显示的屏幕
let currentScreen = 'initial-screen';

// 音频上下文
let audioContext;

// 和弦数组
const chords = [
    [261.63, 329.63, 392.00], // C大三和弦
    [293.66, 369.99, 440.00], // D大三和弦
    [329.63, 415.30, 493.88], // E大三和弦
    [349.23, 440.00, 523.25], // F大三和弦
];

// 当前分配的和弦映射
let currentChordMapping = {};

// 初始化音频上下文
function initAudio() {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
}

// 播放和弦
function playChord(frequencies) {
    if (!audioContext) initAudio();
    
    const oscillators = frequencies.map(freq => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.type = 'sine';
        oscillator.frequency.value = freq;
        
        gainNode.gain.value = 0.2;
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.start();
        
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        oscillator.stop(audioContext.currentTime + 0.5);
        
        return oscillator;
    });
}

// 随机分配和弦
function assignRandomChords(text) {
    const keys = ['Z', 'X', 'C', 'V'];
    const shuffledChords = [...chords].sort(() => Math.random() - 0.5);
    
    currentChordMapping = {};
    keys.forEach((key, index) => {
        currentChordMapping[key] = shuffledChords[index];
    });
    
    document.querySelectorAll('.chord-button').forEach((button, index) => {
        const key = keys[index];
        button.innerHTML = generatePixelPattern();
    });
}

// 生成随机像素图案
function generatePixelPattern() {
    const pattern = document.createElement('div');
    pattern.style.display = 'grid';
    pattern.style.gridTemplateColumns = 'repeat(5, 1fr)';
    pattern.style.width = '100%';
    pattern.style.height = '100%';
    pattern.style.gap = '2px';
    pattern.style.padding = '10px';
    
    for (let i = 0; i < 25; i++) {
        const pixel = document.createElement('div');
        pixel.style.background = Math.random() > 0.5 ? 'white' : 'transparent';
        pixel.style.aspectRatio = '1';
        pattern.appendChild(pixel);
    }
    
    return pattern.outerHTML;
}

// 界面控制
document.addEventListener('DOMContentLoaded', () => {
    const introVideo = document.getElementById('intro-video');
    const analysisVideo = document.getElementById('analysis-video');
    const returnButton = document.getElementById('return-button');
    const inputBar = document.getElementById('input-bar');
    const textInput = document.getElementById('text-input');
    const generateButton = document.getElementById('generate-button');
    
    function showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById(screenId).classList.add('active');
        currentScreen = screenId;
    }
    
    introVideo.addEventListener('ended', () => {
        showScreen('input-screen');
        returnButton.classList.remove('hidden');
    });
    
    inputBar.addEventListener('click', () => {
        textInput.classList.remove('hidden');
        textInput.focus();
    });
    
    generateButton.addEventListener('click', () => {
        const inputText = textInput.value.trim();
        if (inputText) {
            showScreen('analysis-screen');
            analysisVideo.play();
        }
    });
    
    analysisVideo.addEventListener('ended', () => {
        showScreen('chord-screen');
        assignRandomChords(textInput.value);
    });
    
    document.addEventListener('keydown', (event) => {
        if (currentScreen !== 'chord-screen') return;
        
        const key = event.key.toUpperCase();
        if (currentChordMapping[key]) {
            const button = document.querySelector(`[data-key="${key}"]`);
            if (button) {
                button.classList.add('active');
                playChord(currentChordMapping[key]);
            }
        }
    });
    
    document.addEventListener('keyup', (event) => {
        const key = event.key.toUpperCase();
        const button = document.querySelector(`[data-key="${key}"]`);
        if (button) {
            button.classList.remove('active');
        }
    });
    
    returnButton.addEventListener('click', () => {
        showScreen('input-screen');
        textInput.value = '';
        textInput.classList.add('hidden');
        currentChordMapping = {};
    });
    
    // 自动播放初始视频
    introVideo.play().catch(error => {
        console.log('Auto-play was prevented. Please click to start the video.');
        showScreen('input-screen');
        returnButton.classList.remove('hidden');
    });
});
