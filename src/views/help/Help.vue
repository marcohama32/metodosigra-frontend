<template>
  <div>
    <h1>Ajuda e Suporte</h1>
    <h2>FAQs</h2>
    <ul>
      <li>Como posso adicionar um novo cliente?</li>
      <li>Como gerar uma fatura?</li>
      <!-- Adicione mais perguntas frequentes -->
    </ul>
    <h2>Contato</h2>
    <form @submit.prevent="submitForm">
      <input type="text" v-model="name" placeholder="Seu Nome" required />
      <input type="email" v-model="email" placeholder="Seu Email" required />
      <textarea v-model="message" placeholder="Sua Mensagem" required></textarea>
      <button type="submit">Enviar</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      email: '',
      message: ''
    };
  },
  methods: {
    submitForm() {
      // Lógica para enviar a mensagem
      console.log('Mensagem enviada:', this.name, this.email, this.message);
      // Limpar o formulário
      this.name = '';
      this.email = '';
      this.message = '';
    }
  }
}
</script>

<style>
form {
  margin-top: 20px;
}
input, textarea {
  width: 100%;
  margin-bottom: 10px;
  padding: 10px;
}
button {
  padding: 10px 20px;
}
</style> 