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

        // Retrieve form values
        const nome = document.getElementById('nome').value;
        const produto = document.getElementById('produto').value;
        const quantidade = document.getElementById('quantidade').value;
        const whatsapp = document.getElementById('whatsapp').value;
        const endereco = document.getElementById('endereco').value;

        // Base Google Forms URL
        const baseUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSe7GXsaweggBE3Zi23youI1hy2IhWnJU8O-prDOas12w9z5Nw/viewform';
        
        // Construct parameters
        const params = new URLSearchParams();
        params.append('usp', 'pp_url');
        params.append('entry.2031570011', nome);
        params.append('entry.626025703', produto);
        params.append('entry.764942230', quantidade);
        params.append('entry.732569786', whatsapp);
        params.append('entry.2061784476', endereco);

        // Final URL
        const finalUrl = `${baseUrl}?${params.toString()}`;

        // Redirect user
        window.location.href = finalUrl;
    });
});
