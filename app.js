document.addEventListener('DOMContentLoaded', () => {
    const orderForm = document.getElementById('orderForm');

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

    orderForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Change button text to indicate loading
        const submitBtn = orderForm.querySelector('.submit-btn');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = 'Enviando... <i class="fa-solid fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;

        // Retrieve form values
        const nome = document.getElementById('nome').value;
        const produto = document.getElementById('produto').value;
        const quantidade = document.getElementById('quantidade').value;
        const whatsapp = document.getElementById('whatsapp').value;
        const endereco = document.getElementById('endereco').value;

        // Google Forms POST URL (formResponse em vez de viewform)
        const baseUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSe7GXsaweggBE3Zi23youI1hy2IhWnJU8O-prDOas12w9z5Nw/formResponse';
        
        // Construct parameters
        const params = new URLSearchParams();
        params.append('entry.2031570011', nome);
        params.append('entry.626025703', produto);
        params.append('entry.764942230', quantidade);
        params.append('entry.732569786', whatsapp);
        params.append('entry.2061784476', endereco);

        // Submit via fetch silently
        fetch(baseUrl, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: params.toString()
        }).then(() => {
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
        }).catch(err => {
            // Revert button if there's an actual error (rare with no-cors unless network drops)
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
            alert('Houve um erro de conexão ao enviar o pedido. Por favor, tente novamente.');
        });
    });
});
