<template>
  
  <div class="pt-5 m-3 page-header align-items-start min-vh-50 pb-11 border-radius-lg">
    
    <div class="container">
      <div class="row justify-content-center">
        <div class="mx-auto text-center col-lg-5">
          <h1 class="mt-5 mb-2 text-black">Bem-vindo!</h1>
          <p class="text-black text-lead">
            Utilize este formulário para recuperar sua senha e acessar a sua conta.
          </p>
        </div>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="row mt-lg-n10 mt-md-n11 mt-n10 justify-content-center">
      <div class="mx-auto col-xl-4 col-lg-5 col-md-7">
        <div class="card z-index-0">
          <div class="pt-4 text-center card-header">
            <h5>Esqueci a Senha</h5>
          </div>
          
          <div class="card-body">
            <form @submit.prevent="submitForm" role="form">
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input 
                  id="email"
                  v-model="email" 
                  type="email" 
                  placeholder="Email" 
                  aria-label="Email" 
                  :class="['form-control', { 'is-invalid': emailError }]"
                  @blur="validateEmail"
                />
                <div v-if="emailError" class="alert alert-danger mt-2" role="alert">
                  <strong>Erro:</strong> {{ emailError }}. Por favor, verifique e tente novamente.
                </div>
              </div>
              <div v-if="successMessage" class="alert alert-success mt-2" role="alert">
                <strong>Sucesso!</strong> {{ successMessage }} Você pode agora verificar seu email para o link de redefinição.
              </div>
              <div v-if="loading" class="spinner-border" role="status"></div>
              <div class="text-center">
                <vsud-button color="dark" full-width variant="gradient" class="my-4 mb-2" :loading="loading">Enviar Link de Redefinição</vsud-button>
              </div>
              <router-link to="/login">
                <p class="text-sm mt-3 mb-0">
                  Lembrou sua senha?
                  <a href="javascript:;" class="text-dark font-weight-bolder">Faça login</a>
                </p>
              </router-link>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- <app-footer /> -->
</template>

<script>
import Navbar from "@/examples/PageLayout/Navbar.vue";
import AppFooter from "@/examples/PageLayout/Footer.vue";
import VsudInput from "@/components/VsudInput.vue";
import VsudCheckbox from "@/components/VsudCheckbox.vue";
import VsudButton from "@/components/VsudButton.vue";
import bgImg from "@/assets/img/curved-images/curved6.jpg"
export default {
  name: "SignUp",
  components: {
    Navbar,
    AppFooter,
    VsudInput,
    VsudCheckbox,
    VsudButton,
  },
  data() {
    return {
      bgImg,
      email: '',
      emailError: '',
      loading: false,
      successMessage: ''
    }
  },
  methods: {
    validateEmail() {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const trimmedEmail = this.email.trim();
      console.log('Email inserido:', trimmedEmail);
      console.log('Resultado da validação:', emailPattern.test(trimmedEmail));
      this.emailError = emailPattern.test(trimmedEmail) ? '' : 'Por favor, insira um email válido.';
    },
    async submitForm() {
      this.validateEmail();
      if (!this.emailError) {
        this.loading = true; // Inicia o carregamento
        try {
          await this.$store.dispatch('sendResetLink', this.email);
          this.successMessage = 'Link de redefinição enviado!';
        } catch (error) {
          console.error(error);
          alert('Ocorreu um erro ao enviar o link. Tente novamente mais tarde.');
        } finally {
          this.loading = false; // Para o carregamento
        }
      } else {
        console.log('Erro de validação:', this.emailError);
      }
    }
  },
  created() {
    this.$store.state.hideConfigButton = true;
    this.$store.state.showNavbar = false;
    this.$store.state.showSidenav = false;
    this.$store.state.showFooter = false;
  },
  beforeUnmount() {
    this.$store.state.hideConfigButton = false;
    this.$store.state.showNavbar = true;
    this.$store.state.showSidenav = true;
    this.$store.state.showFooter = true;
  },
};
</script>

<style>
/* Estilo para mensagens de erro */
.alert-danger {
  background-color: #f8d7da; /* Cor de fundo suave */
  color: #721c24; /* Cor do texto */
  border: 1px solid #f5c6cb; /* Borda vermelha */
  padding: 10px; /* Espaçamento interno */
  border-radius: 5px; /* Bordas arredondadas */
}

/* Estilo para mensagens de sucesso */
.alert-success {
  background-color: #d4edda; /* Cor de fundo suave */
  color: #155724; /* Cor do texto */
  border: 1px solid #c3e6cb; /* Borda verde */
  padding: 10px; /* Espaçamento interno */
  border-radius: 5px; /* Bordas arredondadas */
}
</style>
