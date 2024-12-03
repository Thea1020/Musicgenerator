// 获取 DOM 元素
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const introVideo = document.getElementById('introVideo');
const analyzeVideo = document.getElementById('analyzeVideo');
const textInput = document.getElementById('textInput');
const generateButton = document.getElementById('generateButton');
const backButton = document.getElementById('backButton');

let generateKeys = false; // 控制是否生成琴键
let assignedChords = []; // 分配的和弦

// 初始化和弦列表
const chordList = [
  ["Fm", "Am", "C"],
  ["Fm", "Am", "G"],
  ["Fm", "Am", "Dm"],
  ["Fm", "Am", "Bm"],
  ["Fm", "Am", "F"],
  ["Fm", "C", "G"],
  ["Fm", "C", "Dm"],
  ["Fm", "C", "Bm"],
  ["Fm", "C", "F"],
  ["Fm", "G", "Dm"],
  ["Fm", "G", "Bm"],
  ["Fm", "G", "F"],
  ["Fm", "Dm", "Bm"],
  ["Fm", "Dm", "F"],
  ["Fm", "Bm", "F"],
  ["Am", "C", "G"],
  ["Am", "C", "Dm"],
  ["Am", "C", "Bm"],
  ["Am", "C", "F"],
  ["Am", "G", "Dm"],
  ["Am", "G", "Bm"],
  ["Am", "G", "F"],
  ["Am", "Dm", "Bm"],
  ["Am", "Dm", "F"],
  ["Am", "Bm", "F"],
  ["C", "G", "Dm"],
  ["C", "G", "Bm"],
  ["C", "G", "F"],
  ["C", "Dm", "Bm"],
  ["C", "Dm", "F"],
  ["C", "Bm", "F"],
  ["G", "Dm", "Bm"],
  ["G", "Dm", "F"],
  ["G", "Bm", "F"],
  ["Dm", "Bm", "F"]
];

// 按下生成按钮时的行为
generateButton.addEventListener('click', function() {
    generateKeys = true;
    analyzeVideo.play();
    introVideo.pause();
    assignChordsToKeys();
    drawCanvas();
});

// 按下返回按钮时的行为
backButton.addEventListener('click', function() {
    textInput.value = '';
    generateKeys = false;
    introVideo.play();
    analyzeVideo.pause();
    drawCanvas();
});

// 随机分配和弦
function assignChordsToKeys() {
    // 随机打乱和弦组合顺序
    assignedChords = [];
    const shuffledChords = chordList.sort(() => Math.random() - 0.5);
    assignedChords.push(shuffledChords[0]);
    assignedChords.push(shuffledChords[1]);
    assignedChords.push(shuffledChords[2]);
    assignedChords.push(shuffledChords[3]);
}

// 绘制画布上的内容
function drawCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (!generateKeys) {
        // 背景图绘制
        const img = new Image();
        img.src = 'assets/Input01.png';
        img.onload = function() {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        };

        ctx.font = "20px Arial";
        ctx.fillStyle = "black";
        ctx.fillText("请输入文本并点击生成", canvas.width / 2, canvas.height / 4);
    } else {
        // 显示和弦
        ctx.fillText("Z: " + assignedChords[0].join(" - "), canvas.width / 2, canvas.height / 2 + 60);
        ctx.fillText("X: " + assignedChords[1].join(" - "), canvas.width / 2, canvas.height / 2 + 100);
        ctx.fillText("C: " + assignedChords[2].join(" - "), canvas.width / 2, canvas.height / 2 + 140);
        ctx.fillText("V: " + assignedChords[3].join(" - "), canvas.width / 2, canvas.height / 2 + 180);
    }
}

// 初始绘制
drawCanvas();
