<template>
    <div>
      <h1>Página Não Encontrada</h1>
      <p>Desculpe, a página que você está procurando não existe.</p>
      <router-link to="/">Voltar para a página inicial</router-link>
    </div>
  </template>
  
  <script>
  export default {
    name: 'NotFound',
    beforeRouteEnter(to, from, next) {
      next({ path: '/' }); // Redireciona para a página inicial
    },
  }
  </script>
  
  <style scoped>
  body {
    font-family: 'Arial', sans-serif;
    background-color: #f4f4f4;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  
  h1 {
    color: #d9534f; /* Cor mais suave */
    font-size: 3em;
    margin-bottom: 20px;
  }
  
  p {
    color: #555; /* Cor do texto */
    font-size: 1.2em;
    margin-bottom: 30px;
  }
  
  .router-link {
    text-decoration: none;
    color: white;
    background-color: #5bc0de; /* Cor de fundo do link */
    padding: 10px 20px;
    border-radius: 5px;
    transition: background-color 0.3s;
  }
  
  .router-link:hover {
    background-color: #31b0d5; /* Cor ao passar o mouse */
  }
  </style>
  