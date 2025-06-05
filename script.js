// 主题切换功能
function changeTheme() {
    const select = document.getElementById('theme-select');
    const theme = select.value;
    document.body.className = '';
    document.body.classList.add(`theme-${theme}`);
}

// 日期切换功能
function showDay(day, button) {
    const days = document.querySelectorAll('.schedule-day');
    const tabs = document.querySelectorAll('.tab-btn');
    
    days.forEach(d => d.classList.remove('active'));
    tabs.forEach(t => t.classList.remove('active'));
    
    document.getElementById(`day${day}`).classList.add('active');
    tabs[day-1].classList.add('active');
    
    var buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(function(button) {
        button.classList.remove('active');
    });

    button.classList.add('active');
}

// 详情展开功能
function toggleEventDetails(eventId) {
    const detailsPanel = document.getElementById(`${eventId}-details`);
    
    // 关闭所有其他打开的面板
    document.querySelectorAll('.event-details-panel.active').forEach(panel => {
        if (panel.id !== `${eventId}-details`) {
            panel.classList.remove('active');
        }
    });
    
    // 切换当前面板
    detailsPanel.classList.toggle('active');
}

// 平行会议选择
function selectSession(element) {
    const sessions = document.querySelectorAll('.session-option');
    sessions.forEach(s => s.classList.remove('selected'));
    element.classList.add('selected');
}

// 打字机效果
document.addEventListener('DOMContentLoaded', function() {
    const titles = document.querySelectorAll('.title-inline, .subtitle');
    
    titles.forEach(title => {
        const text = title.textContent;
        title.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                title.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        setTimeout(() => {
            typeWriter();
        }, 500);
    });
    
    // 滚动动画
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.summary-card, .highlight-item, .timeline-item');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('animate__animated', 'animate__fadeInUp');
            }
        });
    };
    
    // 导航栏与内容区同步
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    const syncNavWithContent = () => {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const scrollPosition = window.scrollY;
            
            // 当滚动位置在当前部分的范围内时
            if (scrollPosition >= sectionTop - 200 && 
                scrollPosition < sectionTop + sectionHeight - 200) {
                currentSection = section.getAttribute('id');
            }
        });
        
        // 更新导航栏高亮
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    };
    
    window.addEventListener('scroll', () => {
        animateOnScroll();
        syncNavWithContent();
    });
    
    // 初始检查
    animateOnScroll();
    syncNavWithContent();
    
    // 点击导航链接平滑滚动
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });
});

// 实时编辑器集成
function openEditor() {
    window.open('editor.html', '_blank', 'width=1200,height=800');
}

// 在页面加载完成后添加编辑按钮
// document.addEventListener('DOMContentLoaded', function() {
//     const editButton = document.createElement('button');
//     editButton.className = 'edit-button';
//     editButton.innerHTML = '编辑网站';
//     editButton.onclick = openEditor;
//     
//     document.body.appendChild(editButton);
// });
