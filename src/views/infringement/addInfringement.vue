<template>
    <div class="py-4 container-fluid">
      <div class="row g-2 align-items-center d-flex">
        <h4>Adicionar Infração</h4>
  
        <div class="col-4 mb-3 d-flex align-items-center">
          <input type="text" v-model="newInfraction.name" class="form-control form-control-md"
            placeholder="Nome da Infração" required />
        </div>
        <div class="col-4 mb-3 d-flex align-items-center">
          <input type="number" v-model="newInfraction.value" class="form-control form-control-md"
            placeholder="Valor" required />
        </div>
      </div>
      <div class="row g-2 align-items-center d-flex">
        <div class="col-8 mb-3 d-flex align-items-center">
          <textarea type="text" v-model="newInfraction.description" class="form-control form-control-md"
            placeholder="Descrição" rows="3" required />
        </div>
      </div>
      <div class="col-auto d-flex">
        <button class="btn btn-success btn-md me-2" @click="addInfraction">Cadastrar</button>
        <button class="btn btn-secondary btn-md me-2" @click="goBack">Cancelar</button>
        <button class="btn btn-light btn-md" @click="clearForm">Limpar</button>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: "AddInfraction",
    data() {
      return {
        newInfraction: {
          name: '',
          description: '',
          value: '',
        },
      };
    },
    methods: {
      addInfraction() {
        // Lógica para adicionar a infração
        console.log('Infração adicionada:', this.newInfraction);
        // Aqui você pode adicionar a chamada à API para salvar a infração
        // axios.post('/api/fines', this.newInfraction)
        //     .then(response => {
        //         // Lógica após sucesso
        //         this.clearForm(); // Limpa o formulário após adicionar
        //     })
        //     .catch(error => {
        //         console.error('Erro ao adicionar a infração:', error);
        //     });
      },
  
      clearForm() {
        this.newInfraction = { // Redefine o formulário para os valores iniciais
          name: '',
          description: '',
          value: '',
        };
      },
  
      goBack() {
        // Lógica para voltar à página anterior
        this.$router.go(-1); // Exemplo de como voltar
      },
    },
  };
  </script>