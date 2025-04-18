// Simulação de banco de dados com persistência
const defaultDb = {
    users: [
        {
            id: 1,
            name: "Admin",
            email: "admin@chonfez.com",
            password: "admin123", // Em um sistema real, isso seria hash
            level: "N3",
            plan: "sensei",
            points: 2500,
            streak: 65,
            progress: {
                n5: 100,
                n4: 85,
                n3: 45,
                n2: 0,
                n1: 0
            },
            achievements: [
                { id: 1, name: "Primeiro Login", icon: "🎉", description: "Bem-vindo à Chonfez!" },
                { id: 2, name: "Streak de 60 dias", icon: "🔥", description: "Manteve os estudos por 60 dias!" }
            ],
            lessons_completed: 42,
            kanji_learned: 250,
            vocabulary_learned: 500,
            grammar_points: 120
        }
    ],
    plans: {
        basic: {
            id: "basic",
            name: "Básico",
            price: 49.90,
            features: [
                "Acesso a aulas gravadas",
                "Material digital básico",
                "Exercícios de N5",
                "Fórum da comunidade",
                "Tracking de progresso"
            ],
            icon: "🍙",
            recommended: false
        },
        otaku: {
            id: "otaku",
            name: "Otaku",
            price: 89.90,
            features: [
                "Tudo do plano Básico",
                "Aulas ao vivo semanais",
                "Análise de cenas de anime",
                "Clube de conversação",
                "Exercícios até N4",
                "Karaokê em grupo",
                "Desafios semanais",
                "Chat exclusivo Discord"
            ],
            icon: "🎎",
            recommended: true
        },
        sensei: {
            id: "sensei",
            name: "Sensei",
            price: 149.90,
            features: [
                "Tudo do plano Otaku",
                "Mentoria individual",
                "2 aulas particulares/mês",
                "Conteúdo exclusivo",
                "Exercícios até N1",
                "Preparação JLPT",
                "Certificado de conclusão",
                "Prioridade no suporte"
            ],
            icon: "⛩️",
            recommended: false
        }
    },
    lessons: [
        {
            id: 1,
            title: "Introdução ao Hiragana",
            description: "Aprenda os primeiros caracteres do hiragana",
            duration: "30min",
            level: "N5",
            thumbnail: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?q=80",
            type: "beginner"
        },
        {
            id: 2,
            title: "Expressões de Anime",
            description: "Frases comuns em animes populares",
            duration: "45min",
            level: "N5",
            thumbnail: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80",
            type: "culture"
        }
    ],
    challenges: [
        {
            id: 1,
            title: "Maratona de Hiragana",
            description: "Complete todos os exercícios de hiragana",
            reward: 100,
            icon: "✍️",
            duration: "7 dias"
        },
        {
            id: 2,
            title: "Mestre do Kanji",
            description: "Aprenda 20 novos kanji",
            reward: 200,
            icon: "🈯",
            duration: "3 dias"
        }
    ],
    achievements: [
        {
            id: 1,
            name: "Primeiro Login",
            icon: "🎉",
            description: "Bem-vindo à Chonfez!",
            points: 50
        },
        {
            id: 2,
            name: "Streak de 7 dias",
            icon: "🔥",
            description: "Estudou por 7 dias seguidos",
            points: 100
        }
    ]
};

// Carregar banco de dados do localStorage ou usar o padrão
let db = JSON.parse(localStorage.getItem('chonfezDb')) || defaultDb;

// Funções de utilidade para manipular o "banco de dados"
const dbUtils = {
    // Salvar alterações no localStorage
    saveChanges: () => {
        localStorage.setItem('chonfezDb', JSON.stringify(db));
    },
    
    // Usuários
    findUserByEmail: (email) => {
        return db.users.find(user => user.email === email);
    },
    
    createUser: (userData) => {
        const newUser = {
            id: db.users.length + 1,
            ...userData,
            points: 0,
            streak: 0,
            progress: {
                n5: 0,
                n4: 0,
                n3: 0,
                n2: 0,
                n1: 0
            },
            achievements: [db.achievements[0]], // Primeiro login
            lessons_completed: 0,
            kanji_learned: 0,
            vocabulary_learned: 0,
            grammar_points: 0
        };
        db.users.push(newUser);
        dbUtils.saveChanges(); // Salvar após criar usuário
        return newUser;
    },
    
    updateUser: (id, updates) => {
        const index = db.users.findIndex(user => user.id === id);
        if (index !== -1) {
            db.users[index] = { ...db.users[index], ...updates };
            dbUtils.saveChanges(); // Salvar após atualizar usuário
            return db.users[index];
        }
        return null;
    },
    
    // Planos
    getPlanById: (planId) => {
        return db.plans[planId];
    },
    
    getAllPlans: () => {
        return Object.values(db.plans);
    },
    
    // Lições
    getLessonsByLevel: (level) => {
        return db.lessons.filter(lesson => lesson.level === level);
    },
    
    // Desafios
    getActiveChallenges: () => {
        return db.challenges;
    },
    
    // Conquistas
    getAchievements: () => {
        return db.achievements;
    },
    
    // Atualizar benefícios do plano na página de pagamento
    updatePlanBenefits: (planId) => {
        const plan = db.plans[planId];
        if (!plan) return;
        
        const benefitsList = document.getElementById('plan-benefits');
        if (!benefitsList) return;
        
        benefitsList.innerHTML = plan.features.map(feature => `
            <li class="benefit-item">
                <i class="fas fa-check"></i>
                <span>${feature}</span>
            </li>
        `).join('');
    }
};

// Exportar para uso em outros arquivos
window.db = db;
window.dbUtils = dbUtils; 