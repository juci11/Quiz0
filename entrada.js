document.addEventListener('DOMContentLoaded', (event) => {
    // Verifica o estado das fases no localStorage e atualiza as variáveis
    let fase1Completa = localStorage.getItem('fase1Completa') === 'true';
    let fase2Completa = localStorage.getItem('fase2Completa') === 'true';
    let fase3Completa = localStorage.getItem('fase3Completa') === 'true';

    let fase2Desbloqueada = fase1Completa;
    let fase3Desbloqueada = fase1Completa && fase2Completa;

    // Atualiza a aparência dos cartões com base no estado das fases
    if (fase1Completa) {
        document.querySelector('.card[data-phase="Fase 1"]').classList.add('complete');
    }
    if (fase2Desbloqueada) {
        document.querySelector('.card[data-phase="Fase 2"]').classList.remove('locked');
    }
    if (fase2Completa) {
        document.querySelector('.card[data-phase="Fase 2"]').classList.add('complete');
    }
    if (fase3Desbloqueada) {
        document.querySelector('.card[data-phase="Fase 3"]').classList.remove('locked');
    }
    if (fase3Completa) {
        document.querySelector('.card[data-phase="Fase 3"]').classList.add('complete');
    }
});

function flipCard(card, phaseName) {
    // Verifica qual fase está sendo acessada e aplica a lógica de desbloqueio
    if (phaseName === 'Fase 1') {
        card.classList.add('flip');
        setTimeout(() => {
            // Redireciona para a página da Fase 1
            window.location.href = 'sobre1.html';
        }, 500); // Espera 0.5 segundos antes de redirecionar
    } else if (phaseName === 'Fase 2') {
        if (!fase1Completa) {
            alert('Complete a Fase 1 primeiro!');
            return;
        }
        card.classList.add('flip');
        setTimeout(() => {
            // Redireciona para a página da Fase 2
            window.location.href = 'sobre2.html';
        }, 500); // Espera 0.5 segundos antes de redirecionar
    } else if (phaseName === 'Fase 3') {
        if (!fase1Completa || !fase2Completa) {
            alert('Complete a Fase 1 e a Fase 2 primeiro!');
            return;
        }
        card.classList.add('flip');
        setTimeout(() => {
            // Redireciona para a página da Fase 3
            window.location.href = 'sobre3.html';
        }, 500); // Espera 0.5 segundos antes de redirecionar
    }
}