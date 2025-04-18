// Configurações globais para os observers
const globalObserverOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

// Cherry Blossom Animation
function createCherryBlossom() {
    const container = document.querySelector('.cherry-blossom-container');
    const petal = document.createElement('span');
    petal.className = 'petal';
    
    const size = Math.random() * 15 + 5;
    const startPosition = Math.random() * window.innerWidth;
    const fallDuration = Math.random() * 10 + 8;
    const rotation = Math.random() * 360;
    
    petal.style.width = `${size}px`;
    petal.style.height = `${size}px`;
    petal.style.left = `${startPosition}px`;
    petal.style.animationDuration = `${fallDuration}s`;
    petal.style.transform = `rotate(${rotation}deg)`;
    
    container.appendChild(petal);
    
    setTimeout(() => {
        petal.remove();
    }, fallDuration * 1000);
}

// Create cherry blossoms periodically
setInterval(createCherryBlossom, 300);

// Parallax Effect
document.addEventListener('mousemove', (e) => {
    const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
    
    document.querySelectorAll('.methodology-card, .anime-card, .plan-card').forEach(card => {
        card.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
});

// Smooth Scroll with Progress Indicator
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Intersection Observer for Fade-in Animation
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(element => {
    observer.observe(element);
});

// Cyberpunk Glitch Effect
function createGlitchEffect(element) {
    setInterval(() => {
        if (Math.random() > 0.99) {
            element.style.transform = `translate(${Math.random() * 10 - 5}px, ${Math.random() * 10 - 5}px)`;
            element.style.opacity = Math.random();
            
            setTimeout(() => {
                element.style.transform = '';
                element.style.opacity = '';
            }, 100);
        }
    }, 100);
}

document.querySelectorAll('.main-title, .jp-title').forEach(createGlitchEffect);

// Form Validation and Animation
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Add loading animation
        const button = contactForm.querySelector('button');
        button.innerHTML = '<span class="loading">送信中...</span>';
        button.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            // Success animation
            button.innerHTML = '送信完了!';
            button.classList.add('success');
            
            // Show success message in Japanese
            const message = document.createElement('div');
            message.className = 'success-message';
            message.innerHTML = `
                <h3>ありがとうございます!</h3>
                <p>Em breve entraremos em contato.</p>
            `;
            contactForm.appendChild(message);
            
            // Reset form
            contactForm.reset();
            
            // Reset button after 3 seconds
            setTimeout(() => {
                button.innerHTML = 'Enviar';
                button.disabled = false;
                button.classList.remove('success');
                message.remove();
            }, 3000);
        }, 1500);
    });
}

// Dynamic Background Animation
function updateBackground() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.section-background');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
}

window.addEventListener('scroll', updateBackground);

// Anime Character Hover Effect
document.querySelectorAll('.anime-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const angleX = (y - centerY) / 20;
        const angleY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale(1.05)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// Add CSS class for animations
document.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
        }
        
        .methodology-card, .plan-card {
            animation: float 4s ease-in-out infinite;
        }
        
        @keyframes glitch {
            0% { transform: translate(0); }
            20% { transform: translate(-2px, 2px); }
            40% { transform: translate(-2px, -2px); }
            60% { transform: translate(2px, 2px); }
            80% { transform: translate(2px, -2px); }
            100% { transform: translate(0); }
        }
        
        .main-title:hover {
            animation: glitch 0.3s linear infinite;
        }
        
        .loading {
            display: inline-block;
            animation: loading 1.4s infinite;
        }
        
        @keyframes loading {
            0% { content: "送信中"; }
            33% { content: "送信中."; }
            66% { content: "送信中.."; }
            100% { content: "送信中..."; }
        }
        
        .success-message {
            animation: slideIn 0.5s ease-out;
        }
        
        @keyframes slideIn {
            from { transform: translateY(-20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }

        @keyframes neonPulse {
            0% { text-shadow: 0 0 10px var(--accent-blue), 0 0 20px var(--accent-blue); }
            50% { text-shadow: 0 0 20px var(--accent-purple), 0 0 40px var(--accent-purple); }
            100% { text-shadow: 0 0 10px var(--accent-blue), 0 0 20px var(--accent-blue); }
        }

        .neon-text {
            animation: neonPulse 2s infinite;
        }

        @keyframes matrixRain {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(100vh); }
        }

        .matrix-character {
            color: var(--accent-blue);
            font-family: monospace;
            position: absolute;
            animation: matrixRain linear infinite;
        }
    `;
    document.head.appendChild(style);
});

// Sistema de Gamificação
class GamificationSystem {
    constructor() {
        this.points = 0;
        this.level = 1;
        this.achievements = new Set();
        this.initializeUI();
    }

    initializeUI() {
        const ui = document.createElement('div');
        ui.className = 'gamification-ui';
        ui.innerHTML = `
            <div class="points-display">
                <span class="points">${this.points}</span> pontos
            </div>
            <div class="level-display">
                Nível ${this.level}
            </div>
            <div class="progress-bar">
                <div class="progress" style="width: 0%"></div>
            </div>
        `;
        document.body.appendChild(ui);
    }

    addPoints(amount) {
        this.points += amount;
        this.updateLevel();
        this.updateUI();
        this.checkAchievements();
    }

    updateLevel() {
        const newLevel = Math.floor(this.points / 1000) + 1;
        if (newLevel > this.level) {
            this.levelUp(newLevel);
        }
        this.level = newLevel;
    }

    levelUp(newLevel) {
        const notification = document.createElement('div');
        notification.className = 'level-up-notification';
        notification.innerHTML = `
            <h3>🎉 Level Up! 🎉</h3>
            <p>Você alcançou o nível ${newLevel}!</p>
        `;
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
    }

    updateUI() {
        const pointsDisplay = document.querySelector('.points');
        const levelDisplay = document.querySelector('.level-display');
        const progress = document.querySelector('.progress');
        
        pointsDisplay.textContent = this.points;
        levelDisplay.textContent = `Nível ${this.level}`;
        const progressPercent = (this.points % 1000) / 10;
        progress.style.width = `${progressPercent}%`;
    }

    checkAchievements() {
        const achievements = {
            beginner: { points: 100, title: 'Iniciante' },
            intermediate: { points: 1000, title: 'Intermediário' },
            advanced: { points: 5000, title: 'Avançado' },
            master: { points: 10000, title: 'Mestre' }
        };

        for (const [key, achievement] of Object.entries(achievements)) {
            if (this.points >= achievement.points && !this.achievements.has(key)) {
                this.unlockAchievement(achievement.title);
                this.achievements.add(key);
            }
        }
    }

    unlockAchievement(title) {
        const notification = document.createElement('div');
        notification.className = 'achievement-notification';
        notification.innerHTML = `
            <h3>🏆 Conquista Desbloqueada!</h3>
            <p>${title}</p>
        `;
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
    }
}

// Inicializar sistema de gamificação
const gamification = new GamificationSystem();

// Controle do Modal de Pagamento
document.querySelectorAll('.btn-plan').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector('.modal-overlay').classList.add('active');
        document.querySelector('.payment-modal').classList.add('active');
        // Adicionar pontos ao clicar em um plano
        gamification.addPoints(50);
    });
});

// Sakura Animation
function createSakura() {
    const sakuraContainer = document.querySelector('.sakura-container');
    const petal = document.createElement('div');
    petal.className = 'petal';
    
    const startPositionX = Math.random() * window.innerWidth;
    const size = Math.random() * 10 + 5;
    
    petal.style.left = startPositionX + 'px';
    petal.style.width = size + 'px';
    petal.style.height = size + 'px';
    petal.style.animationDuration = Math.random() * 3 + 8 + 's';
    petal.style.opacity = Math.random() * 0.3 + 0.4;
    
    sakuraContainer.appendChild(petal);
    
    setTimeout(() => {
        petal.remove();
    }, 10000);
}

setInterval(createSakura, 300);

// Intersection Observer for Fade In
const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            fadeInObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => {
    fadeInObserver.observe(el);
});

// Stats Counter Animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const countElement = entry.target;
            const targetValue = parseInt(countElement.getAttribute('data-target'));
            animateValue(countElement, 0, targetValue, 2000);
            statsObserver.unobserve(countElement);
        }
    });
}, observerOptions);

document.querySelectorAll('.stat-number').forEach(el => {
    statsObserver.observe(el);
});

function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    
    function step(timestamp) {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const current = Math.floor(progress * (end - start) + start);
        element.textContent = current.toLocaleString();
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    }
    
    window.requestAnimationFrame(step);
}

// Parallax Effect for Hero Background
let ticking = false;
const hero = document.querySelector('.hero');

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            hero.style.backgroundPosition = `center ${scrolled * 0.5}px`;
            ticking = false;
        });
        ticking = true;
    }
});

// Button Loading State
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function() {
        if (!this.classList.contains('loading')) {
            this.classList.add('loading');
            setTimeout(() => {
                this.classList.remove('loading');
            }, 2000);
        }
    });
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Add visible class for animations
    setTimeout(() => {
        document.querySelectorAll('.fade-in').forEach(el => {
            el.classList.add('visible');
        });
    }, 300);
    
    // Smooth reveal for nav items
    document.querySelectorAll('.nav-links li').forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });
});

// Payment Section Interactions
const planCards = document.querySelectorAll('.plan-card');
const paymentModal = document.querySelector('.payment-modal');
const modalOverlay = document.querySelector('.modal-overlay');
const closeModal = document.querySelector('.close-modal');
const paymentMethods = document.querySelectorAll('.payment-method');
const confirmButton = document.querySelector('.confirm-button');

// 3D Card Effect
planCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `
            perspective(1000px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            translateZ(10px)
        `;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
    
    // Open payment modal on click
    card.addEventListener('click', () => {
        openPaymentModal();
    });
});

function openPaymentModal() {
    modalOverlay.classList.add('active');
    paymentModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Animate modal content
    const elements = paymentModal.querySelectorAll('.payment-method, .form-group');
    elements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            el.style.transition = 'all 0.4s ease';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 100 * index);
    });
}

function closePaymentModal() {
    modalOverlay.classList.remove('active');
    paymentModal.classList.remove('active');
    document.body.style.overflow = '';
}

closeModal?.addEventListener('click', closePaymentModal);
modalOverlay?.addEventListener('click', closePaymentModal);

// Payment method selection
paymentMethods?.forEach(method => {
    method.addEventListener('click', () => {
        paymentMethods.forEach(m => m.classList.remove('selected'));
        method.classList.add('selected');
        
        // Add selection animation
        const ripple = document.createElement('div');
        ripple.className = 'ripple';
        method.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 1000);
    });
});

// Form validation and animation
const formInputs = document.querySelectorAll('.payment-form input');

formInputs?.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', () => {
        if (!input.value) {
            input.parentElement.classList.remove('focused');
        }
    });
});

// Credit card input formatting
const cardNumberInput = document.querySelector('input[name="card-number"]');
if (cardNumberInput) {
    cardNumberInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        value = value.replace(/(\d{4})/g, '$1 ').trim();
        e.target.value = value;
    });
}

// Expiry date formatting
const expiryInput = document.querySelector('input[name="expiry"]');
if (expiryInput) {
    expiryInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.slice(0, 2) + '/' + value.slice(2, 4);
        }
        e.target.value = value;
    });
}

// Confirm button animation
confirmButton?.addEventListener('click', (e) => {
    e.preventDefault();
    
    if (!confirmButton.classList.contains('loading')) {
        confirmButton.classList.add('loading');
        
        setTimeout(() => {
            confirmButton.classList.remove('loading');
            confirmButton.classList.add('success');
            confirmButton.textContent = 'Pagamento Confirmado!';
            
            // Show success animation
            const successAnimation = document.createElement('div');
            successAnimation.className = 'success-animation';
            paymentModal.appendChild(successAnimation);
            
            setTimeout(() => {
                closePaymentModal();
                // Reset button state
                setTimeout(() => {
                    confirmButton.classList.remove('success');
                    confirmButton.textContent = 'Confirmar Pagamento';
                    successAnimation.remove();
                }, 500);
            }, 2000);
        }, 2000);
    }
});

// Daily Challenges System
class DailyChallengeSystem {
    constructor() {
        this.challenges = [
            { id: 1, title: 'Assistir um episódio de anime', points: 50, completed: false },
            { id: 2, title: 'Praticar 10 kanji', points: 100, completed: false },
            { id: 3, title: 'Participar de uma discussão', points: 75, completed: false },
            { id: 4, title: 'Completar uma lição', points: 150, completed: false }
        ];
        this.initializeUI();
    }

    initializeUI() {
        const container = document.createElement('div');
        container.className = 'daily-challenges-container';
        container.innerHTML = `
            <h3>Desafios Diários</h3>
            <div class="challenges-list">
                ${this.challenges.map(challenge => `
                    <div class="challenge-item" data-id="${challenge.id}">
                        <div class="challenge-content">
                            <h4>${challenge.title}</h4>
                            <span class="points">+${challenge.points} pts</span>
                        </div>
                        <div class="challenge-progress">
                            <div class="progress-bar">
                                <div class="progress" style="width: 0%"></div>
                            </div>
                            <button class="complete-challenge">Completar</button>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
        document.querySelector('.interactive-features-section').appendChild(container);
        this.addEventListeners();
    }

    addEventListeners() {
        document.querySelectorAll('.complete-challenge').forEach(button => {
            button.addEventListener('click', (e) => {
                const challengeItem = e.target.closest('.challenge-item');
                const challengeId = parseInt(challengeItem.dataset.id);
                this.completeChallenge(challengeId, challengeItem);
            });
        });
    }

    completeChallenge(id, element) {
        const challenge = this.challenges.find(c => c.id === id);
        if (challenge && !challenge.completed) {
            challenge.completed = true;
            
            // Animate progress bar
            const progress = element.querySelector('.progress');
            progress.style.width = '100%';
            
            // Disable button
            const button = element.querySelector('.complete-challenge');
            button.disabled = true;
            button.textContent = 'Completado!';
            
            // Add points
            gamification.addPoints(challenge.points);
            
            // Show completion animation
            this.showCompletionAnimation(element, challenge.points);
        }
    }

    showCompletionAnimation(element, points) {
        const animation = document.createElement('div');
        animation.className = 'completion-animation';
        animation.innerHTML = `+${points}`;
        element.appendChild(animation);
        
        setTimeout(() => animation.remove(), 1500);
    }
}

// Virtual Karaoke System
class VirtualKaraoke {
    constructor() {
        this.currentSong = null;
        this.playlist = [
            { id: 1, title: 'Cruel Angel Thesis', artist: 'Evangelion', duration: '4:05' },
            { id: 2, title: 'Unravel', artist: 'Tokyo Ghoul', duration: '3:55' },
            { id: 3, title: 'Again', artist: 'Fullmetal Alchemist', duration: '4:15' }
        ];
        this.initializeUI();
    }

    initializeUI() {
        const container = document.createElement('div');
        container.className = 'virtual-karaoke';
        container.innerHTML = `
            <div class="karaoke-room">
                <div class="current-song">
                    <h3>Karaokê Virtual</h3>
                    <div class="song-display">
                        <span class="song-title">Selecione uma música</span>
                        <span class="song-artist"></span>
                    </div>
                    <div class="controls">
                        <button class="prev-song">⏮</button>
                        <button class="play-song">▶</button>
                        <button class="next-song">⏭</button>
                    </div>
                </div>
                <div class="playlist">
                    ${this.playlist.map(song => `
                        <div class="playlist-item" data-id="${song.id}">
                            <div class="song-info">
                                <span class="title">${song.title}</span>
                                <span class="artist">${song.artist}</span>
                            </div>
                            <span class="duration">${song.duration}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        document.querySelector('.interactive-features-section').appendChild(container);
        this.addEventListeners();
    }

    addEventListeners() {
        document.querySelectorAll('.playlist-item').forEach(item => {
            item.addEventListener('click', () => {
                const songId = parseInt(item.dataset.id);
                this.selectSong(songId);
            });
        });

        document.querySelector('.play-song').addEventListener('click', () => {
            this.togglePlay();
        });

        document.querySelector('.prev-song').addEventListener('click', () => {
            this.prevSong();
        });

        document.querySelector('.next-song').addEventListener('click', () => {
            this.nextSong();
        });
    }

    selectSong(id) {
        const song = this.playlist.find(s => s.id === id);
        if (song) {
            this.currentSong = song;
            this.updateDisplay();
            document.querySelectorAll('.playlist-item').forEach(item => {
                item.classList.remove('active');
                if (parseInt(item.dataset.id) === id) {
                    item.classList.add('active');
                }
            });
        }
    }

    updateDisplay() {
        const songTitle = document.querySelector('.song-title');
        const songArtist = document.querySelector('.song-artist');
        if (this.currentSong) {
            songTitle.textContent = this.currentSong.title;
            songArtist.textContent = this.currentSong.artist;
        }
    }

    togglePlay() {
        const playButton = document.querySelector('.play-song');
        if (this.currentSong) {
            if (playButton.textContent === '▶') {
                playButton.textContent = '⏸';
                // Add animation class to song display
                document.querySelector('.song-display').classList.add('playing');
            } else {
                playButton.textContent = '▶';
                document.querySelector('.song-display').classList.remove('playing');
            }
        }
    }

    prevSong() {
        if (this.currentSong) {
            const currentIndex = this.playlist.findIndex(s => s.id === this.currentSong.id);
            const prevIndex = (currentIndex - 1 + this.playlist.length) % this.playlist.length;
            this.selectSong(this.playlist[prevIndex].id);
        }
    }

    nextSong() {
        if (this.currentSong) {
            const currentIndex = this.playlist.findIndex(s => s.id === this.currentSong.id);
            const nextIndex = (currentIndex + 1) % this.playlist.length;
            this.selectSong(this.playlist[nextIndex].id);
        }
    }
}

// Duels System
class DuelsSystem {
    constructor() {
        this.players = [
            { id: 1, name: 'Player 1', points: 0 },
            { id: 2, name: 'Player 2', points: 0 }
        ];
        this.questions = [
            { id: 1, question: 'Como se diz "Olá" em japonês?', answer: 'こんにちは', options: ['さようなら', 'こんにちは', 'ありがとう', 'おはよう'] },
            { id: 2, question: 'Qual kanji significa "água"?', answer: '水', options: ['火', '水', '木', '金'] },
            { id: 3, question: 'Como se pronuncia "さくら"?', answer: 'Sakura', options: ['Sakura', 'Sasuke', 'Sayonara', 'Sensei'] }
        ];
        this.currentQuestion = null;
        this.initializeUI();
    }

    initializeUI() {
        const container = document.createElement('div');
        container.className = 'duels-container';
        container.innerHTML = `
            <div class="duel-arena">
                <div class="players">
                    <div class="player player-1">
                        <div class="player-avatar">P1</div>
                        <div class="player-info">
                            <span class="player-name">Player 1</span>
                            <span class="player-points">0 pts</span>
                        </div>
                    </div>
                    <div class="vs">VS</div>
                    <div class="player player-2">
                        <div class="player-avatar">P2</div>
                        <div class="player-info">
                            <span class="player-name">Player 2</span>
                            <span class="player-points">0 pts</span>
                        </div>
                    </div>
                </div>
                <div class="duel-content">
                    <button class="start-duel">Iniciar Duelo</button>
                    <div class="question-container" style="display: none;">
                        <h3 class="question-text"></h3>
                        <div class="options-container"></div>
                    </div>
                </div>
            </div>
        `;
        document.querySelector('.interactive-features-section').appendChild(container);
        this.addEventListeners();
    }

    addEventListeners() {
        document.querySelector('.start-duel').addEventListener('click', () => {
            this.startDuel();
        });
    }

    startDuel() {
        document.querySelector('.start-duel').style.display = 'none';
        document.querySelector('.question-container').style.display = 'block';
        this.nextQuestion();
    }

    nextQuestion() {
        const unusedQuestions = this.questions.filter(q => q !== this.currentQuestion);
        if (unusedQuestions.length > 0) {
            this.currentQuestion = unusedQuestions[Math.floor(Math.random() * unusedQuestions.length)];
            this.displayQuestion();
        } else {
            this.endDuel();
        }
    }

    displayQuestion() {
        const questionText = document.querySelector('.question-text');
        const optionsContainer = document.querySelector('.options-container');
        
        questionText.textContent = this.currentQuestion.question;
        optionsContainer.innerHTML = '';
        
        this.currentQuestion.options.forEach(option => {
            const button = document.createElement('button');
            button.className = 'option-button';
            button.textContent = option;
            button.addEventListener('click', () => this.checkAnswer(option));
            optionsContainer.appendChild(button);
        });
    }

    checkAnswer(selectedAnswer) {
        const buttons = document.querySelectorAll('.option-button');
        buttons.forEach(button => {
            button.disabled = true;
            if (button.textContent === this.currentQuestion.answer) {
                button.classList.add('correct');
            } else if (button.textContent === selectedAnswer) {
                button.classList.add('incorrect');
            }
        });

        if (selectedAnswer === this.currentQuestion.answer) {
            this.players[0].points += 100;
            document.querySelector('.player-1 .player-points').textContent = `${this.players[0].points} pts`;
            gamification.addPoints(50);
        }

        setTimeout(() => {
            this.nextQuestion();
        }, 2000);
    }

    endDuel() {
        const winner = this.players.reduce((a, b) => a.points > b.points ? a : b);
        document.querySelector('.question-container').innerHTML = `
            <h3>Duelo Finalizado!</h3>
            <p>${winner.name} venceu com ${winner.points} pontos!</p>
            <button class="restart-duel">Novo Duelo</button>
        `;

        document.querySelector('.restart-duel').addEventListener('click', () => {
            this.players.forEach(p => p.points = 0);
            document.querySelectorAll('.player-points').forEach(el => el.textContent = '0 pts');
            this.startDuel();
        });
    }
}

// Anime Club Discussion System
class AnimeClubSystem {
    constructor() {
        this.currentAnime = {
            title: 'Attack on Titan',
            episode: 'Episódio 1',
            description: 'A humanidade luta pela sobrevivência contra os Titãs.',
            comments: []
        };
        this.initializeUI();
    }

    initializeUI() {
        const container = document.createElement('div');
        container.className = 'anime-club-container';
        container.innerHTML = `
            <div class="current-anime">
                <h3>Clube do Anime</h3>
                <div class="anime-info">
                    <h4>${this.currentAnime.title}</h4>
                    <p>${this.currentAnime.episode}</p>
                    <p>${this.currentAnime.description}</p>
                </div>
                <div class="discussion-section">
                    <div class="comments-container"></div>
                    <div class="comment-form">
                        <textarea placeholder="Compartilhe seus pensamentos..."></textarea>
                        <button class="submit-comment">Comentar</button>
                    </div>
                </div>
            </div>
        `;
        document.querySelector('.interactive-features-section').appendChild(container);
        this.addEventListeners();
        this.loadComments();
    }

    addEventListeners() {
        document.querySelector('.submit-comment').addEventListener('click', () => {
            const textarea = document.querySelector('.comment-form textarea');
            const comment = textarea.value.trim();
            if (comment) {
                this.addComment(comment);
                textarea.value = '';
                gamification.addPoints(25);
            }
        });
    }

    addComment(content) {
        const comment = {
            id: Date.now(),
            content,
            timestamp: new Date().toLocaleString(),
            likes: 0
        };
        this.currentAnime.comments.unshift(comment);
        this.loadComments();
    }

    loadComments() {
        const container = document.querySelector('.comments-container');
        container.innerHTML = this.currentAnime.comments.map(comment => `
            <div class="comment" data-id="${comment.id}">
                <div class="comment-content">${comment.content}</div>
                <div class="comment-footer">
                    <span class="timestamp">${comment.timestamp}</span>
                    <button class="like-button" data-likes="${comment.likes}">
                        ❤️ ${comment.likes}
                    </button>
                </div>
            </div>
        `).join('');

        // Add like functionality
        document.querySelectorAll('.like-button').forEach(button => {
            button.addEventListener('click', (e) => {
                const commentId = parseInt(e.target.closest('.comment').dataset.id);
                const comment = this.currentAnime.comments.find(c => c.id === commentId);
                if (comment) {
                    comment.likes++;
                    button.textContent = `❤️ ${comment.likes}`;
                    button.classList.add('liked');
                }
            });
        });
    }
}

// Initialize new features
document.addEventListener('DOMContentLoaded', () => {
    // ... existing code ...
    
    const dailyChallenges = new DailyChallengeSystem();
    const virtualKaraoke = new VirtualKaraoke();
    const duelsSystem = new DuelsSystem();
    const animeClub = new AnimeClubSystem();
});

// Ranking System
class RankingSystem {
    constructor() {
        this.users = [
            {
                id: 1,
                username: "SakuraChan",
                avatar: "https://i.pinimg.com/564x/b4/3c/59/b43c59c54b7fd8b9024e3c8bec4e4f62.jpg",
                level: 42,
                points: 8750,
                badges: ["JLPT N5", "Kanji Master", "Quiz Champion"],
                streak: 65
            },
            {
                id: 2,
                username: "NarutoKun",
                avatar: "https://i.pinimg.com/564x/55/c8/6d/55c86d9f1e391c0678e99cb2c0734bad.jpg",
                level: 38,
                points: 7200,
                badges: ["Anime Expert", "Grammar Guru"],
                streak: 45
            },
            {
                id: 3,
                username: "TokyoSensei",
                avatar: "https://i.pinimg.com/564x/f8/bd/d2/f8bdd2648d2e2d3e4ff11f9a1f6a2d1d.jpg",
                level: 56,
                points: 12500,
                badges: ["JLPT N3", "Community Leader", "Vocabulary Master"],
                streak: 120
            }
        ];
        this.categories = ["Daily", "Weekly", "Monthly", "All Time"];
        this.currentCategory = "Weekly";
        this.initializeUI();
    }

    initializeUI() {
        const container = document.createElement('div');
        container.className = 'ranking-container';
        container.innerHTML = `
            <div class="ranking-header">
                <h2>Ranking de Estudantes</h2>
                <div class="ranking-categories">
                    ${this.categories.map(category => `
                        <button class="category-btn ${category === this.currentCategory ? 'active' : ''}"
                                data-category="${category}">
                            ${category}
                        </button>
                    `).join('')}
                </div>
            </div>
            <div class="ranking-list">
                ${this.users.map((user, index) => `
                    <div class="ranking-item" data-user-id="${user.id}">
                        <div class="rank-position ${index < 3 ? 'top-three' : ''}">
                            ${index + 1}
                        </div>
                        <div class="user-avatar">
                            <img src="${user.avatar}" alt="${user.username}">
                            ${index < 3 ? `<div class="rank-crown rank-${index + 1}">👑</div>` : ''}
                        </div>
                        <div class="user-info">
                            <div class="username">${user.username}</div>
                            <div class="user-stats">
                                <span class="level">Nível ${user.level}</span>
                                <span class="points">${user.points} pts</span>
                            </div>
                            <div class="badges">
                                ${user.badges.map(badge => `
                                    <span class="badge" title="${badge}">🏅</span>
                                `).join('')}
                            </div>
                        </div>
                        <div class="streak-info">
                            <span class="streak-count">${user.streak}</span>
                            <span class="streak-label">dias</span>
                            <span class="streak-flame">🔥</span>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
        document.querySelector('.interactive-features-section').appendChild(container);
        this.addEventListeners();
    }

    addEventListeners() {
        document.querySelectorAll('.category-btn').forEach(button => {
            button.addEventListener('click', () => {
                this.changeCategory(button.dataset.category);
            });
        });

        document.querySelectorAll('.ranking-item').forEach(item => {
            item.addEventListener('mouseenter', () => {
                this.showUserDetails(item.dataset.userId);
            });
        });
    }

    changeCategory(category) {
        this.currentCategory = category;
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.category === category);
        });
        this.updateRankings();
    }

    updateRankings() {
        // Simulate different rankings for different categories
        const shuffled = [...this.users].sort(() => Math.random() - 0.5);
        const rankingList = document.querySelector('.ranking-list');
        rankingList.innerHTML = shuffled.map((user, index) => `
            <div class="ranking-item" data-user-id="${user.id}">
                <div class="rank-position ${index < 3 ? 'top-three' : ''}">
                    ${index + 1}
                </div>
                <div class="user-avatar">
                    <img src="${user.avatar}" alt="${user.username}">
                    ${index < 3 ? `<div class="rank-crown rank-${index + 1}">👑</div>` : ''}
                </div>
                <div class="user-info">
                    <div class="username">${user.username}</div>
                    <div class="user-stats">
                        <span class="level">Nível ${user.level}</span>
                        <span class="points">${user.points} pts</span>
                    </div>
                    <div class="badges">
                        ${user.badges.map(badge => `
                            <span class="badge" title="${badge}">🏅</span>
                        `).join('')}
                    </div>
                </div>
                <div class="streak-info">
                    <span class="streak-count">${user.streak}</span>
                    <span class="streak-label">dias</span>
                    <span class="streak-flame">🔥</span>
                </div>
            </div>
        `).join('');
    }

    showUserDetails(userId) {
        const user = this.users.find(u => u.id === parseInt(userId));
        if (user) {
            const detailsPopup = document.createElement('div');
            detailsPopup.className = 'user-details-popup';
            detailsPopup.innerHTML = `
                <div class="popup-content">
                    <img src="${user.avatar}" alt="${user.username}" class="popup-avatar">
                    <h3>${user.username}</h3>
                    <div class="achievement-grid">
                        ${user.badges.map(badge => `
                            <div class="achievement-item">
                                <span class="achievement-icon">🏅</span>
                                <span class="achievement-name">${badge}</span>
                            </div>
                        `).join('')}
                    </div>
                    <div class="stats-grid">
                        <div class="stat-item">
                            <span class="stat-value">${user.level}</span>
                            <span class="stat-label">Nível</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-value">${user.points}</span>
                            <span class="stat-label">Pontos</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-value">${user.streak}</span>
                            <span class="stat-label">Dias Seguidos</span>
                        </div>
                    </div>
                </div>
            `;
            document.body.appendChild(detailsPopup);

            setTimeout(() => detailsPopup.remove(), 3000);
        }
    }
}

// Mini Games System
class MiniGamesSystem {
    constructor() {
        this.games = [
            {
                id: 'kanji-match',
                title: 'Kanji Match',
                description: 'Combine os kanjis com seus significados',
                thumbnail: 'https://i.pinimg.com/564x/7c/71/7d/7c717dc902d29ef96b6a93a58ba5923f.jpg',
                difficulty: 'Médio'
            },
            {
                id: 'word-rain',
                title: 'Word Rain',
                description: 'Digite as palavras antes que elas caiam',
                thumbnail: 'https://i.pinimg.com/564x/c5/a5/c2/c5a5c2c95b878c6e4f5d87c9f4f0e2c0.jpg',
                difficulty: 'Difícil'
            },
            {
                id: 'sentence-puzzle',
                title: 'Sentence Puzzle',
                description: 'Monte frases na ordem correta',
                thumbnail: 'https://i.pinimg.com/564x/d2/96/98/d29698a742e04efbef51c96d3f59d410.jpg',
                difficulty: 'Fácil'
            }
        ];
        this.currentGame = null;
        this.initializeUI();
    }

    initializeUI() {
        const container = document.createElement('div');
        container.className = 'mini-games-container';
        container.innerHTML = `
            <div class="games-header">
                <h2>Mini Games</h2>
                <p>Aprenda japonês se divertindo!</p>
            </div>
            <div class="games-grid">
                ${this.games.map(game => `
                    <div class="game-card" data-game-id="${game.id}">
                        <div class="game-thumbnail">
                            <img src="${game.thumbnail}" alt="${game.title}">
                            <span class="difficulty-badge ${game.difficulty.toLowerCase()}">
                                ${game.difficulty}
                            </span>
                        </div>
                        <div class="game-info">
                            <h3>${game.title}</h3>
                            <p>${game.description}</p>
                            <button class="play-game-btn">Jogar Agora</button>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
        document.querySelector('.interactive-features-section').appendChild(container);
        this.addEventListeners();
    }

    addEventListeners() {
        document.querySelectorAll('.play-game-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const gameId = e.target.closest('.game-card').dataset.gameId;
                this.startGame(gameId);
            });
        });
    }

    startGame(gameId) {
        const game = this.games.find(g => g.id === gameId);
        if (game) {
            this.currentGame = game;
            this.showGameInterface();
        }
    }

    showGameInterface() {
        const gameInterface = document.createElement('div');
        gameInterface.className = 'game-interface';
        
        switch (this.currentGame.id) {
            case 'kanji-match':
                this.initKanjiMatch(gameInterface);
                break;
            case 'word-rain':
                this.initWordRain(gameInterface);
                break;
            case 'sentence-puzzle':
                this.initSentencePuzzle(gameInterface);
                break;
        }

        document.body.appendChild(gameInterface);
    }

    initKanjiMatch(container) {
        const kanjis = [
            { kanji: '水', meaning: 'água' },
            { kanji: '火', meaning: 'fogo' },
            { kanji: '木', meaning: 'árvore' },
            { kanji: '山', meaning: 'montanha' },
            { kanji: '川', meaning: 'rio' },
            { kanji: '田', meaning: 'campo' }
        ];

        container.innerHTML = `
            <div class="game-header">
                <h3>${this.currentGame.title}</h3>
                <div class="game-stats">
                    <span class="score">Pontos: 0</span>
                    <span class="timer">Tempo: 60s</span>
                </div>
                <button class="close-game">✕</button>
            </div>
            <div class="kanji-grid">
                ${kanjis.map(k => `
                    <div class="kanji-card" data-kanji="${k.kanji}">
                        <div class="card-inner">
                            <div class="card-front">${k.kanji}</div>
                            <div class="card-back">${k.meaning}</div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;

        this.addKanjiMatchListeners(container);
    }

    addKanjiMatchListeners(container) {
        const cards = container.querySelectorAll('.kanji-card');
        let flipped = [];
        
        cards.forEach(card => {
            card.addEventListener('click', () => {
                if (flipped.length < 2 && !flipped.includes(card)) {
                    card.classList.add('flipped');
                    flipped.push(card);
                    
                    if (flipped.length === 2) {
                        setTimeout(() => {
                            if (flipped[0].dataset.kanji === flipped[1].dataset.kanji) {
                                flipped.forEach(c => c.classList.add('matched'));
                                gamification.addPoints(50);
                            } else {
                                flipped.forEach(c => c.classList.remove('flipped'));
                            }
                            flipped = [];
                        }, 1000);
                    }
                }
            });
        });

        container.querySelector('.close-game').addEventListener('click', () => {
            container.remove();
        });
    }

    initWordRain(container) {
        const words = [
            { japanese: 'こんにちは', romaji: 'konnichiwa' },
            { japanese: 'ありがとう', romaji: 'arigatou' },
            { japanese: 'さようなら', romaji: 'sayounara' }
        ];

        container.innerHTML = `
            <div class="game-header">
                <h3>${this.currentGame.title}</h3>
                <div class="game-stats">
                    <span class="score">Pontos: 0</span>
                    <span class="lives">Vidas: ❤️❤️❤️</span>
                </div>
                <button class="close-game">✕</button>
            </div>
            <div class="word-rain-area">
                <div class="falling-words"></div>
                <input type="text" class="word-input" placeholder="Digite a palavra...">
            </div>
        `;

        this.startWordRain(container);
    }

    startWordRain(container) {
        const fallingWords = container.querySelector('.falling-words');
        const input = container.querySelector('.word-input');
        let score = 0;
        let lives = 3;

        const createWord = () => {
            const wordElement = document.createElement('div');
            wordElement.className = 'falling-word';
            const word = words[Math.floor(Math.random() * words.length)];
            wordElement.textContent = word.japanese;
            wordElement.dataset.romaji = word.romaji;
            wordElement.style.left = Math.random() * (fallingWords.offsetWidth - 100) + 'px';
            fallingWords.appendChild(wordElement);

            const fall = wordElement.animate([
                { transform: 'translateY(0)' },
                { transform: 'translateY(400px)' }
            ], {
                duration: 5000,
                easing: 'linear'
            });

            fall.onfinish = () => {
                wordElement.remove();
                lives--;
                container.querySelector('.lives').textContent = '❤️'.repeat(lives);
                if (lives === 0) this.endGame(container);
            };
        };

        setInterval(createWord, 2000);

        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const words = container.querySelectorAll('.falling-word');
                words.forEach(word => {
                    if (word.dataset.romaji === input.value.toLowerCase()) {
                        word.remove();
                        score += 100;
                        container.querySelector('.score').textContent = `Pontos: ${score}`;
                        gamification.addPoints(50);
                    }
                });
                input.value = '';
            }
        });

        container.querySelector('.close-game').addEventListener('click', () => {
            container.remove();
        });
    }

    initSentencePuzzle(container) {
        const sentences = [
            {
                japanese: 'わたし は がくせい です',
                words: ['わたし', 'は', 'がくせい', 'です'],
                translation: 'Eu sou estudante'
            }
        ];

        const currentSentence = sentences[Math.floor(Math.random() * sentences.length)];
        const shuffledWords = [...currentSentence.words].sort(() => Math.random() - 0.5);

        container.innerHTML = `
            <div class="game-header">
                <h3>${this.currentGame.title}</h3>
                <div class="game-stats">
                    <span class="score">Pontos: 0</span>
                </div>
                <button class="close-game">✕</button>
            </div>
            <div class="sentence-puzzle">
                <div class="sentence-translation">${currentSentence.translation}</div>
                <div class="word-bank">
                    ${shuffledWords.map(word => `
                        <div class="word-piece" draggable="true">${word}</div>
                    `).join('')}
                </div>
                <div class="sentence-builder"></div>
            </div>
        `;

        this.addSentencePuzzleListeners(container, currentSentence);
    }

    addSentencePuzzleListeners(container, sentence) {
        const pieces = container.querySelectorAll('.word-piece');
        const builder = container.querySelector('.sentence-builder');

        pieces.forEach(piece => {
            piece.addEventListener('dragstart', () => {
                piece.classList.add('dragging');
            });

            piece.addEventListener('dragend', () => {
                piece.classList.remove('dragging');
                this.checkSentence(container, sentence);
            });
        });

        builder.addEventListener('dragover', e => {
            e.preventDefault();
            const dragging = container.querySelector('.dragging');
            builder.appendChild(dragging);
        });

        container.querySelector('.close-game').addEventListener('click', () => {
            container.remove();
        });
    }

    checkSentence(container, sentence) {
        const builder = container.querySelector('.sentence-builder');
        const currentWords = Array.from(builder.children).map(child => child.textContent);
        
        if (currentWords.join(' ') === sentence.japanese) {
            gamification.addPoints(100);
            container.querySelector('.score').textContent = 'Pontos: 100';
            
            setTimeout(() => {
                const success = document.createElement('div');
                success.className = 'success-message';
                success.textContent = 'Parabéns! Frase correta!';
                container.appendChild(success);
                
                setTimeout(() => {
                    container.remove();
                }, 2000);
            }, 500);
        }
    }

    endGame(container) {
        const gameOver = document.createElement('div');
        gameOver.className = 'game-over';
        gameOver.innerHTML = `
            <h3>Game Over</h3>
            <p>Pontuação: ${container.querySelector('.score').textContent}</p>
            <button class="retry-btn">Tentar Novamente</button>
        `;
        
        container.innerHTML = '';
        container.appendChild(gameOver);
        
        container.querySelector('.retry-btn').addEventListener('click', () => {
            container.remove();
            this.startGame(this.currentGame.id);
        });
    }
}

// Flashcards System
class FlashcardsSystem {
    constructor() {
        this.decks = [
            {
                id: 'hiragana',
                title: 'Hiragana',
                description: 'Aprenda o alfabeto básico japonês',
                cards: [
                    { front: 'あ', back: 'a', example: 'あめ (ame) - chuva' },
                    { front: 'い', back: 'i', example: 'いぬ (inu) - cachorro' },
                    { front: 'う', back: 'u', example: 'うみ (umi) - mar' }
                ],
                thumbnail: 'https://i.pinimg.com/564x/8c/5c/f9/8c5cf9fd8e9c3c9d7eaffc7e2a3d2fd5.jpg'
            },
            {
                id: 'katakana',
                title: 'Katakana',
                description: 'Domine o alfabeto para palavras estrangeiras',
                cards: [
                    { front: 'ア', back: 'a', example: 'アイス (aisu) - sorvete' },
                    { front: 'イ', back: 'i', example: 'インド (indo) - Índia' },
                    { front: 'ウ', back: 'u', example: 'ウール (ūru) - lã' }
                ],
                thumbnail: 'https://i.pinimg.com/564x/2c/77/e1/2c77e1c4851dc3f0d6e8def9a1f0b395.jpg'
            },
            {
                id: 'basic-kanji',
                title: 'Kanji Básico',
                description: 'Comece sua jornada com kanjis essenciais',
                cards: [
                    { front: '日', back: 'hi/nichi - sol/dia', example: '日本 (nihon) - Japão' },
                    { front: '月', back: 'tsuki/getsu - lua/mês', example: '月曜日 (getsuyōbi) - segunda-feira' },
                    { front: '火', back: 'hi/ka - fogo', example: '火山 (kazan) - vulcão' }
                ],
                thumbnail: 'https://i.pinimg.com/564x/d2/96/98/d29698a742e04efbef51c96d3f59d410.jpg'
            }
        ];
        this.currentDeck = null;
        this.currentCardIndex = 0;
        this.initializeUI();
    }

    initializeUI() {
        const container = document.createElement('div');
        container.className = 'flashcards-container';
        container.innerHTML = `
            <div class="flashcards-header">
                <h2>Flashcards</h2>
                <p>Memorize com eficiência</p>
            </div>
            <div class="decks-grid">
                ${this.decks.map(deck => `
                    <div class="deck-card" data-deck-id="${deck.id}">
                        <div class="deck-thumbnail">
                            <img src="${deck.thumbnail}" alt="${deck.title}">
                        </div>
                        <div class="deck-info">
                            <h3>${deck.title}</h3>
                            <p>${deck.description}</p>
                            <div class="deck-stats">
                                <span>${deck.cards.length} cards</span>
                                <button class="study-deck-btn">Estudar</button>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
        document.querySelector('.interactive-features-section').appendChild(container);
        this.addEventListeners();
    }

    addEventListeners() {
        document.querySelectorAll('.study-deck-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const deckId = e.target.closest('.deck-card').dataset.deckId;
                this.startStudySession(deckId);
            });
        });
    }

    startStudySession(deckId) {
        this.currentDeck = this.decks.find(d => d.id === deckId);
        this.currentCardIndex = 0;
        this.showStudyInterface();
    }

    showStudyInterface() {
        const studyInterface = document.createElement('div');
        studyInterface.className = 'study-interface';
        studyInterface.innerHTML = `
            <div class="study-header">
                <h3>${this.currentDeck.title}</h3>
                <div class="study-progress">
                    <div class="progress-text">
                        Card ${this.currentCardIndex + 1}/${this.currentDeck.cards.length}
                    </div>
                    <div class="progress-bar">
                        <div class="progress" style="width: ${(this.currentCardIndex + 1) / this.currentDeck.cards.length * 100}%"></div>
                    </div>
                </div>
                <button class="close-study">✕</button>
            </div>
            <div class="flashcard">
                <div class="card-inner">
                    <div class="card-front">
                        ${this.currentDeck.cards[this.currentCardIndex].front}
                    </div>
                    <div class="card-back">
                        <div class="back-content">
                            <div class="pronunciation">
                                ${this.currentDeck.cards[this.currentCardIndex].back}
                            </div>
                            <div class="example">
                                ${this.currentDeck.cards[this.currentCardIndex].example}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="study-controls">
                <button class="prev-card" ${this.currentCardIndex === 0 ? 'disabled' : ''}>⬅️</button>
                <button class="flip-card">Virar Cartão</button>
                <button class="next-card" ${this.currentCardIndex === this.currentDeck.cards.length - 1 ? 'disabled' : ''}>➡️</button>
            </div>
        `;
        document.body.appendChild(studyInterface);
        this.addStudyListeners(studyInterface);
    }

    addStudyListeners(interface) {
        const flashcard = interface.querySelector('.flashcard');
        const flipBtn = interface.querySelector('.flip-card');
        const prevBtn = interface.querySelector('.prev-card');
        const nextBtn = interface.querySelector('.next-card');
        const closeBtn = interface.querySelector('.close-study');

        flipBtn.addEventListener('click', () => {
            flashcard.classList.toggle('flipped');
        });

        prevBtn.addEventListener('click', () => {
            if (this.currentCardIndex > 0) {
                this.currentCardIndex--;
                this.updateCard(interface);
            }
        });

        nextBtn.addEventListener('click', () => {
            if (this.currentCardIndex < this.currentDeck.cards.length - 1) {
                this.currentCardIndex++;
                this.updateCard(interface);
            }
        });

        closeBtn.addEventListener('click', () => {
            interface.remove();
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (!interface.isConnected) return;
            
            switch(e.key) {
                case ' ':
                    flashcard.classList.toggle('flipped');
                    break;
                case 'ArrowLeft':
                    if (this.currentCardIndex > 0) {
                        this.currentCardIndex--;
                        this.updateCard(interface);
                    }
                    break;
                case 'ArrowRight':
                    if (this.currentCardIndex < this.currentDeck.cards.length - 1) {
                        this.currentCardIndex++;
                        this.updateCard(interface);
                    }
                    break;
                case 'Escape':
                    interface.remove();
                    break;
            }
        });
    }

    updateCard(interface) {
        const card = this.currentDeck.cards[this.currentCardIndex];
        interface.querySelector('.card-front').textContent = card.front;
        interface.querySelector('.pronunciation').textContent = card.back;
        interface.querySelector('.example').textContent = card.example;
        
        interface.querySelector('.progress-text').textContent = 
            `Card ${this.currentCardIndex + 1}/${this.currentDeck.cards.length}`;
        
        interface.querySelector('.progress').style.width = 
            `${(this.currentCardIndex + 1) / this.currentDeck.cards.length * 100}%`;
        
        interface.querySelector('.prev-card').disabled = this.currentCardIndex === 0;
        interface.querySelector('.next-card').disabled = 
            this.currentCardIndex === this.currentDeck.cards.length - 1;
        
        interface.querySelector('.flashcard').classList.remove('flipped');
    }
}

// Resource Library System
class ResourceLibrary {
    constructor() {
        this.resources = [
            {
                id: 'grammar-n5',
                title: 'Gramática JLPT N5',
                type: 'grammar',
                level: 'Iniciante',
                thumbnail: 'https://i.pinimg.com/564x/e5/c1/8c/e5c18c4195f483503d2457b5a5b7d95a.jpg',
                content: [
                    {
                        topic: 'Partícula は (wa)',
                        explanation: 'Usada para marcar o tópico da frase',
                        examples: [
                            { japanese: 'わたしは学生です', romaji: 'Watashi wa gakusei desu', translation: 'Eu sou estudante' }
                        ]
                    },
                    {
                        topic: 'Partícula の (no)',
                        explanation: 'Indica posse ou relação entre palavras',
                        examples: [
                            { japanese: 'わたしの本', romaji: 'Watashi no hon', translation: 'Meu livro' }
                        ]
                    }
                ]
            },
            {
                id: 'vocab-food',
                title: 'Vocabulário: Comidas',
                type: 'vocabulary',
                level: 'Iniciante',
                thumbnail: 'https://i.pinimg.com/564x/7c/71/7d/7c717dc902d29ef96b6a93a58ba5923f.jpg',
                content: [
                    { word: 'ごはん', romaji: 'gohan', translation: 'arroz/refeição' },
                    { word: 'すし', romaji: 'sushi', translation: 'sushi' },
                    { word: 'ラーメン', romaji: 'rāmen', translation: 'lámen' }
                ]
            },
            {
                id: 'culture-festivals',
                title: 'Cultura: Festivais',
                type: 'culture',
                level: 'Intermediário',
                thumbnail: 'https://i.pinimg.com/564x/d2/96/98/d29698a742e04efbef51c96d3f59d410.jpg',
                content: [
                    {
                        festival: '花見',
                        romaji: 'Hanami',
                        description: 'Festival de apreciação das flores de cerejeira',
                        season: 'Primavera'
                    },
                    {
                        festival: '七夕',
                        romaji: 'Tanabata',
                        description: 'Festival das estrelas',
                        season: 'Verão'
                    }
                ]
            }
        ];
        this.filters = {
            type: ['grammar', 'vocabulary', 'culture'],
            level: ['Iniciante', 'Intermediário', 'Avançado']
        };
        this.activeFilters = {
            type: null,
            level: null
        };
        this.initializeUI();
    }

    initializeUI() {
        const container = document.createElement('div');
        container.className = 'resource-library';
        container.innerHTML = `
            <div class="library-header">
                <h2>Biblioteca de Recursos</h2>
                <div class="filter-controls">
                    <div class="filter-group">
                        <label>Tipo:</label>
                        <select class="type-filter">
                            <option value="">Todos</option>
                            ${this.filters.type.map(type => `
                                <option value="${type}">${type.charAt(0).toUpperCase() + type.slice(1)}</option>
                            `).join('')}
                        </select>
                    </div>
                    <div class="filter-group">
                        <label>Nível:</label>
                        <select class="level-filter">
                            <option value="">Todos</option>
                            ${this.filters.level.map(level => `
                                <option value="${level}">${level}</option>
                            `).join('')}
                        </select>
                    </div>
                </div>
            </div>
            <div class="resources-grid">
                ${this.getFilteredResources().map(resource => this.createResourceCard(resource)).join('')}
            </div>
        `;
        document.querySelector('.interactive-features-section').appendChild(container);
        this.addEventListeners();
    }

    createResourceCard(resource) {
        return `
            <div class="resource-card" data-resource-id="${resource.id}">
                <div class="resource-thumbnail">
                    <img src="${resource.thumbnail}" alt="${resource.title}">
                    <span class="resource-type ${resource.type}">${resource.type}</span>
                    <span class="resource-level">${resource.level}</span>
                </div>
                <div class="resource-info">
                    <h3>${resource.title}</h3>
                    <button class="view-resource-btn">Ver Conteúdo</button>
                </div>
            </div>
        `;
    }

    getFilteredResources() {
        return this.resources.filter(resource => {
            const typeMatch = !this.activeFilters.type || resource.type === this.activeFilters.type;
            const levelMatch = !this.activeFilters.level || resource.level === this.activeFilters.level;
            return typeMatch && levelMatch;
        });
    }

    addEventListeners() {
        document.querySelector('.type-filter').addEventListener('change', (e) => {
            this.activeFilters.type = e.target.value;
            this.updateResourcesGrid();
        });

        document.querySelector('.level-filter').addEventListener('change', (e) => {
            this.activeFilters.level = e.target.value;
            this.updateResourcesGrid();
        });

        document.querySelectorAll('.view-resource-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const resourceId = e.target.closest('.resource-card').dataset.resourceId;
                this.showResourceContent(resourceId);
            });
        });
    }

    updateResourcesGrid() {
        const grid = document.querySelector('.resources-grid');
        grid.innerHTML = this.getFilteredResources()
            .map(resource => this.createResourceCard(resource))
            .join('');
        
        // Reattach event listeners
        document.querySelectorAll('.view-resource-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const resourceId = e.target.closest('.resource-card').dataset.resourceId;
                this.showResourceContent(resourceId);
            });
        });
    }

    showResourceContent(resourceId) {
        const resource = this.resources.find(r => r.id === resourceId);
        if (!resource) return;

        const contentModal = document.createElement('div');
        contentModal.className = 'resource-modal';
        
        let contentHTML = '';
        switch (resource.type) {
            case 'grammar':
                contentHTML = this.createGrammarContent(resource);
                break;
            case 'vocabulary':
                contentHTML = this.createVocabularyContent(resource);
                break;
            case 'culture':
                contentHTML = this.createCultureContent(resource);
                break;
        }

        contentModal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${resource.title}</h3>
                    <button class="close-modal">✕</button>
                </div>
                <div class="modal-body">
                    ${contentHTML}
                </div>
            </div>
        `;

        document.body.appendChild(contentModal);
        
        contentModal.querySelector('.close-modal').addEventListener('click', () => {
            contentModal.remove();
        });

        // Add escape key listener
        const escapeListener = (e) => {
            if (e.key === 'Escape') {
                contentModal.remove();
                document.removeEventListener('keydown', escapeListener);
            }
        };
        document.addEventListener('keydown', escapeListener);
    }

    createGrammarContent(resource) {
        return `
            <div class="grammar-content">
                ${resource.content.map(item => `
                    <div class="grammar-item">
                        <h4>${item.topic}</h4>
                        <p class="explanation">${item.explanation}</p>
                        <div class="examples">
                            ${item.examples.map(example => `
                                <div class="example-item">
                                    <div class="japanese">${example.japanese}</div>
                                    <div class="romaji">${example.romaji}</div>
                                    <div class="translation">${example.translation}</div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    createVocabularyContent(resource) {
        return `
            <div class="vocabulary-content">
                <div class="vocab-grid">
                    ${resource.content.map(item => `
                        <div class="vocab-item">
                            <div class="japanese">${item.word}</div>
                            <div class="romaji">${item.romaji}</div>
                            <div class="translation">${item.translation}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    createCultureContent(resource) {
        return `
            <div class="culture-content">
                ${resource.content.map(item => `
                    <div class="festival-item">
                        <h4>${item.festival} (${item.romaji})</h4>
                        <p class="description">${item.description}</p>
                        <div class="season">Estação: ${item.season}</div>
                    </div>
                `).join('')}
            </div>
        `;
    }
}

// Initialize new features
document.addEventListener('DOMContentLoaded', () => {
    // ... existing code ...
    
    const flashcards = new FlashcardsSystem();
    const resourceLibrary = new ResourceLibrary();
});

// Live Streaming System
class LiveStreamingSystem {
    constructor() {
        this.streams = [
            {
                id: 1,
                title: 'Aula de Conversação N5',
                instructor: 'Sakura Sensei',
                avatar: 'https://i.pinimg.com/564x/b4/3c/59/b43c59c54b7fd8b9024e3c8bec4e4f62.jpg',
                thumbnail: 'https://i.pinimg.com/564x/e5/c1/8c/e5c18c4195f483503d2457b5a5b7d95a.jpg',
                viewers: 42,
                status: 'live',
                tags: ['Conversação', 'JLPT N5', 'Iniciante']
            },
            {
                id: 2,
                title: 'Kanji Avançado - Parte 3',
                instructor: 'Tanaka Sensei',
                avatar: 'https://i.pinimg.com/564x/55/c8/6d/55c86d9f1e391c0678e99cb2c0734bad.jpg',
                thumbnail: 'https://i.pinimg.com/564x/7c/71/7d/7c717dc902d29ef96b6a93a58ba5923f.jpg',
                viewers: 28,
                status: 'scheduled',
                startTime: '2024-03-15T15:00:00Z',
                tags: ['Kanji', 'Avançado', 'JLPT N2']
            }
        ];
        this.initializeUI();
    }

    initializeUI() {
        const container = document.createElement('div');
        container.className = 'live-streaming-container';
        container.innerHTML = `
            <div class="streaming-header">
                <h2>Aulas ao Vivo</h2>
                <div class="stream-filters">
                    <button class="filter-btn active" data-filter="all">Todas</button>
                    <button class="filter-btn" data-filter="live">Ao Vivo</button>
                    <button class="filter-btn" data-filter="scheduled">Agendadas</button>
                </div>
            </div>
            <div class="streams-grid">
                ${this.streams.map(stream => this.createStreamCard(stream)).join('')}
            </div>
        `;
        document.querySelector('.interactive-features-section').appendChild(container);
        this.addEventListeners();
    }

    createStreamCard(stream) {
        const isLive = stream.status === 'live';
        const streamTime = isLive ? 
            `<span class="live-badge">AO VIVO</span>` :
            `<span class="scheduled-time">${this.formatDateTime(stream.startTime)}</span>`;

        return `
            <div class="stream-card" data-stream-id="${stream.id}" data-status="${stream.status}">
                <div class="stream-thumbnail">
                    <img src="${stream.thumbnail}" alt="${stream.title}">
                    ${streamTime}
                    <div class="stream-viewers">
                        <i class="fas fa-eye"></i>
                        ${stream.viewers}
                    </div>
                </div>
                <div class="stream-info">
                    <div class="instructor-info">
                        <img src="${stream.avatar}" alt="${stream.instructor}" class="instructor-avatar">
                        <span class="instructor-name">${stream.instructor}</span>
                    </div>
                    <h3>${stream.title}</h3>
                    <div class="stream-tags">
                        ${stream.tags.map(tag => `
                            <span class="tag">${tag}</span>
                        `).join('')}
                    </div>
                    <button class="join-stream-btn">
                        ${isLive ? 'Entrar na Aula' : 'Lembrar'}
                    </button>
                </div>
            </div>
        `;
    }

    formatDateTime(dateString) {
        const date = new Date(dateString);
        return date.toLocaleString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    addEventListeners() {
        document.querySelectorAll('.filter-btn').forEach(button => {
            button.addEventListener('click', () => {
                document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                this.filterStreams(button.dataset.filter);
            });
        });

        document.querySelectorAll('.join-stream-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const streamId = e.target.closest('.stream-card').dataset.streamId;
                const stream = this.streams.find(s => s.id === parseInt(streamId));
                
                if (stream.status === 'live') {
                    this.joinStream(stream);
                } else {
                    this.setReminder(stream);
                }
            });
        });
    }

    filterStreams(filter) {
        document.querySelectorAll('.stream-card').forEach(card => {
            if (filter === 'all' || card.dataset.status === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    joinStream(stream) {
        const streamRoom = document.createElement('div');
        streamRoom.className = 'stream-room';
        streamRoom.innerHTML = `
            <div class="stream-content">
                <div class="stream-header">
                    <h3>${stream.title}</h3>
                    <button class="close-stream">✕</button>
                </div>
                <div class="video-container">
                    <img src="${stream.thumbnail}" alt="${stream.title}" class="stream-video">
                    <div class="stream-overlay">
                        <div class="stream-controls">
                            <button class="control-btn mic-btn">🎤</button>
                            <button class="control-btn camera-btn">📷</button>
                            <button class="control-btn chat-btn">💭</button>
                            <button class="control-btn leave-btn">❌</button>
                        </div>
                    </div>
                </div>
                <div class="chat-container">
                    <div class="chat-messages"></div>
                    <div class="chat-input">
                        <input type="text" placeholder="Digite sua mensagem...">
                        <button class="send-message">Enviar</button>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(streamRoom);

        this.initializeStreamRoom(streamRoom, stream);
    }

    initializeStreamRoom(room, stream) {
        const closeBtn = room.querySelector('.close-stream');
        const chatInput = room.querySelector('.chat-input input');
        const sendBtn = room.querySelector('.send-message');
        const messages = room.querySelector('.chat-messages');

        closeBtn.addEventListener('click', () => room.remove());

        const addMessage = (content, isUser = false) => {
            const message = document.createElement('div');
            message.className = `chat-message ${isUser ? 'user-message' : ''}`;
            message.innerHTML = `
                <div class="message-content">
                    ${isUser ? 'Você' : stream.instructor}: ${content}
                </div>
                <div class="message-time">
                    ${new Date().toLocaleTimeString()}
                </div>
            `;
            messages.appendChild(message);
            messages.scrollTop = messages.scrollHeight;
        };

        sendBtn.addEventListener('click', () => {
            const content = chatInput.value.trim();
            if (content) {
                addMessage(content, true);
                chatInput.value = '';

                // Simulated instructor response
                setTimeout(() => {
                    addMessage('Ótima pergunta! Vamos discutir isso em detalhes.');
                }, 1000);
            }
        });

        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendBtn.click();
            }
        });

        // Simulate initial messages
        setTimeout(() => {
            addMessage('Bem-vindos à aula! Vamos começar com uma revisão rápida.');
        }, 1000);
    }

    setReminder(stream) {
        const button = document.querySelector(`[data-stream-id="${stream.id}"] .join-stream-btn`);
        button.classList.toggle('reminded');
        
        if (button.classList.contains('reminded')) {
            button.textContent = 'Lembrete Ativo';
            this.showNotification('Lembrete definido! Você será notificado quando a aula começar.');
        } else {
            button.textContent = 'Lembrar';
            this.showNotification('Lembrete removido.');
        }
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('show');
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => notification.remove(), 300);
            }, 3000);
        }, 100);
    }
}

// Mentoring System
class MentoringSystem {
    constructor() {
        this.mentors = [
            {
                id: 1,
                name: 'Yuki Sensei',
                avatar: 'https://i.pinimg.com/564x/b4/3c/59/b43c59c54b7fd8b9024e3c8bec4e4f62.jpg',
                specialties: ['Conversação', 'JLPT N3', 'Cultura'],
                rating: 4.9,
                reviews: 128,
                price: 120,
                availability: [
                    { day: 'Segunda', slots: ['09:00', '14:00', '16:00'] },
                    { day: 'Quarta', slots: ['10:00', '15:00', '17:00'] },
                    { day: 'Sexta', slots: ['09:00', '13:00', '18:00'] }
                ]
            },
            {
                id: 2,
                name: 'Hiroshi Sensei',
                avatar: 'https://i.pinimg.com/564x/55/c8/6d/55c86d9f1e391c0678e99cb2c0734bad.jpg',
                specialties: ['Gramática', 'JLPT N2', 'Business'],
                rating: 4.8,
                reviews: 95,
                price: 150,
                availability: [
                    { day: 'Terça', slots: ['08:00', '13:00', '19:00'] },
                    { day: 'Quinta', slots: ['10:00', '15:00', '20:00'] },
                    { day: 'Sábado', slots: ['09:00', '14:00', '16:00'] }
                ]
            }
        ];
        this.initializeUI();
    }

    initializeUI() {
        const container = document.createElement('div');
        container.className = 'mentoring-container';
        container.innerHTML = `
            <div class="mentoring-header">
                <h2>Mentoria Personalizada</h2>
                <div class="mentoring-filters">
                    <select class="specialty-filter">
                        <option value="">Todas as Especialidades</option>
                        <option value="Conversação">Conversação</option>
                        <option value="Gramática">Gramática</option>
                        <option value="JLPT N2">JLPT N2</option>
                        <option value="JLPT N3">JLPT N3</option>
                        <option value="Business">Business</option>
                        <option value="Cultura">Cultura</option>
                    </select>
                    <select class="price-filter">
                        <option value="">Todos os Preços</option>
                        <option value="100">Até R$ 100</option>
                        <option value="150">Até R$ 150</option>
                        <option value="200">Até R$ 200</option>
                    </select>
                </div>
            </div>
            <div class="mentors-grid">
                ${this.mentors.map(mentor => this.createMentorCard(mentor)).join('')}
            </div>
        `;
        document.querySelector('.interactive-features-section').appendChild(container);
        this.addEventListeners();
    }

    createMentorCard(mentor) {
        return `
            <div class="mentor-card" data-mentor-id="${mentor.id}">
                <div class="mentor-header">
                    <img src="${mentor.avatar}" alt="${mentor.name}" class="mentor-avatar">
                    <div class="mentor-info">
                        <h3>${mentor.name}</h3>
                        <div class="mentor-rating">
                            <span class="stars">${'⭐'.repeat(Math.floor(mentor.rating))}</span>
                            <span class="rating-value">${mentor.rating}</span>
                            <span class="reviews-count">(${mentor.reviews} avaliações)</span>
                        </div>
                    </div>
                </div>
                <div class="mentor-specialties">
                    ${mentor.specialties.map(specialty => `
                        <span class="specialty-tag">${specialty}</span>
                    `).join('')}
                </div>
                <div class="mentor-price">
                    <span class="price-value">R$ ${mentor.price}</span>
                    <span class="price-period">/hora</span>
                </div>
                <button class="view-schedule-btn">Ver Horários</button>
            </div>
        `;
    }

    addEventListeners() {
        document.querySelectorAll('.view-schedule-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const mentorId = e.target.closest('.mentor-card').dataset.mentorId;
                const mentor = this.mentors.find(m => m.id === parseInt(mentorId));
                this.showScheduleModal(mentor);
            });
        });

        document.querySelector('.specialty-filter').addEventListener('change', () => {
            this.filterMentors();
        });

        document.querySelector('.price-filter').addEventListener('change', () => {
            this.filterMentors();
        });
    }

    filterMentors() {
        const specialtyFilter = document.querySelector('.specialty-filter').value;
        const priceFilter = parseInt(document.querySelector('.price-filter').value) || Infinity;

        document.querySelectorAll('.mentor-card').forEach(card => {
            const mentorId = parseInt(card.dataset.mentorId);
            const mentor = this.mentors.find(m => m.id === mentorId);
            
            const specialtyMatch = !specialtyFilter || mentor.specialties.includes(specialtyFilter);
            const priceMatch = mentor.price <= priceFilter;

            card.style.display = specialtyMatch && priceMatch ? 'block' : 'none';
        });
    }

    showScheduleModal(mentor) {
        const modal = document.createElement('div');
        modal.className = 'schedule-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Agendar Mentoria com ${mentor.name}</h3>
                    <button class="close-modal">✕</button>
                </div>
                <div class="modal-body">
                    <div class="schedule-grid">
                        ${mentor.availability.map(day => `
                            <div class="schedule-day">
                                <h4>${day.day}</h4>
                                <div class="time-slots">
                                    ${day.slots.map(time => `
                                        <button class="time-slot">${time}</button>
                                    `).join('')}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        this.initializeScheduleModal(modal, mentor);
    }

    initializeScheduleModal(modal, mentor) {
        const closeBtn = modal.querySelector('.close-modal');
        const timeSlots = modal.querySelectorAll('.time-slot');

        closeBtn.addEventListener('click', () => modal.remove());

        timeSlots.forEach(slot => {
            slot.addEventListener('click', () => {
                timeSlots.forEach(s => s.classList.remove('selected'));
                slot.classList.add('selected');
                
                const day = slot.closest('.schedule-day').querySelector('h4').textContent;
                const time = slot.textContent;
                
                this.showConfirmationModal(mentor, day, time);
            });
        });
    }

    showConfirmationModal(mentor, day, time) {
        const modal = document.createElement('div');
        modal.className = 'confirmation-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Confirmar Agendamento</h3>
                    <button class="close-modal">✕</button>
                </div>
                <div class="modal-body">
                    <div class="booking-details">
                        <img src="${mentor.avatar}" alt="${mentor.name}" class="mentor-avatar">
                        <div class="booking-info">
                            <h4>Mentoria com ${mentor.name}</h4>
                            <p>Data: ${day}</p>
                            <p>Horário: ${time}</p>
                            <p>Valor: R$ ${mentor.price}</p>
                        </div>
                    </div>
                    <div class="payment-options">
                        <h4>Forma de Pagamento</h4>
                        <div class="payment-methods">
                            <button class="payment-method" data-method="credit">💳 Cartão de Crédito</button>
                            <button class="payment-method" data-method="pix">📱 PIX</button>
                        </div>
                    </div>
                    <button class="confirm-booking">Confirmar Agendamento</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        this.initializeConfirmationModal(modal, mentor, day, time);
    }

    initializeConfirmationModal(modal, mentor, day, time) {
        const closeBtn = modal.querySelector('.close-modal');
        const paymentMethods = modal.querySelectorAll('.payment-method');
        const confirmBtn = modal.querySelector('.confirm-booking');

        closeBtn.addEventListener('click', () => modal.remove());

        paymentMethods.forEach(method => {
            method.addEventListener('click', () => {
                paymentMethods.forEach(m => m.classList.remove('selected'));
                method.classList.add('selected');
            });
        });

        confirmBtn.addEventListener('click', () => {
            const selectedMethod = modal.querySelector('.payment-method.selected');
            if (!selectedMethod) {
                this.showNotification('Por favor, selecione uma forma de pagamento.');
                return;
            }

            this.processBooking(mentor, day, time, selectedMethod.dataset.method);
            modal.remove();
        });
    }

    processBooking(mentor, day, time, paymentMethod) {
        // Simulate booking process
        const loadingModal = document.createElement('div');
        loadingModal.className = 'loading-modal';
        loadingModal.innerHTML = `
            <div class="loading-spinner"></div>
            <p>Processando seu agendamento...</p>
        `;
        document.body.appendChild(loadingModal);

        setTimeout(() => {
            loadingModal.remove();
            this.showBookingConfirmation(mentor, day, time);
        }, 2000);
    }

    showBookingConfirmation(mentor, day, time) {
        const modal = document.createElement('div');
        modal.className = 'success-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="success-icon">✓</div>
                <h3>Agendamento Confirmado!</h3>
                <div class="confirmation-details">
                    <p>Sua mentoria com ${mentor.name} está agendada para:</p>
                    <p class="booking-time">${day} às ${time}</p>
                </div>
                <p class="confirmation-message">
                    Você receberá um e-mail com os detalhes da sua mentoria e o link para a sala virtual.
                </p>
                <button class="close-confirmation">Fechar</button>
            </div>
        `;
        document.body.appendChild(modal);

        modal.querySelector('.close-confirmation').addEventListener('click', () => {
            modal.remove();
            this.showNotification('Agendamento realizado com sucesso!');
        });
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('show');
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => notification.remove(), 300);
            }, 3000);
        }, 100);
    }
}

// Initialize new features
document.addEventListener('DOMContentLoaded', () => {
    // ... existing code ...
    
    const streaming = new LiveStreamingSystem();
    const mentoring = new MentoringSystem();
});

// Animation namespace to avoid conflicts
const AnimationSystem = {
    reveal: null,
    
    initialize() {
        // Initialize ScrollReveal once
        this.reveal = ScrollReveal({
            origin: 'bottom',
            distance: '20px',
            duration: 1000,
            delay: 200,
            easing: 'cubic-bezier(0.5, 0, 0, 1)'
        });

        // Initialize all reveal animations
        const elements = [
            '.feature-card',
            '.plan-card',
            '.feature-block',
            '.anime-of-week',
            '.event-card',
            '.stream-card',
            '.topic-card',
            '.premium-card'
        ];

        elements.forEach(selector => {
            this.reveal.reveal(selector, { interval: 200 });
        });
    }
};

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    AnimationSystem.initialize();
    
    // Initialize other components
    initializeHeader();
    initializeAnimations();
    initializePaymentSystem();
    initializeGamification();
    initializeKaraoke();
    initializeChat();
    initializeEvents();
    initializeTopics();
    initializeModalSystem();
    
    // Initialize AOS
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });
});

// Header & Navigation
function initializeHeader() {
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll > lastScroll && currentScroll > 100) {
            header.classList.add('header-hidden');
        } else {
            header.classList.remove('header-hidden');
        }
        if (currentScroll > 50) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
        lastScroll = currentScroll;
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Animations
function initializeAnimations() {
    // Reveal animations on scroll
    const revealElements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(element => observer.observe(element));

    // Stats counter animation
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        const value = parseInt(stat.dataset.value);
        let current = 0;
        const increment = value / 50;
        const updateCount = () => {
            if (current < value) {
                current += increment;
                stat.textContent = Math.round(current).toLocaleString();
                requestAnimationFrame(updateCount);
            } else {
                stat.textContent = value.toLocaleString();
            }
        };
        observer.observe(stat);
        stat.addEventListener('enterView', updateCount);
    });
}

// Payment System
function initializePaymentSystem() {
    const planButtons = document.querySelectorAll('.plan-button');
    const paymentModal = document.querySelector('.payment-modal');
    const modalOverlay = document.querySelector('.modal-overlay');
    const closeModal = document.querySelector('.close-modal');
    const paymentMethods = document.querySelectorAll('.payment-method');
    const paymentForm = document.querySelector('.payment-form');

    planButtons.forEach(button => {
        button.addEventListener('click', () => {
            modalOverlay.classList.add('active');
            paymentModal.classList.add('active');
        });
    });

    closeModal.addEventListener('click', () => {
        modalOverlay.classList.remove('active');
        paymentModal.classList.remove('active');
    });

    paymentMethods.forEach(method => {
        method.addEventListener('click', () => {
            paymentMethods.forEach(m => m.classList.remove('selected'));
            method.classList.add('selected');
        });
    });

    // Card input formatting
    const cardNumber = document.getElementById('card-number');
    const cardExpiry = document.getElementById('card-expiry');
    const cardCVV = document.getElementById('card-cvv');

    cardNumber.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        value = value.replace(/(\d{4})/g, '$1 ').trim();
        e.target.value = value.substring(0, 19);
    });

    cardExpiry.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.substring(0, 2) + '/' + value.substring(2, 4);
        }
        e.target.value = value.substring(0, 5);
    });

    cardCVV.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/\D/g, '').substring(0, 3);
    });

    paymentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const button = paymentForm.querySelector('button[type="submit"]');
        button.classList.add('loading');
        
        // Simulate payment processing
        setTimeout(() => {
            button.classList.remove('loading');
            showNotification('Pagamento processado com sucesso!', 'success');
            modalOverlay.classList.remove('active');
            paymentModal.classList.remove('active');
        }, 2000);
    });
}

// Gamification System
function initializeGamification() {
    let points = 0;
    let level = 1;
    const pointsDisplay = document.getElementById('points');
    const levelDisplay = document.getElementById('level');
    const levelProgress = document.getElementById('level-progress');

    function addPoints(amount) {
        points += amount;
        pointsDisplay.textContent = points;
        checkLevelUp();
        
        // Animate points addition
        const pointsAnimation = document.createElement('div');
        pointsAnimation.className = 'points-animation';
        pointsAnimation.textContent = `+${amount}`;
        document.body.appendChild(pointsAnimation);
        setTimeout(() => pointsAnimation.remove(), 1000);
    }

    function checkLevelUp() {
        const nextLevel = Math.floor(points / 1000) + 1;
        if (nextLevel > level) {
            level = nextLevel;
            levelDisplay.textContent = level;
            showLevelUpNotification(level);
        }
        const progress = (points % 1000) / 10;
        levelProgress.style.width = `${progress}%`;
    }

    // Add points for various interactions
    document.querySelectorAll('.feature-card, .topic-card, .join-discussion').forEach(element => {
        element.addEventListener('click', () => addPoints(10));
    });
}

// Karaoke System
function initializeKaraoke() {
    const karaoke = {
        currentSong: null,
        playlist: [],
        isPlaying: false
    };

    const controlButtons = document.querySelectorAll('.control-btn');
    const songProgress = document.querySelector('.progress');
    const timeRemaining = document.querySelector('.time-remaining');

    controlButtons.forEach(button => {
        button.addEventListener('click', () => {
            button.classList.add('active');
            setTimeout(() => button.classList.remove('active'), 200);

            if (button.classList.contains('join-queue')) {
                showNotification('Você entrou na fila do karaokê!', 'success');
            }
        });
    });

    // Simulate song progress
    let progress = 0;
    setInterval(() => {
        if (karaoke.isPlaying) {
            progress = (progress + 1) % 100;
            songProgress.style.width = `${progress}%`;
            const remaining = Math.floor((100 - progress) / 100 * 215);
            timeRemaining.textContent = `${Math.floor(remaining / 60)}:${(remaining % 60).toString().padStart(2, '0')}`;
        }
    }, 1000);
}

// Chat System
function initializeChat() {
    const supportButton = document.querySelector('.support-button');
    const chatWidget = document.querySelector('.chat-widget');
    const closeChat = document.querySelector('.close-chat');
    const chatInput = document.querySelector('.chat-input input');
    const sendButton = document.querySelector('.send-message');
    const messagesContainer = document.querySelector('.chat-messages');

    supportButton.addEventListener('click', () => {
        chatWidget.classList.toggle('active');
    });

    closeChat.addEventListener('click', () => {
        chatWidget.classList.remove('active');
    });

    function addMessage(message, isUser = true) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user' : 'support'}`;
        messageDiv.innerHTML = `<p>${message}</p>`;
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    function handleMessage() {
        const message = chatInput.value.trim();
        if (message) {
            addMessage(message);
            chatInput.value = '';
            
            // Simulate support response
            setTimeout(() => {
                addMessage('Obrigado por sua mensagem! Um de nossos atendentes responderá em breve.', false);
            }, 1000);
        }
    }

    sendButton.addEventListener('click', handleMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleMessage();
    });
}

// Events System
function initializeEvents() {
    const eventButtons = document.querySelectorAll('.btn-register');
    
    eventButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const event = e.target.closest('.event-card');
            const eventName = event.querySelector('h3').textContent;
            
            if (!button.classList.contains('registered')) {
                button.classList.add('registered');
                button.textContent = 'Registrado';
                showNotification(`Você se registrou para: ${eventName}`, 'success');
            }
        });
    });
}

// Topics System
function initializeTopics() {
    const topicCards = document.querySelectorAll('.topic-card');
    
    topicCards.forEach(card => {
        const joinButton = card.querySelector('.join-discussion');
        const statsSpan = card.querySelector('.users-count');
        let currentUsers = parseInt(statsSpan.textContent);
        
        joinButton.addEventListener('click', (e) => {
            e.preventDefault();
            if (!joinButton.classList.contains('joined')) {
                joinButton.classList.add('joined');
                joinButton.textContent = 'Participando';
                currentUsers++;
                statsSpan.textContent = `${currentUsers} usuários ativos`;
                showNotification('Você entrou na discussão!', 'success');
            }
        });
    });
}

// Modal System
function initializeModalSystem() {
    const modals = document.querySelectorAll('[data-modal]');
    const modalOverlay = document.querySelector('.modal-overlay');

    function openModal(modalId) {
        const modal = document.querySelector(modalId);
        if (modal) {
            modalOverlay.classList.add('active');
            modal.classList.add('active');
        }
    }

    function closeModal(modal) {
        modalOverlay.classList.remove('active');
        modal.classList.remove('active');
    }

    document.querySelectorAll('[data-modal-trigger]').forEach(trigger => {
        trigger.addEventListener('click', () => {
            const modalId = trigger.dataset.modalTrigger;
            openModal(modalId);
        });
    });

    document.querySelectorAll('.close-modal').forEach(closeButton => {
        closeButton.addEventListener('click', () => {
            const modal = closeButton.closest('.modal');
            closeModal(modal);
        });
    });

    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            document.querySelector('.modal.active')?.classList.remove('active');
            modalOverlay.classList.remove('active');
        }
    });
}

// Utility Functions
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function showLevelUpNotification(level) {
    const template = document.getElementById('level-up-template');
    const notification = template.content.cloneNode(true);
    notification.querySelector('.new-level').textContent = level;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        document.querySelector('.level-up-notification').remove();
    }, 3000);
}

// Initialize AOS for scroll animations
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true
});

// Advanced Achievement System
class AchievementSystem {
    constructor() {
        this.achievements = {
            learning: [
                {
                    id: 'first-lesson',
                    title: 'Primeiro Passo',
                    description: 'Complete sua primeira lição',
                    icon: '🎯',
                    points: 50,
                    unlocked: false
                },
                {
                    id: 'study-streak',
                    title: 'Dedicação Diária',
                    description: 'Mantenha uma sequência de 7 dias',
                    icon: '🔥',
                    points: 100,
                    unlocked: false
                },
                {
                    id: 'kanji-master',
                    title: 'Mestre dos Kanji',
                    description: 'Aprenda 100 kanji',
                    icon: '📚',
                    points: 200,
                    unlocked: false
                }
            ],
            social: [
                {
                    id: 'first-friend',
                    title: 'Conexão Inicial',
                    description: 'Faça seu primeiro amigo',
                    icon: '🤝',
                    points: 50,
                    unlocked: false
                },
                {
                    id: 'helpful',
                    title: 'Prestativo',
                    description: 'Ajude 10 estudantes',
                    icon: '💪',
                    points: 150,
                    unlocked: false
                }
            ],
            events: [
                {
                    id: 'event-participant',
                    title: 'Participante Ativo',
                    description: 'Participe de 5 eventos',
                    icon: '🎉',
                    points: 100,
                    unlocked: false
                }
            ]
        };
        
        this.progress = {
            lessonsCompleted: 0,
            streak: 0,
            kanjiLearned: 0,
            friends: 0,
            helpedStudents: 0,
            eventsAttended: 0
        };

        this.initializeUI();
        this.checkAchievements();
    }

    initializeUI() {
        const container = document.createElement('div');
        container.className = 'achievements-panel';
        container.innerHTML = `
            <div class="achievements-header">
                <h2>Conquistas</h2>
                <div class="achievement-stats">
                    <span class="total-achievements">0/${this.getTotalAchievements()}</span>
                    <span class="total-points">0 pontos</span>
                </div>
            </div>
            <div class="achievements-categories">
                ${Object.keys(this.achievements).map(category => `
                    <button class="category-btn" data-category="${category}">
                        ${this.getCategoryIcon(category)}
                        ${category.charAt(0).toUpperCase() + category.slice(1)}
                    </button>
                `).join('')}
            </div>
            <div class="achievements-list"></div>
        `;
        
        document.querySelector('.interactive-features-section').appendChild(container);
        this.addEventListeners();
        this.showCategory('learning');
    }

    getCategoryIcon(category) {
        const icons = {
            learning: '📚',
            social: '👥',
            events: '🎉'
        };
        return icons[category] || '🏆';
    }

    addEventListeners() {
        document.querySelectorAll('.category-btn').forEach(button => {
            button.addEventListener('click', () => {
                const category = button.dataset.category;
                this.showCategory(category);
            });
        });
    }

    showCategory(category) {
        const list = document.querySelector('.achievements-list');
        const achievements = this.achievements[category];
        
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.category === category);
        });

        list.innerHTML = achievements.map(achievement => `
            <div class="achievement-card ${achievement.unlocked ? 'unlocked' : 'locked'}">
                <div class="achievement-icon">${achievement.icon}</div>
                <div class="achievement-info">
                    <h3>${achievement.title}</h3>
                    <p>${achievement.description}</p>
                    <div class="achievement-progress">
                        <div class="progress-bar">
                            <div class="progress" style="width: ${this.getProgressPercentage(achievement)}%"></div>
                        </div>
                        <span class="points">+${achievement.points} pts</span>
                    </div>
                </div>
            </div>
        `).join('');
    }

    getProgressPercentage(achievement) {
        // Calculate progress based on achievement type
        switch(achievement.id) {
            case 'study-streak':
                return (this.progress.streak / 7) * 100;
            case 'kanji-master':
                return (this.progress.kanjiLearned / 100) * 100;
            case 'helpful':
                return (this.progress.helpedStudents / 10) * 100;
            case 'event-participant':
                return (this.progress.eventsAttended / 5) * 100;
            default:
                return achievement.unlocked ? 100 : 0;
        }
    }

    getTotalAchievements() {
        return Object.values(this.achievements)
            .reduce((total, category) => total + category.length, 0);
    }

    getUnlockedAchievements() {
        return Object.values(this.achievements)
            .reduce((total, category) => 
                total + category.filter(a => a.unlocked).length, 0);
    }

    getTotalPoints() {
        return Object.values(this.achievements)
            .reduce((total, category) => 
                total + category.filter(a => a.unlocked)
                    .reduce((sum, a) => sum + a.points, 0), 0);
    }

    updateProgress(type, value) {
        this.progress[type] = value;
        this.checkAchievements();
        this.updateUI();
    }

    checkAchievements() {
        // Check learning achievements
        if (this.progress.lessonsCompleted >= 1) {
            this.unlockAchievement('first-lesson');
        }
        if (this.progress.streak >= 7) {
            this.unlockAchievement('study-streak');
        }
        if (this.progress.kanjiLearned >= 100) {
            this.unlockAchievement('kanji-master');
        }

        // Check social achievements
        if (this.progress.friends >= 1) {
            this.unlockAchievement('first-friend');
        }
        if (this.progress.helpedStudents >= 10) {
            this.unlockAchievement('helpful');
        }

        // Check event achievements
        if (this.progress.eventsAttended >= 5) {
            this.unlockAchievement('event-participant');
        }
    }

    unlockAchievement(achievementId) {
        for (const category of Object.values(this.achievements)) {
            const achievement = category.find(a => a.id === achievementId);
            if (achievement && !achievement.unlocked) {
                achievement.unlocked = true;
                this.showAchievementNotification(achievement);
                this.updateUI();
                break;
            }
        }
    }

    showAchievementNotification(achievement) {
        const notification = document.createElement('div');
        notification.className = 'achievement-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <div class="achievement-icon">${achievement.icon}</div>
                <div class="achievement-details">
                    <h3>Nova Conquista Desbloqueada!</h3>
                    <p>${achievement.title}</p>
                    <span class="points">+${achievement.points} pontos</span>
                </div>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => notification.remove(), 300);
            }, 3000);
        }, 100);

        // Add points to gamification system
        gamification.addPoints(achievement.points);
    }

    updateUI() {
        const totalAchievements = document.querySelector('.total-achievements');
        const totalPoints = document.querySelector('.total-points');
        
        if (totalAchievements && totalPoints) {
            totalAchievements.textContent = 
                `${this.getUnlockedAchievements()}/${this.getTotalAchievements()}`;
            totalPoints.textContent = `${this.getTotalPoints()} pontos`;
        }

        // Update current category view
        const activeCategory = document.querySelector('.category-btn.active');
        if (activeCategory) {
            this.showCategory(activeCategory.dataset.category);
        }
    }
}

// Initialize Achievement System
const achievementSystem = new AchievementSystem();

// Vocabulary Battle System
class VocabularyBattleSystem {
    constructor() {
        this.battleState = {
            isActive: false,
            currentRound: 0,
            maxRounds: 5,
            playerHealth: 100,
            opponentHealth: 100,
            playerScore: 0,
            opponentScore: 0
        };

        this.vocabulary = {
            N5: [
                { word: '犬', reading: 'いぬ', meaning: 'cachorro', points: 10 },
                { word: '猫', reading: 'ねこ', meaning: 'gato', points: 10 },
                { word: '水', reading: 'みず', meaning: 'água', points: 10 },
                { word: '火', reading: 'ひ', meaning: 'fogo', points: 10 }
            ],
            N4: [
                { word: '約束', reading: 'やくそく', meaning: 'promessa', points: 20 },
                { word: '練習', reading: 'れんしゅう', meaning: 'prática', points: 20 },
                { word: '準備', reading: 'じゅんび', meaning: 'preparação', points: 20 }
            ],
            N3: [
                { word: '我慢', reading: 'がまん', meaning: 'paciência', points: 30 },
                { word: '経験', reading: 'けいけん', meaning: 'experiência', points: 30 },
                { word: '態度', reading: 'たいど', meaning: 'atitude', points: 30 }
            ]
        };

        this.currentWord = null;
        this.timer = null;
        this.timeLimit = 15; // seconds per round
        this.initializeUI();
    }

    initializeUI() {
        const container = document.createElement('div');
        container.className = 'vocabulary-battle';
        container.innerHTML = `
            <div class="battle-header">
                <h2>Batalha de Vocabulário</h2>
                <button class="start-battle">Iniciar Batalha</button>
            </div>
            <div class="battle-arena" style="display: none;">
                <div class="battle-status">
                    <div class="player-status">
                        <div class="player-info">
                            <img src="player-avatar.jpg" alt="Player" class="avatar">
                            <div class="health-bar">
                                <div class="health-fill player-health" style="width: 100%"></div>
                            </div>
                            <span class="score">0 pts</span>
                        </div>
                    </div>
                    <div class="battle-timer">15</div>
                    <div class="opponent-status">
                        <div class="opponent-info">
                            <img src="opponent-avatar.jpg" alt="Opponent" class="avatar">
                            <div class="health-bar">
                                <div class="health-fill opponent-health" style="width: 100%"></div>
                            </div>
                            <span class="score">0 pts</span>
                        </div>
                    </div>
                </div>
                <div class="battle-content">
                    <div class="word-display">
                        <div class="kanji"></div>
                        <div class="reading"></div>
                    </div>
                    <div class="answer-options"></div>
                </div>
                <div class="battle-controls">
                    <button class="surrender-btn">Desistir</button>
                </div>
            </div>
        `;
        
        document.querySelector('.interactive-features-section').appendChild(container);
        this.addEventListeners();
    }

    addEventListeners() {
        document.querySelector('.start-battle').addEventListener('click', () => {
            this.startBattle();
        });

        document.querySelector('.surrender-btn').addEventListener('click', () => {
            this.endBattle('surrender');
        });
    }

    startBattle() {
        this.battleState = {
            isActive: true,
            currentRound: 0,
            maxRounds: 5,
            playerHealth: 100,
            opponentHealth: 100,
            playerScore: 0,
            opponentScore: 0
        };

        document.querySelector('.battle-arena').style.display = 'block';
        document.querySelector('.start-battle').style.display = 'none';

        this.nextRound();
    }

    nextRound() {
        if (this.battleState.currentRound >= this.battleState.maxRounds) {
            this.endBattle('complete');
            return;
        }

        this.battleState.currentRound++;
        this.selectWord();
        this.updateUI();
        this.startTimer();
    }

    selectWord() {
        // Randomly select difficulty
        const difficulties = Object.keys(this.vocabulary);
        const difficulty = difficulties[Math.floor(Math.random() * difficulties.length)];
        const words = this.vocabulary[difficulty];
        
        // Select random word
        this.currentWord = words[Math.floor(Math.random() * words.length)];
        
        // Create answer options
        const options = [this.currentWord.meaning];
        while (options.length < 4) {
            const randomDifficulty = difficulties[Math.floor(Math.random() * difficulties.length)];
            const randomWord = this.vocabulary[randomDifficulty][
                Math.floor(Math.random() * this.vocabulary[randomDifficulty].length)
            ];
            if (!options.includes(randomWord.meaning)) {
                options.push(randomWord.meaning);
            }
        }

        // Shuffle options
        const shuffledOptions = options.sort(() => Math.random() - 0.5);

        // Update UI
        document.querySelector('.kanji').textContent = this.currentWord.word;
        document.querySelector('.reading').textContent = this.currentWord.reading;
        document.querySelector('.answer-options').innerHTML = shuffledOptions.map(option => `
            <button class="answer-btn" data-answer="${option}">${option}</button>
        `).join('');

        // Add click listeners to answer buttons
        document.querySelectorAll('.answer-btn').forEach(button => {
            button.addEventListener('click', () => this.checkAnswer(button.dataset.answer));
        });
    }

    startTimer() {
        let timeLeft = this.timeLimit;
        document.querySelector('.battle-timer').textContent = timeLeft;

        clearInterval(this.timer);
        this.timer = setInterval(() => {
            timeLeft--;
            document.querySelector('.battle-timer').textContent = timeLeft;

            if (timeLeft <= 0) {
                clearInterval(this.timer);
                this.handleTimeout();
            }
        }, 1000);
    }

    checkAnswer(answer) {
        clearInterval(this.timer);
        const isCorrect = answer === this.currentWord.meaning;

        if (isCorrect) {
            this.handleCorrectAnswer();
        } else {
            this.handleWrongAnswer();
        }

        setTimeout(() => this.nextRound(), 1500);
    }

    handleCorrectAnswer() {
        const damage = this.currentWord.points;
        this.battleState.opponentHealth -= damage;
        this.battleState.playerScore += this.currentWord.points;
        
        this.showBattleAnimation('attack');
        this.updateUI();
        
        // Show success animation
        const wordDisplay = document.querySelector('.word-display');
        wordDisplay.classList.add('correct');
        setTimeout(() => wordDisplay.classList.remove('correct'), 1000);
    }

    handleWrongAnswer() {
        const damage = this.currentWord.points;
        this.battleState.playerHealth -= damage;
        this.battleState.opponentScore += this.currentWord.points;
        
        this.showBattleAnimation('damage');
        this.updateUI();
        
        // Show error animation
        const wordDisplay = document.querySelector('.word-display');
        wordDisplay.classList.add('wrong');
        setTimeout(() => wordDisplay.classList.remove('wrong'), 1000);
    }

    handleTimeout() {
        this.handleWrongAnswer();
        setTimeout(() => this.nextRound(), 1500);
    }

    showBattleAnimation(type) {
        const arena = document.querySelector('.battle-arena');
        arena.classList.add(type);
        setTimeout(() => arena.classList.remove(type), 500);
    }

    updateUI() {
        // Update health bars
        document.querySelector('.player-health').style.width = 
            `${Math.max(0, this.battleState.playerHealth)}%`;
        document.querySelector('.opponent-health').style.width = 
            `${Math.max(0, this.battleState.opponentHealth)}%`;

        // Update scores
        document.querySelector('.player-status .score').textContent = 
            `${this.battleState.playerScore} pts`;
        document.querySelector('.opponent-status .score').textContent = 
            `${this.battleState.opponentScore} pts`;

        // Check for battle end conditions
        if (this.battleState.playerHealth <= 0 || this.battleState.opponentHealth <= 0) {
            this.endBattle('knockout');
        }
    }

    endBattle(reason) {
        clearInterval(this.timer);
        this.battleState.isActive = false;

        const result = {
            winner: this.battleState.playerScore > this.battleState.opponentScore ? 'player' : 'opponent',
            playerScore: this.battleState.playerScore,
            opponentScore: this.battleState.opponentScore,
            reason: reason
        };

        this.showBattleResults(result);
    }

    showBattleResults(result) {
        const resultsModal = document.createElement('div');
        resultsModal.className = 'battle-results-modal';
        resultsModal.innerHTML = `
            <div class="results-content">
                <h3>${result.winner === 'player' ? 'Vitória!' : 'Derrota!'}</h3>
                <div class="results-details">
                    <div class="player-result">
                        <span class="score">${result.playerScore}</span>
                        <span class="label">Seus pontos</span>
                    </div>
                    <div class="vs">VS</div>
                    <div class="opponent-result">
                        <span class="score">${result.opponentScore}</span>
                        <span class="label">Oponente</span>
                    </div>
                </div>
                <div class="rewards">
                    <h4>Recompensas</h4>
                    <p>+${result.winner === 'player' ? 100 : 25} XP</p>
                    <p>+${result.winner === 'player' ? 50 : 10} moedas</p>
                </div>
                <button class="close-results">Continuar</button>
            </div>
        `;

        document.body.appendChild(resultsModal);

        resultsModal.querySelector('.close-results').addEventListener('click', () => {
            resultsModal.remove();
            document.querySelector('.battle-arena').style.display = 'none';
            document.querySelector('.start-battle').style.display = 'block';
        });

        // Add rewards to player's account
        if (result.winner === 'player') {
            gamification.addPoints(100);
            // Add coins to player's wallet
            // walletSystem.addCoins(50);
        } else {
            gamification.addPoints(25);
            // walletSystem.addCoins(10);
        }
    }
}

// Initialize Vocabulary Battle System
const vocabularyBattle = new VocabularyBattleSystem();

// ... rest of the code ...

// Menu móvel
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('open');
  document.body.classList.toggle('menu-open');
});

// Smooth scroll com animação melhorada
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      const headerOffset = 100;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollBy({
        top: offsetPosition,
        behavior: 'smooth'
      });

      if (navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        document.body.classList.remove('menu-open');
      }
    }
  });
});

// Animações no scroll
const animateOnScroll = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      
      // Anima números nos cards de features
      if (entry.target.classList.contains('feature-card')) {
        const numbers = entry.target.querySelectorAll('.number');
        numbers.forEach(num => {
          const target = parseInt(num.getAttribute('data-target'));
          animateNumber(num, target);
        });
      }
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('section, .feature-card, .plan-card, .slide').forEach(el => {
  el.classList.add('reveal');
  animateOnScroll.observe(el);
});

// Animação de números
function animateNumber(element, target) {
  let current = 0;
  const increment = target / 50;
  const timer = setInterval(() => {
    current += increment;
    element.textContent = Math.floor(current);
    if (current >= target) {
      element.textContent = target;
      clearInterval(timer);
    }
  }, 20);
}

// Slider de depoimentos com touch
const slider = document.querySelector('.slider');
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener('mousedown', e => {
  isDown = true;
  slider.classList.add('active');
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});

slider.addEventListener('mouseleave', () => {
  isDown = false;
  slider.classList.remove('active');
});

slider.addEventListener('mouseup', () => {
  isDown = false;
  slider.classList.remove('active');
});

slider.addEventListener('mousemove', e => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 2;
  slider.scrollLeft = scrollLeft - walk;
});

// Touch events para mobile
slider.addEventListener('touchstart', e => {
  isDown = true;
  slider.classList.add('active');
  startX = e.touches[0].pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});

slider.addEventListener('touchend', () => {
  isDown = false;
  slider.classList.remove('active');
});

slider.addEventListener('touchmove', e => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.touches[0].pageX - slider.offsetLeft;
  const walk = (x - startX) * 2;
  slider.scrollLeft = scrollLeft - walk;
});

// Validação de formulário melhorada
const form = document.querySelector('.contact-form');
const inputs = form.querySelectorAll('input, select, textarea');

inputs.forEach(input => {
  input.addEventListener('focus', () => {
    input.parentElement.classList.add('focused');
  });

  input.addEventListener('blur', () => {
    input.parentElement.classList.remove('focused');
    validateInput(input);
  });
});

function validateInput(input) {
  const value = input.value.trim();
  
  if (!value) {
    input.classList.add('error');
    showError(input, 'Este campo é obrigatório');
  } else if (input.type === 'email' && !isValidEmail(value)) {
    input.classList.add('error');
    showError(input, 'Email inválido');
  } else {
    input.classList.remove('error');
    removeError(input);
  }
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showError(input, message) {
  const errorDiv = input.parentElement.querySelector('.error-message') || 
                  document.createElement('div');
  errorDiv.className = 'error-message';
  errorDiv.textContent = message;
  
  if (!input.parentElement.querySelector('.error-message')) {
    input.parentElement.appendChild(errorDiv);
  }
}

function removeError(input) {
  const errorDiv = input.parentElement.querySelector('.error-message');
  if (errorDiv) {
    errorDiv.remove();
  }
}

form.addEventListener('submit', e => {
  e.preventDefault();
  let isValid = true;
  
  inputs.forEach(input => {
    validateInput(input);
    if (input.classList.contains('error')) {
      isValid = false;
    }
  });
  
  if (isValid) {
    const button = form.querySelector('button[type="submit"]');
    button.disabled = true;
    button.textContent = 'Enviando...';
    
    // Simula envio
    setTimeout(() => {
      showSuccessMessage();
      form.reset();
      button.disabled = false;
      button.textContent = 'Enviar';
    }, 1500);
  }
});

function showSuccessMessage() {
  const message = document.createElement('div');
  message.className = 'success-message';
  message.textContent = 'Mensagem enviada com sucesso!';
  
  form.appendChild(message);
  
  setTimeout(() => {
    message.remove();
  }, 3000);
}

// Parallax no hero
window.addEventListener('scroll', () => {
  const hero = document.querySelector('.hero');
  const scrolled = window.pageYOffset;
  hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
});

// Animação do FAQ
document.querySelectorAll('.faq details').forEach(detail => {
  detail.addEventListener('toggle', e => {
    if (detail.open) {
      const content = detail.querySelector('p');
      content.style.maxHeight = content.scrollHeight + 'px';
      content.style.opacity = '1';
    } else {
      const content = detail.querySelector('p');
      content.style.maxHeight = '0';
      content.style.opacity = '0';
    }
  });
});

// Navegação Mobile
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle?.addEventListener('click', () => {
  navMenu?.classList.toggle('open');
});

// Animação de Scroll
const revealElements = document.querySelectorAll('.reveal');

const reveal = () => {
  revealElements.forEach(element => {
    const windowHeight = window.innerHeight;
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;

    if (elementTop < windowHeight - elementVisible) {
      element.classList.add('visible');
    }
  });
};

window.addEventListener('scroll', reveal);

// Slider de Depoimentos
const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');

let currentSlide = 0;
const slideWidth = slides[0]?.offsetWidth || 0;
const totalSlides = slides.length;

const updateDots = (index) => {
  dots.forEach(dot => dot.classList.remove('active'));
  dots[index]?.classList.add('active');
};

const scrollToSlide = (index) => {
  if (!slider) return;
  slider.scrollTo({
    left: slideWidth * index,
    behavior: 'smooth'
  });
  currentSlide = index;
  updateDots(index);
};

prevButton?.addEventListener('click', () => {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  scrollToSlide(currentSlide);
});

nextButton?.addEventListener('click', () => {
  currentSlide = (currentSlide + 1) % totalSlides;
  scrollToSlide(currentSlide);
});

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    scrollToSlide(index);
  });
});

// Autoplay do slider
let autoplayInterval;

const startAutoplay = () => {
  autoplayInterval = setInterval(() => {
    currentSlide = (currentSlide + 1) % totalSlides;
    scrollToSlide(currentSlide);
  }, 5000);
};

const stopAutoplay = () => {
  clearInterval(autoplayInterval);
};

slider?.addEventListener('mouseenter', stopAutoplay);
slider?.addEventListener('mouseleave', startAutoplay);

startAutoplay();

// Animação de Scroll Suave
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

// Validação do Formulário
const form = document.querySelector('.contact-form');

form?.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Simulação de envio
  const button = form.querySelector('button');
  const originalText = button.textContent;
  
  button.textContent = 'Enviando...';
  button.disabled = true;
  
  setTimeout(() => {
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.textContent = 'Mensagem enviada com sucesso! Em breve entraremos em contato.';
    
    form.reset();
    form.appendChild(successMessage);
    
    button.textContent = originalText;
    button.disabled = false;
    
    setTimeout(() => {
      successMessage.remove();
    }, 5000);
  }, 1500);
});

// Efeito de Foco nos Inputs
const formInputs = document.querySelectorAll('.contact-form input, .contact-form select, .contact-form textarea');

formInputs.forEach(input => {
  const formGroup = input.parentElement;
  
  input.addEventListener('focus', () => {
    formGroup.classList.add('focused');
  });
  
  input.addEventListener('blur', () => {
    formGroup.classList.remove('focused');
  });
});

// Menu Mobile
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });

        // Fechar menu ao clicar em um link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });

        // Fechar menu ao clicar fora
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                navMenu.classList.remove('active');
            }
        });
    }

    // Animação de elementos ao rolar
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.animate');
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight;
            
            if(elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }

    // Smooth scroll para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Inicializar animações
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();
});