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