<template>
    <div class="py-4 container-fluid">
      <div class="row g-2 align-items-center d-flex">
        <h4>Adicionar Despesa</h4>
  
        <div class="col-3 mb-3 d-flex align-items-center">
          <input type="text" v-model="newExpense.name" class="form-control form-control-md"
            placeholder="Nome da Despesa" required />
        </div>
        <div class="col-3 mb-3 d-flex align-items-center">
          <input type="number" v-model="newExpense.amount" class="form-control form-control-md"
            placeholder="Valor da Despesa" required />
        </div>
        <div class="col-12 mb-3">
          <textarea v-model="newExpense.description" class="form-control form-control-md" placeholder="Descrição"
            rows="3"></textarea>
        </div>
        <div class="col-3 mb-3 d-flex align-items-center">
          <input type="date" v-model="newExpense.date" class="form-control form-control-md"
            placeholder="Data da Despesa" required />
        </div>
        <div class="col-3 mb-3 d-flex align-items-center">
          <input type="file" @change="onFileChange" class="form-control form-control-md" />
        </div>
      </div>
      <div class="col-auto d-flex">
        <button class="btn btn-primary btn-md me-2" @click="addExpense">Adicionar</button>
        <button class="btn btn-secondary btn-md me-2" @click="goBack">Cancelar</button>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: "AddExpense",
    data() {
      return {
        newExpense: {
          name: '',
          amount: '',
          description: '',
          date: '',
          receipt: null,
        },
      };
    },
    methods: {
      onFileChange(event) {
        this.newExpense.receipt = event.target.files[0];
      },
      addExpense() {
        // Lógica para adicionar a despesa
        console.log('Despesa adicionada:', this.newExpense);
        // Aqui você pode adicionar a chamada à API para salvar a despesa
        // axios.post('/api/expenses', this.newExpense)
        //     .then(response => {
        //         // Lógica após sucesso
        //         this.clearForm(); // Limpa o formulário após adicionar
        //     })
        //     .catch(error => {
        //         console.error('Erro ao adicionar a despesa:', error);
        //     });
      },
  
      clearForm() {
        this.newExpense = { // Redefine o formulário para os valores iniciais
          name: '',
          amount: '',
          description: '',
          date: '',
          receipt: null,
        };
      },
  
      goBack() {
        // Lógica para voltar à página anterior
        this.$router.go(-1); // Exemplo de como voltar
      },
    },
  };
  </script>