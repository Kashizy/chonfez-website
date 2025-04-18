// Gerenciar cliques nos botões de inscrição
document.addEventListener('DOMContentLoaded', () => {
    const subscribeButtons = document.querySelectorAll('.plan-card .btn');
    
    subscribeButtons.forEach(button => {
        button.addEventListener('click', handleSubscription);
    });
});

// Manipular clique no botão de inscrição
function handleSubscription(e) {
    e.preventDefault();
    
    // Verificar se o usuário está logado
    const userSession = JSON.parse(localStorage.getItem('userSession'));
    
    if (!userSession) {
        // Se não estiver logado, redirecionar para login com retorno
        const planId = e.target.getAttribute('data-plan');
        localStorage.setItem('selectedPlan', planId);
        window.location.href = `auth.html?redirect=payment&plan=${planId}`;
        return;
    }
    
    // Se já estiver logado, verificar plano atual
    if (userSession.plan) {
        const currentPlan = window.db.plans[userSession.plan];
        const selectedPlan = e.target.getAttribute('data-plan');
        const newPlan = window.db.plans[selectedPlan];
        
        if (currentPlan.price > newPlan.price) {
            showModal('Downgrade de Plano', 
                'Você está tentando mudar para um plano inferior. Entre em contato com o suporte para mais informações.');
            return;
        }
    }
    
    // Redirecionar para página de pagamento
    const planId = e.target.getAttribute('data-plan');
    window.location.href = `payment.html?plan=${planId}`;
}

// Modal de feedback
function showModal(title, message) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h3>${title}</h3>
            <p>${message}</p>
            <button class="btn btn-primary">Fechar</button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    const closeBtn = modal.querySelector('button');
    closeBtn.addEventListener('click', () => {
        modal.remove();
    });
    
    // Fechar no clique fora
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
    
    // Animar entrada
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
} 