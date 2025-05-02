<template>
    <div class="py-4 container-fluid">
        <h4>Ajuda e Suporte</h4>
        <p>Bem-vindo à nossa seção de ajuda! Aqui você encontrará informações úteis para navegar e utilizar nosso sistema de forma eficaz.</p>
        <div class="mb-4">
            <h5>Como Usar o Sistema</h5>
            <p>Aqui você pode encontrar informações sobre como utilizar o sistema de forma eficaz.</p>
            <ul>
                <li>Passo 1: Faça login no sistema.</li>
                <li>Passo 2: Navegue até a seção desejada.</li>
                <li>Passo 3: Siga as instruções para realizar suas tarefas.</li>
            </ul>
        </div>
        <div class="mb-4">
            <h5>FAQ</h5>
            <p>Respostas para perguntas frequentes:</p>
            <ul>
                <li><strong>Pergunta 1:</strong> Como posso redefinir minha senha?</li>
                <li><strong>Resposta:</strong> Você pode redefinir sua senha na página de login.</li>
                <li><strong>Pergunta 2:</strong> Onde posso encontrar mais informações sobre as funcionalidades?</li>
                <li><strong>Resposta:</strong> Consulte a documentação disponível na seção de ajuda.</li>
            </ul>
        </div>
        <div class="mb-4">
            <h5>Links Úteis</h5>
            <ul>
                <li><a href="/documentacao">Documentação do Sistema</a></li>
                <li><a href="/tutorial">Tutoriais em Vídeo</a></li>
                <li><a href="/comunidade">Fórum da Comunidade</a></li>
            </ul>
        </div>
        <div class="mb-4">
            <h5>Contato para Suporte</h5>
            <p>Se você precisar de mais assistência, entre em contato conosco:</p>
            <p>Email: support@mainge.com</p>
            <p>Telefone: +258 84 42 32 35 4</p>
            <form @submit.prevent="submitForm">
                <div>
                    <label for="name">Nome:</label>
                    <input type="text" id="name" name="name" required placeholder="Digite seu nome">
                </div>
                <div>
                    <label for="message">Mensagem:</label>
                    <textarea id="message" name="message" required placeholder="Digite sua mensagem aqui..." rows="4"></textarea>
                </div>
                <button type="submit">Enviar</button>
                <p v-if="formSubmitted" class="success-message">Mensagem enviada com sucesso!</p>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: "HelpPage",
    data() {
        return {
            formSubmitted: false,
        };
    },
    methods: {
        submitForm() {
            this.formSubmitted = true;
        },
    },
};
</script>

<style scoped>
.container-fluid {
    background-color: #f8f9fa; /* Cor de fundo suave */
    padding: 20px; /* Espaçamento interno */
    border-radius: 8px; /* Bordas arredondadas */
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Sombra para profundidade */
}

h4, h5 {
    color: #343a40; /* Cor do texto dos títulos */
}

.mb-4 {
    margin-bottom: 1.5rem; /* Espaçamento entre seções */
}

form {
    background-color: #ffffff; /* Fundo branco para o formulário */
    padding: 15px; /* Espaçamento interno do formulário */
    border-radius: 5px; /* Bordas arredondadas do formulário */
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1); /* Sombra do formulário */
}

input[type="text"], textarea {
    width: 100%; /* Largura total */
    padding: 10px; /* Espaçamento interno */
    margin-top: 5px; /* Espaçamento acima do campo */
    border: 1px solid #ced4da; /* Borda padrão */
    border-radius: 4px; /* Bordas arredondadas */
    transition: border-color 0.3s; /* Transição suave para a borda */
}

input[type="text"]:focus, textarea:focus {
    border-color: #80bdff; /* Cor da borda ao focar */
    outline: none; /* Remove o contorno padrão */
}

button {
    background-color: #007bff; /* Cor de fundo do botão */
    color: white; /* Cor do texto do botão */
    border: none; /* Remove a borda padrão */
    padding: 10px 15px; /* Espaçamento interno do botão */
    border-radius: 5px; /* Bordas arredondadas do botão */
    cursor: pointer; /* Cursor de ponteiro ao passar o mouse */
    transition: background-color 0.3s; /* Transição suave para a cor de fundo */
}

button:hover {
    background-color: #0056b3; /* Cor do botão ao passar o mouse */
}

.success-message {
    color: #28a745; /* Cor verde para a mensagem de sucesso */
    margin-top: 10px; /* Espaçamento acima da mensagem */
}
</style>
