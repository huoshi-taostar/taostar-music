    const huojian01Btn = document.getElementById('huojian01Btn');
    let isDragging = false;
    let hasDragged = false;
    let offsetX, offsetY;

    // 显示或隐藏按钮
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        huojian01Btn.classList.add('show');
      } else {
        huojian01Btn.classList.remove('show');
      }
    });

    // 滚动到顶部功能
    huojian01Btn.addEventListener('click', (e) => {
      if (!hasDragged) { // 仅在未拖动时执行
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      hasDragged = false; // 重置拖动状态
    });

    // 按下开始拖动（鼠标和触摸）
    const startDrag = (e) => {
      isDragging = true;
      hasDragged = false; // 重置拖动状态
      const clientX = e.clientX || e.touches[0].clientX;
      const clientY = e.clientY || e.touches[0].clientY;
      offsetX = clientX - huojian01Btn.getBoundingClientRect().left;
      offsetY = clientY - huojian01Btn.getBoundingClientRect().top;
      huojian01Btn.style.transition = 'none';
      e.preventDefault(); // 阻止默认行为，防止页面滚动
    };

    // 拖动过程（鼠标和触摸）
    const moveDrag = (e) => {
      if (isDragging) {
        hasDragged = true; // 标记发生了拖动
        const clientX = e.clientX || e.touches[0].clientX;
        const clientY = e.clientY || e.touches[0].clientY;
        let x = clientX - offsetX;
        let y = clientY - offsetY;

        // 防止按钮越界
        const btnWidth = huojian01Btn.offsetWidth;
        const btnHeight = huojian01Btn.offsetHeight;
        const maxX = window.innerWidth - btnWidth;
        const maxY = window.innerHeight - btnHeight;

        x = Math.max(0, Math.min(x, maxX));
        y = Math.max(0, Math.min(y, maxY));

        huojian01Btn.style.left = `${x}px`;
        huojian01Btn.style.top = `${y}px`;
      }
    };

    // 松开结束拖动（鼠标和触摸）
    const endDrag = () => {
      if (isDragging) {
        isDragging = false;
        huojian01Btn.style.transition = '';
      }
    };

    // 处理触摸和鼠标事件
    huojian01Btn.addEventListener('mousedown', startDrag);
    huojian01Btn.addEventListener('touchstart', startDrag);
    document.addEventListener('mousemove', moveDrag);
    document.addEventListener('touchmove', moveDrag);
    document.addEventListener('mouseup', endDrag);
    document.addEventListener('touchend', endDrag);

    // 触摸事件的 click 模拟
    huojian01Btn.addEventListener('touchend', (e) => {
      if (!hasDragged) {
        huojian01Btn.click(); // 触摸结束时触发点击事件
      }
    });


    const video = document.getElementById('video-taoxing-music');
    const playPauseBtn = document.getElementById('playPause-taoxing-music');
    const muteUnmuteBtn = document.getElementById('muteUnmute-taoxing-music');
    const fullscreenBtn = document.getElementById('fullscreen-taoxing-music');
    const progress = document.getElementById('progress-taoxing-music');
    const timeDisplay = document.getElementById('timeDisplay-taoxing-music');
    const controls = document.getElementById('controls-taoxing-music');
    const container = document.getElementById('container-taoxing-music');

    let hideControlsTimeout;

    video.addEventListener('contextmenu', e => e.preventDefault());

    function togglePlay() {
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    }

    function updatePlayIcon() {
      playPauseBtn.innerHTML = video.paused
        ? '<i class="fa-solid fa-play"></i>'
        : '<i class="fa-solid fa-pause"></i>';
    }

    playPauseBtn.addEventListener('click', togglePlay);
    video.addEventListener('click', togglePlay);
    video.addEventListener('play', updatePlayIcon);
    video.addEventListener('pause', updatePlayIcon);

    muteUnmuteBtn.addEventListener('click', () => {
      video.muted = !video.muted;
      muteUnmuteBtn.innerHTML = video.muted
        ? '<i class="fa-solid fa-volume-mute"></i>'
        : '<i class="fa-solid fa-volume-up"></i>';
    });

    fullscreenBtn.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        container.requestFullscreen?.() || container.webkitRequestFullscreen?.();
        fullscreenBtn.innerHTML = '<i class="fa-solid fa-compress"></i>';
      } else {
        document.exitFullscreen?.() || document.webkitExitFullscreen?.();
        fullscreenBtn.innerHTML = '<i class="fa-solid fa-expand"></i>';
      }
    });

    function formatTime(seconds) {
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
      return `${mins}:${secs}`;
    }

    function updateTimeDisplay() {
      const current = formatTime(video.currentTime);
      const duration = isNaN(video.duration) ? '0:00' : formatTime(video.duration);
      timeDisplay.textContent = `${current} / ${duration}`;
    }

    video.addEventListener('loadedmetadata', updateTimeDisplay);
    video.addEventListener('timeupdate', () => {
      const value = (video.currentTime / video.duration) * 100;
      progress.value = value || 0;
      updateTimeDisplay();
    });

    progress.addEventListener('input', () => {
      const time = (progress.value / 100) * video.duration;
      video.currentTime = time;
    });

    function showControls() {
      controls.classList.remove('hidden');
      clearTimeout(hideControlsTimeout);
      hideControlsTimeout = setTimeout(() => {
        if (!video.paused) {
          controls.classList.add('hidden');
        }
      }, 2000);
    }

    container.addEventListener('mousemove', showControls);
    container.addEventListener('mouseleave', () => controls.classList.add('hidden'));
    video.addEventListener('play', showControls);
    video.addEventListener('pause', () => controls.classList.remove('hidden'));

    updatePlayIcon();


    const background = document.getElementById('background-elements');
    const starCount = 100; // 星星数量

    // 生成闪烁的星星
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        const size = Math.random() * 3 + 1 + 'px';
        star.style.width = size;
        star.style.height = size;
        star.style.top = Math.random() * 100 + '%';
        star.style.left = Math.random() * 100 + '%';
        star.style.animationDelay = (Math.random() * 3) + 's';
        background.appendChild(star);
    }

    // 生成流星
    function createMeteor() {
        const meteor = document.createElement('div');
        meteor.classList.add('meteor');

        // 起始位置（随机在屏幕上方）
        meteor.style.top = Math.random() * 20 + '%';
        meteor.style.left = Math.random() * 100 + '%';

        background.appendChild(meteor);

        // 一段时间后移除流星（防止 DOM 堆积）
        setTimeout(() => {
            meteor.remove();
        }, 3000);
    }

    // 每隔一段时间随机生成流星
    setInterval(() => {
        if (Math.random() < 0.2) { // 控制概率
            createMeteor();
        }
    }, 1000);


function createMeteor() {
    const meteor = document.createElement('div');
    meteor.classList.add('meteor');

    // 随机长度
    const length = Math.random() * 80 + 60; 
    meteor.style.height = length + 'px';

    // 随机位置
    meteor.style.top = Math.random() * 20 + '%';
    meteor.style.left = Math.random() * 100 + '%';

    // 随机速度
    const speed = Math.random() * 0.8 + 1.2; 
    meteor.style.animationDuration = speed + 's';

    background.appendChild(meteor);

    setTimeout(() => meteor.remove(), speed * 1000);
}





  


