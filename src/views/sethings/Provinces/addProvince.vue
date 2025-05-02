<template>
  <div class="py-4 container-fluid">
    <div class="row g-2 align-items-center d-flex">
      <h4>Adicionar Província</h4>

      <div class="col-3 mb-3 d-flex align-items-center">
        <input type="text" v-model="newProvince.name" class="form-control form-control-md"
          placeholder="Nome da Província" required />
      </div>
      <div class="col-3 mb-3 d-flex align-items-center">
        <input type="number" v-model="newProvince.code" class="form-control form-control-md"
          placeholder="Código da Província" required />
      </div>
      <div class="col-12 mb-3">
        <textarea v-model="newProvince.description" class="form-control form-control-md" placeholder="Descrição"
          rows="3"></textarea>
      </div>
      <div class="col-3 mb-3 d-flex align-items-center">
        <input type="number" v-model="newProvince.population" class="form-control form-control-md"
          placeholder="População" required />
      </div>
      <div class="col-3 mb-3 d-flex align-items-center">
        <input type="number" v-model="newProvince.area" class="form-control form-control-md"
          placeholder="Área (km²)" required />
      </div>
      <div class="col-3 mb-3 d-flex align-items-center">
        <input type="text" v-model="newProvince.capital" class="form-control form-control-md"
          placeholder="Capital" required />
      </div>
      <div class="col-3 mb-3 d-flex align-items-center">
        <input type="date" v-model="newProvince.founded" class="form-control form-control-md"
          placeholder="Data de Fundação" required />
      </div>
      <div class="col-3 mb-3 d-flex align-items-center">
        <input type="file" @change="onFileChange" class="form-control form-control-md" />
      </div>
    </div>
    <div class="col-auto d-flex">
      <button class="btn btn-primary btn-md me-2" @click="addProvince">Atualizar</button>
      <button class="btn btn-secondary btn-md me-2" @click="goBack">Cancelar</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "AddProvince",
  data() {
    return {
      newProvince: {
        name: '',
        code: '',
        description: '',
        population: '',
        area: '',
        capital: '',
        founded: '',
        image: null,
      },
    };
  },
  methods: {
    onFileChange(event) {
      this.newProvince.image = event.target.files[0];
    },
    addProvince() {
      // Lógica para adicionar a província
      console.log('Província adicionada:', this.newProvince);
      // Aqui você pode adicionar a chamada à API para salvar a província
      // axios.post('/api/provinces', this.newProvince)
      //     .then(response => {
      //         // Lógica após sucesso
      //         this.clearForm(); // Limpa o formulário após adicionar
      //     })
      //     .catch(error => {
      //         console.error('Erro ao adicionar a província:', error);
      //     });
    },

    clearForm() {
      this.newProvince = { // Redefine o formulário para os valores iniciais
        name: '',
        code: '',
        description: '',
        population: '',
        area: '',
        capital: '',
        founded: '',
        image: null,
      };
    },

    goBack() {
      // Lógica para voltar à página anterior
      this.$router.go(-1); // Exemplo de como voltar
    },
  },
};
</script>