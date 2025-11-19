// server.js
const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const port = 3000;

// Middleware essencial: permite que o Express leia dados JSON (o que o frontend enviará)
app.use(express.json());

// --- Configuração do CORS (Crucial para permitir o frontend acessar) ---
app.use((req, res, next) => {
    // Substitua '*' pelo domínio do seu portfólio (ex: 'https://seuportfolio.com')
    res.header('Access-Control-Allow-Origin', '*'); 
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// --- Configuração do Nodemailer (O Serviço de E-mail) ---
// Use suas credenciais reais aqui. Recomenda-se usar variáveis de ambiente!
const transporter = nodemailer.createTransport({
    service: 'gmail', // Ou 'outlook', 'yahoo', ou use SMTP personalizado
    auth: {
        user: 'SEU_EMAIL_DE_ENVIO@gmail.com', // O e-mail que enviará a mensagem
        pass: 'SUA_SENHA_OU_APP_PASSWORD' // Senha ou senha de app do Gmail
    }
});

// --- Endpoint para Receber os Dados do Formulário ---
app.post('/send', (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ msg: 'Por favor, preencha todos os campos.' });
    }

    const mailOptions = {
        from: `"${name}" <${email}>`, // Remetente: o nome e e-mail da pessoa
        to: 'SEU_EMAIL_PESSOAL@dominio.com', // Destinatário: Onde você quer receber a mensagem
        subject: `Nova Mensagem do Portfólio de: ${name}`,
        html: `
            <h3>Detalhes da Mensagem:</h3>
            <p><strong>Nome:</strong> ${name}</p>
            <p><strong>E-mail:</strong> ${email}</p>
            <p><strong>Mensagem:</strong></p>
            <p>${message}</p>
        `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Erro ao enviar e-mail:', error);
            return res.status(500).json({ msg: 'Erro interno ao enviar a mensagem.' });
        }
        console.log('E-mail enviado:', info.response);
        res.status(200).json({ msg: 'Mensagem enviada com sucesso!' });
    });
});

// Inicia o Servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});