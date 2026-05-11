document.addEventListener('DOMContentLoaded', () => {
    const orderForm = document.getElementById('orderForm');
    const hiddenIframe = document.getElementById('hidden_iframe');

    // Phone number mask
    const whatsappInput = document.getElementById('whatsapp');
    whatsappInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, ''); // Remove non-digits
        
        if (value.length > 11) {
            value = value.substring(0, 11);
        }

        if (value.length > 2) {
            value = `(${value.substring(0, 2)}) ${value.substring(2)}`;
        }
        if (value.length > 10) {
            value = `${value.substring(0, 10)}-${value.substring(10)}`;
        }

        e.target.value = value;
    });

    let submitted = false;

    orderForm.addEventListener('submit', (e) => {
        // Change button text to indicate loading
        const submitBtn = orderForm.querySelector('.submit-btn');
        submitBtn.innerHTML = 'Enviando... <i class="fa-solid fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;
        submitted = true;
    });

    hiddenIframe.addEventListener('load', () => {
        if (submitted) {
            // Hide the form
            orderForm.style.display = 'none';
            
            // Show the success message requested
            const successMsg = document.createElement('div');
            successMsg.className = 'success-message';
            successMsg.innerHTML = `
                <i class="fa-solid fa-circle-check" style="font-size: 3.5rem; color: var(--primary-color); margin-bottom: 1.5rem;"></i>
                <h3 style="font-size: 1.8rem; color: var(--primary-color); margin-bottom: 1rem;">Pedido recebido com sucesso!</h3>
                <p style="font-size: 1.1rem; color: #FFFFFF;">Obrigada por nos escolher! Em breve entraremos em contato com você via whatsapp.</p>
            `;
            
            // Insert success message where the form was
            orderForm.parentNode.appendChild(successMsg);
        }
    });
});
