// Elementos do DOM
const paymentForm = document.getElementById('payment-form');
const cardNumber = document.getElementById('card-number');
const cardName = document.getElementById('card-name');
const cardExpiry = document.getElementById('card-expiry');
const cardCVC = document.getElementById('card-cvc');
const paymentMethods = document.querySelectorAll('.payment-method');
const cardIcons = document.querySelectorAll('.card-icons img');

// Variáveis globais
let selectedPlan = null;
let processingPayment = false;

// Carregar dados do plano selecionado
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const planId = urlParams.get('plan');
    
    if (!planId) {
        window.location.href = 'index.html#plans';
        return;
    }
    
    selectedPlan = window.db.plans[planId];
    if (!selectedPlan) {
        window.location.href = 'index.html#plans';
        return;
    }
    
    updatePlanSummary();
    window.dbUtils.updatePlanBenefits(planId);
    initializeForm();
    
    // Animar entrada
    document.querySelector('.payment-details').style.opacity = '0';
    document.querySelector('.payment-summary').style.opacity = '0';
    
    setTimeout(() => {
        document.querySelector('.payment-details').style.opacity = '1';
        document.querySelector('.payment-details').style.transform = 'translateY(0)';
    }, 100);
    
    setTimeout(() => {
        document.querySelector('.payment-summary').style.opacity = '1';
        document.querySelector('.payment-summary').style.transform = 'translateX(0)';
    }, 300);
});

// Atualizar resumo do plano
function updatePlanSummary() {
    const planIcon = document.querySelector('.plan-icon');
    const planName = document.querySelector('.plan-name');
    const planPrice = document.querySelector('.plan-price');
    const summarySubtotal = document.querySelector('.summary-subtotal .value');
    const summaryTotal = document.querySelector('.summary-total .value');
    
    planIcon.textContent = selectedPlan.icon;
    planName.textContent = selectedPlan.name;
    planPrice.textContent = `R$ ${selectedPlan.price.toFixed(2)}`;
    summarySubtotal.textContent = `R$ ${selectedPlan.price.toFixed(2)}`;
    summaryTotal.textContent = `R$ ${selectedPlan.price.toFixed(2)}`;
}

// Inicializar formulário
function initializeForm() {
    // Máscara para número do cartão
    cardNumber.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        value = value.replace(/(\d{4})/g, '$1 ').trim();
        e.target.value = value.substring(0, 19);
        
        // Detectar bandeira do cartão
        detectCardType(value.replace(/\s/g, ''));
    });
    
    // Máscara para data de validade
    cardExpiry.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.substring(0, 2) + '/' + value.substring(2, 4);
        }
        e.target.value = value.substring(0, 5);
    });
    
    // Máscara para CVC
    cardCVC.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        e.target.value = value.substring(0, 3);
    });
    
    // Alternar método de pagamento
    paymentMethods.forEach(method => {
        method.addEventListener('click', () => {
            paymentMethods.forEach(m => m.classList.remove('active'));
            method.classList.add('active');
            
            // Atualizar formulário baseado no método
            const methodType = method.querySelector('span').textContent.toLowerCase();
            updatePaymentForm(methodType);
        });
    });
}

// Atualizar formulário baseado no método de pagamento
function updatePaymentForm(methodType) {
    const cardFields = document.querySelectorAll('.card-field');
    const submitBtn = document.querySelector('.payment-btn');
    
    if (methodType.includes('cartão')) {
        cardFields.forEach(field => field.style.display = 'block');
        submitBtn.textContent = 'Finalizar Pagamento';
    } else if (methodType.includes('boleto')) {
        cardFields.forEach(field => field.style.display = 'none');
        submitBtn.textContent = 'Gerar Boleto';
    } else if (methodType.includes('pix')) {
        cardFields.forEach(field => field.style.display = 'none');
        submitBtn.textContent = 'Gerar QR Code';
    }
}

// Detectar bandeira do cartão
function detectCardType(number) {
    const patterns = {
        visa: /^4/,
        mastercard: /^5[1-5]/,
        amex: /^3[47]/,
        elo: /^(636368|438935|504175|451416|636297)/,
        hipercard: /^(606282|3841)/
    };
    
    cardIcons.forEach(icon => {
        icon.classList.remove('active');
        Object.entries(patterns).forEach(([brand, pattern]) => {
            if (pattern.test(number) && icon.dataset.brand === brand) {
                icon.classList.add('active');
            }
        });
    });
}

// Validar cartão
function validateCard() {
    const errors = [];
    
    if (!cardNumber.value.replace(/\s/g, '').match(/^\d{16}$/)) {
        errors.push('Número do cartão inválido');
    }
    
    if (!cardName.value.trim()) {
        errors.push('Nome no cartão é obrigatório');
    }
    
    const [month, year] = cardExpiry.value.split('/');
    const now = new Date();
    const currentYear = now.getFullYear() % 100;
    const currentMonth = now.getMonth() + 1;
    
    if (!month || !year || month > 12 || year < currentYear || 
        (year == currentYear && month < currentMonth)) {
        errors.push('Data de validade inválida');
    }
    
    if (!cardCVC.value.match(/^\d{3}$/)) {
        errors.push('CVC inválido');
    }
    
    return errors;
}

// Processar pagamento
async function processPayment(formData) {
    // Simular processamento
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simular sucesso (em um sistema real, isso seria uma chamada à API de pagamento)
    const success = Math.random() > 0.1; // 90% de chance de sucesso
    
    if (success) {
        // Atualizar plano do usuário
        const userSession = JSON.parse(localStorage.getItem('userSession'));
        const user = window.dbUtils.findUserByEmail(userSession.email);
        
        if (user) {
            window.dbUtils.updateUser(user.id, {
                plan: selectedPlan.id
            });
            
            // Atualizar sessão
            userSession.plan = selectedPlan.id;
            localStorage.setItem('userSession', JSON.stringify(userSession));
        }
        
        return true;
    }
    
    throw new Error('Não foi possível processar o pagamento. Tente novamente.');
}

// Submit do formulário
paymentForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    if (processingPayment) return;
    
    const activeMethod = document.querySelector('.payment-method.active');
    const methodType = activeMethod.querySelector('span').textContent.toLowerCase();
    
    if (methodType.includes('cartão')) {
        const errors = validateCard();
        if (errors.length > 0) {
            showError(errors.join('\n'));
            return;
        }
    }
    
    const submitBtn = paymentForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    try {
        processingPayment = true;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Processando...';
        
        if (methodType.includes('boleto')) {
            showSuccess('Boleto gerado com sucesso! Verifique seu email.');
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 2000);
            return;
        }
        
        if (methodType.includes('pix')) {
            showSuccess('QR Code gerado! Faça o pagamento para liberar seu acesso.');
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 2000);
            return;
        }
        
        const formData = new FormData(paymentForm);
        await processPayment(formData);
        
        showSuccess('Pagamento realizado com sucesso!');
        
        // Redirecionar para dashboard após 2 segundos
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 2000);
    } catch (error) {
        showError(error.message);
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
    } finally {
        processingPayment = false;
    }
});

// Funções de feedback
function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    
    const existingError = document.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    paymentForm.insertBefore(errorDiv, paymentForm.firstChild);
    
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}

function showSuccess(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    
    const existingSuccess = document.querySelector('.success-message');
    if (existingSuccess) {
        existingSuccess.remove();
    }
    
    paymentForm.insertBefore(successDiv, paymentForm.firstChild);
} 