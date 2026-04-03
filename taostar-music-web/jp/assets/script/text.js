const texts = [
    "桃星ミュージックへようこそ",
    "癒し系アニメ風景と音楽ビジュアライザー体験",
    "没入感のある音楽再生",
    "クリックしてダウンロードページへ"
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














/**
 * 桃星音乐 - 移动端背景适配脚本
 * 功能：在手机/平板设备上隐藏原有的多层视差背景图，替换为指定的静态壁纸
 * 并自动禁用视差效果，提升移动端性能和视觉体验
 */
(function() {
    'use strict';

    // 指定的移动端壁纸 URL
    const MOBILE_BG_URL = 'https://huoshi-taostar.github.io/taostar-music/taostar-music-web/download/background/taostar-music-background.png';

    /**
     * 检测是否为移动端或平板设备（触屏设备）
     * @returns {boolean}
     */
    function isMobileOrTablet() {
        // 1. User Agent 检测（覆盖手机/平板关键词）
        const ua = navigator.userAgent.toLowerCase();
        const mobileKeywords = ['android', 'iphone', 'ipad', 'ipod', 'blackberry', 'windows phone', 'opera mini', 'mobi', 'tablet', 'kindle', 'playbook', 'silk'];
        const isUA = mobileKeywords.some(keyword => ua.indexOf(keyword) !== -1);
        
        // 2. 触摸屏支持检测（更准确的移动端判断）
        const hasTouchScreen = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0);
        
        // 3. 屏幕宽度辅助检测（针对一些大屏平板或折叠屏，仍归类为移动端适配）
        const isSmallScreen = window.innerWidth <= 1024;
        
        return (isUA && hasTouchScreen) || (hasTouchScreen && isSmallScreen);
    }

    /**
     * 应用移动端背景适配
     * - 隐藏所有原有的视差背景图
     * - 设置新的静态壁纸
     * - 禁用视差动画的鼠标/方向监听（可选，通过样式锁定图层位置）
     */
    function applyMobileBackground() {
        // 创建 style 标签，注入移动端专用样式
        const styleId = 'taostar-mobile-bg-style';
        if (document.getElementById(styleId)) return; // 防止重复添加
        
        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
            /* 移动端：隐藏所有原有的多层背景图 */
            .layer1,
            .layer2,
            .layer3,
            .layer4 {
                background-image: none !important;
                background-color: transparent !important;
            }
            
            /* 设置新的全局壁纸（主体背景） */
            body {
                background-image: url('${MOBILE_BG_URL}') !important;
                background-size: cover !important;
                background-position: center center !important;
                background-attachment: fixed !important;
                background-repeat: no-repeat !important;
                background-color: #000 !important; /* 加载时的备用色 */
            }
            
            /* 确保视差容器不再产生任何位移（防止影响新背景） */
            #scene,
            .layer {
                transform: none !important;
                will-change: auto !important;
            }
            
            /* 移动端优化：移除按钮的鼠标悬停效果，避免触摸时出现闪烁 */
            #tx-entry-btn:hover {
                transform: none !important;
                box-shadow: none !important;
            }
            
            /* 确保文字光标在移动端不显示（本来无鼠标，但保留视觉效果可选） */
            @media (hover: none) and (pointer: coarse) {
                .cursor {
                    animation: tx-blink 1s infinite; /* 光标闪烁保留，但无鼠标指针不影响 */
                }
            }
        `;
        
        document.head.appendChild(style);
        
        // 可选：如果有 Parallax 实例，尝试禁用其动画循环（通过覆盖或标记）
        // 由于原 Parallax 实例未暴露全局，但我们可以通过停止其 requestAnimationFrame 来间接优化
        // 方法：拦截最高帧动画ID（如果存在），但通常不需要，因为背景图已清除，transform被强制锁定，性能无碍。
        // 更彻底：尝试查找并清除 Parallax 实例中注册的动画帧
        if (window.parallaxInstances && Array.isArray(window.parallaxInstances)) {
            window.parallaxInstances.forEach(instance => {
                if (instance && typeof instance.disable === 'function') {
                    instance.disable();
                }
            });
        } else {
            // 如果原初始化没有暴露实例，通过 DOM 属性尝试获取（部分库会存储）
            const sceneElem = document.getElementById('scene');
            if (sceneElem && sceneElem.parallaxInstance && typeof sceneElem.parallaxInstance.disable === 'function') {
                sceneElem.parallaxInstance.disable();
            }
        }
        
        // 小优化：禁止 body 滚动穿透（避免背景闪烁，实际无影响）
        document.body.style.overflowX = 'hidden';
    }

    // 在 DOM 加载完成后执行适配（确保所有元素已存在）
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            if (isMobileOrTablet()) {
                applyMobileBackground();
            }
        });
    } else {
        if (isMobileOrTablet()) {
            applyMobileBackground();
        }
    }
    
    // 监听窗口大小变化，如果从桌面切换至移动模式（极少情况），可重新检测
    // 但为避免频繁操作，不做动态切换，页面加载时一次判定足够。
})();