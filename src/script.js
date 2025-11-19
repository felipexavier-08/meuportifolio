document.getElementById('formulario-de-contato').addEventListener('submit', function(event) {

    event.preventDefault();
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const assunto = "contato a partir do portifolio";
    const mensagem = document.getElementById('mensagem').value;

    const meuEmail = "felipexreisjj@gmail.com";
    
    const conteudo = 
        `Nome: ${nome} \n` +
        `E-mail de Contato: ${email}\n` + 
        `Mensagem:${mensagem}`;

    const mailtoLink = 
        `mailto:${meuEmail}` + 
        `?subject=${encodeURIComponent(assunto)}` +
        `&body=${encodeURIComponent(conteudo)}`;
        
    window.location.href = mailtoLink;

    document.getElementById('form-status').textContent = 'Seu e-mail deve ter sido aberto. Por favor, envie a mensagem por lá.';
    this.reset();
});