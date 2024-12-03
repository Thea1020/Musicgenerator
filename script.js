
document.getElementById('introVideo').onclick = function() {
    document.getElementById('videoPage').style.display = 'none'; // 隐藏视频界面
    document.getElementById('generatePage').style.display = 'block'; // 显示生成界面
};

// 生成按钮点击事件
document.getElementById('generateButton').onclick = function() {
    // 随机生成和弦
    generateChords();

    // 播放 Analyze01 视频
    let analyzeVideo = document.createElement('video');
    analyzeVideo.src = 'Analyze01.mp4';  // 请在这里替换为实际路径
    analyzeVideo.autoplay = true;
    analyzeVideo.onended = function() {
        // 生成完成后显示和弦按钮
        document.getElementById('chordArea').style.display = 'flex';
    };
    document.body.appendChild(analyzeVideo);
};

// 返回按钮点击事件
document.getElementById('returnButton').onclick = function() {
    window.location.reload();  // 返回上一界面
};

// 随机生成四个和弦按钮
function generateChords() {
    let chords = getRandomChords();  // 获取随机生成的和弦
    let keys = ['Z', 'X', 'C', 'V'];  // 对应的按键

    // 将和弦名称绑定到对应的按钮
    for (let i = 0; i < 4; i++) {
        let chordButton = document.getElementById('chord' + keys[i]);
        chordButton.textContent = chords[i];  // 设置和弦名称
    }
}

// 获取随机生成的和弦
function getRandomChords() {
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

    // 随机打乱和弦组合顺序并返回前四个和弦
    const shuffledChords = chordList.sort(() => Math.random() - 0.5);
    return [shuffledChords[0].join(" - "), shuffledChords[1].join(" - "), shuffledChords[2].join(" - "), shuffledChords[3].join(" - ")];
}

// 监听键盘按键事件
document.addEventListener('keydown', function(event) {
    if (event.key === 'Z') {
        // 播放和弦1
        console.log('播放和弦1');
    } else if (event.key === 'X') {
        // 播放和弦2
        console.log('播放和弦2');
    } else if (event.key === 'C') {
        // 播放和弦3
        console.log('播放和弦3');
    } else if (event.key === 'V') {
        // 播放和弦4
        console.log('播放和弦4');
    }
});
