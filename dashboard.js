// Verificar autenticação
function checkAuth() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    // Se estamos no dashboard, verificar autenticação
    if (window.location.pathname.includes('dashboard.html') && !isLoggedIn) {
        window.location.replace('auth.html');
        return;
    }
    
    // Carregar dados do usuário
    const userId = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName');
    const userEmail = localStorage.getItem('userEmail');
    
    if (!userId || !userName || !userEmail) {
        localStorage.clear();
        window.location.replace('auth.html');
        return;
    }
    
    // Atualizar interface com dados do usuário
    const userNameElement = document.getElementById('user-name');
    const headerUserNameElement = document.getElementById('header-user-name');
    
    if (userNameElement) {
        userNameElement.textContent = userName;
    }
    
    if (headerUserNameElement) {
        headerUserNameElement.textContent = userName;
    }
    
    // Carregar dados do usuário do banco
    const user = window.dbUtils.findUserByEmail(userEmail);
    if (user) {
        // Atualizar plano
        const userPlanElement = document.getElementById('user-plan');
        if (userPlanElement) {
            const plan = user.plan ? window.dbUtils.getPlanById(user.plan) : null;
            userPlanElement.textContent = plan ? plan.name : 'Plano Básico';
        }
        
        // Atualizar estatísticas
        updateStats(user);
        
        // Atualizar atividades recentes
        updateActivities(user);
    }
}

// Atualizar atividades recentes
function updateActivities(user) {
    const activityList = document.querySelector('.activity-list');
    if (!activityList) return;
    
    const activities = [
        {
            icon: 'book',
            background: '#e3f2fd',
            color: '#1976d2',
            title: 'Completou a lição de Hiragana',
            time: '5 minutos'
        },
        {
            icon: 'trophy',
            background: '#fce4ec',
            color: '#c2185b',
            title: 'Ganhou conquista "Primeiro Kanji"',
            time: '30 minutos'
        },
        {
            icon: 'star',
            background: '#f3e5f5',
            color: '#7b1fa2',
            title: 'Completou exercícios diários',
            time: '1 hora'
        }
    ];
    
    activityList.innerHTML = activities.map(activity => `
        <li class="activity-item">
            <div class="activity-icon" style="background: ${activity.background}; color: ${activity.color};">
                <i class="fas fa-${activity.icon}"></i>
            </div>
            <div class="activity-content">
                <h4 class="activity-title">${activity.title}</h4>
                <p class="activity-time">Há ${activity.time}</p>
            </div>
        </li>
    `).join('');
}

// Atualizar estatísticas
function updateStats(user) {
    const stats = {
        lessons: user.lessons_completed || 0,
        streak: user.streak || 0,
        points: user.points || 0
    };
    
    // Atualizar cards de estatísticas
    Object.keys(stats).forEach(key => {
        const element = document.querySelector(`.stat-card:has(.stat-title:contains("${key}")) .stat-value`);
        if (element) {
            element.textContent = stats[key].toLocaleString();
        }
    });
    
    // Atualizar círculos de progresso
    updateProgress(user.progress);
}

// Atualizar círculos de progresso
function updateProgress(progress) {
    if (!progress) return;
    
    const levels = ['n5', 'n4', 'n3', 'n2', 'n1'];
    const progressGrid = document.querySelector('.progress-grid');
    
    if (!progressGrid) return;
    
    progressGrid.innerHTML = levels.map(level => {
        const percentage = progress[level] || 0;
        return `
            <div class="progress-item">
                <div class="progress-circle">
                    <svg viewBox="0 0 36 36">
                        <path d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#eee"
                            stroke-width="2"
                        />
                        <path d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#1a1a2e"
                            stroke-width="2"
                            stroke-dasharray="${percentage}, 100"
                        />
                    </svg>
                </div>
                <p class="progress-label">N${level.substring(1)}</p>
                <p class="progress-value">${percentage}%</p>
            </div>
        `;
    }).join('');
}

// Função de logout
function logout() {
    localStorage.clear();
    window.location.replace('auth.html');
}

// Navegação
function setupNavigation() {
    // Botão de logout
    const logoutButton = document.getElementById('logout-button');
    if (logoutButton) {
        logoutButton.addEventListener('click', logout);
    }
    
    // Link de perfil
    const profileLink = document.getElementById('profile-link');
    if (profileLink) {
        profileLink.addEventListener('click', (e) => {
            e.preventDefault();
            // TODO: Implementar página de perfil
            alert('Página de perfil em desenvolvimento');
        });
    }
    
    // Link de planos
    const plansLink = document.getElementById('plans-link');
    if (plansLink) {
        plansLink.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'payment.html';
        });
    }
    
    // Botão de upgrade
    const upgradeButton = document.getElementById('upgrade-plan');
    if (upgradeButton) {
        upgradeButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'payment.html';
        });
    }
}

// Animação dos círculos de progresso
function animateProgress() {
    const circles = document.querySelectorAll('.progress-circle path:last-child');
    circles.forEach(circle => {
        const progress = circle.getAttribute('stroke-dasharray').split(',')[0];
        circle.style.strokeDasharray = '0, 100';
        setTimeout(() => {
            circle.style.strokeDasharray = `${progress}, 100`;
            circle.style.transition = 'stroke-dasharray 1.5s ease';
        }, 100);
    });
}

// Animação das barras de progresso
function animateProgressBars() {
    const bars = document.querySelectorAll('.progress-bar');
    bars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
            bar.style.transition = 'width 1s ease';
        }, 100);
    });
}

// Atualizar tempo relativo
function updateRelativeTimes() {
    const times = document.querySelectorAll('.activity-time');
    times.forEach(time => {
        const minutes = parseInt(time.textContent.match(/\d+/)[0]);
        if (minutes < 60) {
            time.textContent = `Há ${minutes} minutos`;
        } else {
            const hours = Math.floor(minutes / 60);
            time.textContent = `Há ${hours} hora${hours > 1 ? 's' : ''}`;
        }
    });
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    setupNavigation();
    animateProgress();
    animateProgressBars();
    updateRelativeTimes();
    
    // Atualizar tempos relativos a cada minuto
    setInterval(updateRelativeTimes, 60000);
}); 