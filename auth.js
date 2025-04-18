// Seleção de elementos
const authTabs = document.querySelectorAll('.auth-tab');
const authForms = document.querySelectorAll('.auth-form');
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const togglePasswordBtns = document.querySelectorAll('.toggle-password');
const passwordInputs = document.querySelectorAll('[type="password"]');
const signupPassword = document.getElementById('signup-password');
const strengthBar = document.querySelector('.strength-bar');
const strengthText = document.querySelector('.strength-text');

// Alternância entre formulários
authTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const targetForm = tab.dataset.tab;
        
        // Atualizar tabs
        authTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        // Atualizar formulários
        authForms.forEach(form => {
            form.classList.remove('active');
            if (form.id === `${targetForm}-form`) {
                form.classList.add('active');
            }
        });
    });
});

// Mostrar/ocultar senha
togglePasswordBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const input = btn.previousElementSibling;
        const type = input.type === 'password' ? 'text' : 'password';
        input.type = type;
        btn.textContent = type === 'password' ? '👁️' : '👁️‍🗨️';
    });
});

// Verificar força da senha
function checkPasswordStrength(password) {
    let strength = 0;
    
    // Comprimento mínimo
    if (password.length >= 8) strength += 25;
    
    // Letras maiúsculas e minúsculas
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength += 25;
    
    // Números
    if (password.match(/\d/)) strength += 25;
    
    // Caracteres especiais
    if (password.match(/[^a-zA-Z\d]/)) strength += 25;
    
    return strength;
}

function updatePasswordStrength(strength) {
    if (!strengthBar || !strengthText) return;
    
    strengthBar.style.width = `${strength}%`;
    
    let text = 'Fraca';
    let color = '#ff4b4b';
    
    if (strength >= 100) {
        text = 'Forte';
        color = '#4CAF50';
    } else if (strength >= 50) {
        text = 'Média';
        color = '#FFA500';
    }
    
    strengthBar.style.background = color;
    strengthText.textContent = `Força da senha: ${text}`;
}

if (signupPassword) {
    signupPassword.addEventListener('input', (e) => {
        const strength = checkPasswordStrength(e.target.value);
        updatePasswordStrength(strength);
    });
}

// Funções de feedback
function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    
    const form = document.querySelector('.auth-form.active');
    const existingError = form.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    form.insertBefore(errorDiv, form.firstChild);
    
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}

function showSuccess(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    
    const form = document.querySelector('.auth-form.active');
    const existingSuccess = form.querySelector('.success-message');
    if (existingSuccess) {
        existingSuccess.remove();
    }
    
    form.insertBefore(successDiv, form.firstChild);
}

// Verificar autenticação
function checkAuth() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const currentPath = window.location.pathname;
    
    if (isLoggedIn) {
        // Se está logado e está na página de auth, redireciona para dashboard
        if (currentPath.includes('auth.html')) {
            window.location.replace('dashboard.html');
        }
    } else {
        // Se não está logado e está no dashboard, redireciona para auth
        if (currentPath.includes('dashboard.html')) {
            window.location.replace('auth.html');
        }
    }
}

// Login
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = loginForm.querySelector('input[type="email"]').value;
        const password = loginForm.querySelector('input[type="password"]').value;
        const remember = loginForm.querySelector('input[type="checkbox"]')?.checked;
        
        try {
            const user = window.dbUtils.findUserByEmail(email);
            
            if (!user || user.password !== password) {
                throw new Error('Email ou senha inválidos');
            }
            
            // Salvar dados em localStorage
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userId', user.id);
            localStorage.setItem('userName', user.name);
            
            if (remember) {
                localStorage.setItem('rememberUser', email);
            }
            
            showSuccess('Login realizado com sucesso!');
            
            // Redirecionar imediatamente
            window.location.replace('dashboard.html');
            
        } catch (error) {
            showError(error.message);
        }
    });
}

// Cadastro
if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const name = signupForm.querySelector('#signup-name').value;
        const email = signupForm.querySelector('#signup-email').value;
        const password = signupForm.querySelector('#signup-password').value;
        const level = signupForm.querySelector('#signup-level').value;
        
        try {
            // Verificar se email já existe
            if (window.dbUtils.findUserByEmail(email)) {
                throw new Error('Este email já está cadastrado');
            }
            
            // Verificar força da senha
            if (checkPasswordStrength(password) < 50) {
                throw new Error('A senha precisa ser mais forte');
            }
            
            // Criar novo usuário
            const newUser = window.dbUtils.createUser({
                name,
                email,
                password,
                level,
                plan: null
            });
            
            // Garantir que o usuário foi criado
            if (!newUser) {
                throw new Error('Erro ao criar usuário');
            }
            
            // Limpar campos do formulário
            signupForm.reset();
            
            showSuccess('Conta criada com sucesso! Por favor, faça login.');
            
            // Mudar para a aba de login após 1 segundo
            setTimeout(() => {
                const loginTab = document.querySelector('[data-tab="login"]');
                if (loginTab) {
                    loginTab.click();
                    
                    // Preencher o email no formulário de login
                    const loginEmail = document.querySelector('#login-form input[type="email"]');
                    if (loginEmail) {
                        loginEmail.value = email;
                    }
                }
            }, 1000);
            
        } catch (error) {
            showError(error.message);
        }
    });
}

// Carregar estado inicial
document.addEventListener('DOMContentLoaded', () => {
    // Verificar autenticação primeiro
    checkAuth();
    
    // Se estamos na página de auth
    if (window.location.pathname.includes('auth.html')) {
        // Carregar email salvo se existir
        const rememberedUser = localStorage.getItem('rememberUser');
        if (rememberedUser && loginForm) {
            const emailInput = loginForm.querySelector('input[type="email"]');
            if (emailInput) {
                emailInput.value = rememberedUser;
            }
        }
        
        // Verificar URL params para tab inicial
        const urlParams = new URLSearchParams(window.location.search);
        const initialTab = urlParams.get('tab');
        if (initialTab) {
            const tab = document.querySelector(`[data-tab="${initialTab}"]`);
            if (tab) tab.click();
        }
        
        // Animar entrada
        const authBox = document.querySelector('.auth-box');
        const authDecoration = document.querySelector('.auth-decoration');
        
        if (authBox) {
            authBox.style.opacity = '0';
            setTimeout(() => {
                authBox.style.opacity = '1';
                authBox.style.transform = 'translateY(0)';
            }, 100);
        }
        
        if (authDecoration) {
            authDecoration.style.opacity = '0';
            setTimeout(() => {
                authDecoration.style.opacity = '1';
                authDecoration.style.transform = 'translateX(0)';
            }, 300);
        }
    }
}); 