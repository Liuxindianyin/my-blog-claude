// 生成随机数组
function generateRandomArray(length, min, max) {
    return Array.from({ length }, () => Math.floor(Math.random() * (max - min + 1) + min));
}

// 可视化辅助函数
async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function swap(array, i, j, bars) {
    [array[i], array[j]] = [array[j], array[i]];
    [bars[i].style.height, bars[j].style.height] = [`${array[j]}px`, `${array[i]}px`];
    bars[i].style.backgroundColor = '#ff4081';
    bars[j].style.backgroundColor = '#ff4081';
    await sleep(50);
    bars[i].style.backgroundColor = '';
    bars[j].style.backgroundColor = '';
}

// 排序算法
async function bubbleSort(array, bars) {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                await swap(array, j, j + 1, bars);
            }
        }
        bars[array.length - i - 1].style.backgroundColor = '#4caf50';
    }
}

async function quickSort(array, start, end, bars) {
    if (start >= end) return;
    let pivot = array[end];
    let i = start - 1;
    for (let j = start; j < end; j++) {
        if (array[j] < pivot) {
            i++;
            await swap(array, i, j, bars);
        }
    }
    await swap(array, i + 1, end, bars);
    let pivotIndex = i + 1;
    bars[pivotIndex].style.backgroundColor = '#4caf50';
    await quickSort(array, start, pivotIndex - 1, bars);
    await quickSort(array, pivotIndex + 1, end, bars);
}

async function mergeSort(array, start, end, bars) {
    if (start >= end) return;
    let mid = Math.floor((start + end) / 2);
    await mergeSort(array, start, mid, bars);
    await mergeSort(array, mid + 1, end, bars);
    await merge(array, start, mid, end, bars);
}

async function merge(array, start, mid, end, bars) {
    let left = array.slice(start, mid + 1);
    let right = array.slice(mid + 1, end + 1);
    let i = 0, j = 0, k = start;
    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            array[k] = left[i];
            i++;
        } else {
            array[k] = right[j];
            j++;
        }
        bars[k].style.height = `${array[k]}px`;
        bars[k].style.backgroundColor = '#ff4081';
        await sleep(50);
        bars[k].style.backgroundColor = '';
        k++;
    }
    while (i < left.length) {
        array[k] = left[i];
        bars[k].style.height = `${array[k]}px`;
        bars[k].style.backgroundColor = '#ff4081';
        await sleep(50);
        bars[k].style.backgroundColor = '';
        i++;
        k++;
    }
    while (j < right.length) {
        array[k] = right[j];
        bars[k].style.height = `${array[k]}px`;
        bars[k].style.backgroundColor = '#ff4081';
        await sleep(50);
        bars[k].style.backgroundColor = '';
        j++;
        k++;
    }
}

// 开始可视化
async function startVisualization() {
    const container = document.getElementById('visualization-container');
    if (!container) return;

    container.innerHTML = '';
    let array = document.getElementById('arrayInput')?.value
        ? document.getElementById('arrayInput').value.split(',').map(num => parseInt(num.trim()))
        : generateRandomArray(50, 1, 100);

    const bars = array.map(value => {
        const bar = document.createElement('div');
        bar.style.height = `${value * 2}px`;
        bar.classList.add('bar');
        container.appendChild(bar);
        return bar;
    });

    const algorithm = document.getElementById('algorithmSelector')?.value;
    switch (algorithm) {
        case 'bubbleSort':
            await bubbleSort(array, bars);
            break;
        case 'quickSort':
            await quickSort(array, 0, array.length - 1, bars);
            break;
        case 'mergeSort':
            await mergeSort(array, 0, array.length - 1, bars);
            break;
    }
}

// 滚动动画
function reveal() {
    var reveals = document.querySelectorAll(".reveal");
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 150;
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");

            // 为时间线项目添加动画
            if (reveals[i].id === 'timeline') {
                var timelineItems = reveals[i].querySelectorAll('.timeline-item');
                timelineItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('show');
                    }, 300 * index);
                });
            }
        } else {
            reveals[i].classList.remove("active");
        }
    }
}

// 打字机效果
function typeWriter(element, text, speed) {
    let i = 0;
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// 更新滚动指示器
function updateScrollIndicator() {
    const winScroll = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    const scrollIndicator = document.getElementById("scroll-progress");
    if (scrollIndicator) {
        scrollIndicator.style.width = scrolled + "%";
    }
}

// 更新返回顶部按钮
function updateScrollToTopButton() {
    const mybutton = document.getElementById("myBtn");
    if (mybutton) {
        if (document.documentElement.scrollTop > 20) {
            mybutton.style.display = "block";
        } else {
            mybutton.style.display = "none";
        }
    }
}

// 切换暗黑模式
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// 处理表单提交
function handleFormSubmit(e) {
    e.preventDefault();
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');

    if (name && email && message) {
        if (name.value === '' || email.value === '' || message.value === '') {
            alert('请填写所有字段');
        } else {
            alert('消息已发送！');
            e.target.reset();
        }
    }
}

// 图片轮播
let slideIndex = 0;
function showSlides() {
    let slides = document.getElementsByClassName("mySlides");
    if (slides.length === 0) return;

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1 }
    slides[slideIndex - 1].style.display = "block";
    setTimeout(showSlides, 2000); // 每2秒切换一次图片
}

// 粒子效果
function initParticles() {
    particlesJS("particles-js", {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: "#ffffff" },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: false },
            size: { value: 3, random: true },
            line_linked: { enable: true, distance: 150, color: "#ffffff", opacity: 0.4, width: 1 },
            move: { enable: true, speed: 6, direction: "none", random: false, straight: false, out_mode: "out" }
        },
        interactivity: {
            detect_on: "canvas",
            events: { onhover: { enable: true, mode: "repulse" }, onclick: { enable: true, mode: "push" } },
            modes: { repulse: { distance: 100, duration: 0.4 }, push: { particles_nb: 4 } }
        },
        retina_detect: true
    });
}

// 3D卡片效果
function init3DCards() {
    const cards = document.querySelectorAll('.project-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.classList.add('flipped');
        });
        card.addEventListener('mouseleave', () => {
            card.classList.remove('flipped');
        });
    });
}

// 主要的初始化函数
function initializeWebsite() {
    // 导航栏切换功能
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('nav-open');
        });
    }

    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 随机数组生成按钮
    const randomizeBtn = document.getElementById('randomizeBtn');
    if (randomizeBtn) {
        randomizeBtn.addEventListener('click', () => {
            const arrayInput = document.getElementById('arrayInput');
            if (arrayInput) {
                arrayInput.value = generateRandomArray(50, 1, 100).join(', ');
                startVisualization();
            }
        });
    }

    // 开始可视化按钮
    const startVisualizationBtn = document.querySelector('button[onclick="startVisualization()"]');
    if (startVisualizationBtn) {
        startVisualizationBtn.onclick = startVisualization;
    }

    // 打字机效果
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        const heroText = heroTitle.textContent;
        heroTitle.textContent = '';
        typeWriter(heroTitle, heroText, 100);
    }

    // 初始化粒子效果
    initParticles();

    // 初始化3D卡片效果
    init3DCards();

    // 初始触发reveal
    reveal();

    // 检查并应用用户之前的暗黑模式偏好
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }

    // 图片轮播初始化
    showSlides();
}

// 事件监听器
document.addEventListener('DOMContentLoaded', initializeWebsite);

window.addEventListener('scroll', () => {
    updateScrollIndicator();
    updateScrollToTopButton();
    reveal();
});

// 返回顶部功能
function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

// 调用初始化函数
initializeWebsite();