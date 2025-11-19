// Seu arquivo JS no Portfólio (Frontend)

document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('menssagem').value;

    // Endereço do seu endpoint de backend. Se estiver testando localmente, é 'http://localhost:3000/send'
    // Quando você hospedar, mude para o endereço real do seu servidor!
    const backendURL = 'http://localhost:3000/send'; 

    fetch(backendURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, message }) // Envia os dados como JSON
    })
    .then(response => response.json())
    .then(data => {
        if (data.msg.includes('sucesso')) {
            statusDisplay.style.color = 'green';
            document.getElementById('contact-form').reset();
        } else {
            statusDisplay.style.color = 'red';
        }
        statusDisplay.textContent = data.msg;
    })
    .catch(error => {
        console.error('Erro de rede:', error);
        statusDisplay.style.color = 'red';
        statusDisplay.textContent = 'Erro de conexão. Tente novamente mais tarde.';
    });
});