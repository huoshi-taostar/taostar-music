const texts = [
    "欢迎来到桃星音乐",
    "高质量音频体验",
    "沉浸式音乐播放",
    "点击进入下载页面"
];

let index = 0;
let charIndex = 0;
let isDeleting = false;

const typingEl = document.getElementById("tx-typing-text");

function typeLoop() {
    const currentText = texts[index];

    // ⭐ 关键修复：先计算，再赋值
    if (!isDeleting) {
        charIndex++;
    } else {
        charIndex--;
    }

    typingEl.textContent = currentText.substring(0, charIndex);

    let speed = isDeleting ? 50 : 100;

    // 打完
    if (!isDeleting && charIndex === currentText.length) {
        speed = 2800;
        isDeleting = true;
    }
    // ⭐ 删除完（彻底清空）
    else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        index = (index + 1) % texts.length;
        speed = 500;
    }

    setTimeout(typeLoop, speed);
}

typeLoop();