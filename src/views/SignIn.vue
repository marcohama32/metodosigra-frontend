<template>

  <main class="mt-0 main-content main-content-bg">
    <section>
      <div class="page-header min-vh-75">
        <div class="container">
          <div class="row">
            <div class="mx-auto col-xl-4 col-lg-5 col-md-6 d-flex flex-column">
              <div class="mt-8 card card-plain">
                <div class="pb-0 card-header text-start">
                  <h3 class="font-weight-bolder text-info text-gradient">Bem vindo</h3>
                  <p class="mb-0">Digite seu usuário e senha para entrar</p>
                </div>
                <div class="card-body">
                  <form role="form" class="text-start" @submit.prevent="handleLogin">
                    <label>Nome de usuário</label>
                    <input type="text" class="form-control" placeholder="Usuário" v-model="username" @input="logUsername" />
                    <span v-if="errors.username" class="text-danger d-flex align-items-center" style="font-size: 0.9rem;">
                      <i class="fas fa-exclamation-circle me-1"></i>
                      {{ errors.username }}
                    </span>
                    <label>Senha</label>
                    <input type="password" class="form-control" placeholder="Senha" v-model="password" @input="logPassword" />
                    <span v-if="errors.password" class="text-danger d-flex align-items-center" style="font-size: 0.9rem;">
                      <i class="fas fa-exclamation-circle me-1"></i>
                      {{ errors.password }}
                    </span>
                    <vsud-switch id="rememberMe" v-model="rememberMe" @change="toggleRememberMe">Lembrar-me</vsud-switch>
                    <div class="text-center">
                      <vsud-button 
                        type="submit" 
                        class="my-4 mb-2" 
                        variant="gradient" 
                        color="info" 
                        full-width
                        :disabled="isLoading"
                      >
                        {{ isLoading ? 'Entrando...' : 'Entrar' }}
                      </vsud-button>
                    </div>
                  </form>
                </div>
                <div class="px-1 pt-0 text-center card-footer px-lg-2">
                  <p class="mx-auto mb-4 text-sm">
                    Esqueceu sua senha?
                    <router-link to="/forgot-password" class="text-info text-gradient font-weight-bold">Recuperar senha</router-link>
                  </p>
                </div>
              </div>
            </div>
            <!-- <div class="col-md-6">
              <div class="top-0 oblique position-absolute h-100 d-md-block d-none me-n8">
                <div
                  class="bg-cover oblique-image position-absolute fixed-top ms-auto h-100 z-index-0 ms-n6"
                  :style="{
                    backgroundImage:
                      `url(${bgImg})`,
                  }"
                ></div>
              </div>
            </div> -->
          </div>
        </div>
      </div>
    </section>
  </main>
  <!-- <app-footer /> -->
  <notifications position="top right" />
</template>

<script>
import Navbar from "@/examples/PageLayout/Navbar.vue";
import AppFooter from "@/examples/PageLayout/Footer.vue";
import VsudInput from "@/components/VsudInput.vue";
import VsudSwitch from "@/components/VsudSwitch.vue";
import VsudButton from "@/components/VsudButton.vue";
import bgImg from "@/assets/img/curved-images/curved9.jpg"
import AuthService from '@/services/auth.service';
import { useRouter } from 'vue-router';
import { notify } from "@kyvg/vue3-notification";
const body = document.getElementsByTagName("body")[0];

export default {
  name: "SigninPage",
  components: {
    Navbar,
    AppFooter,
    VsudInput,
    VsudSwitch,
    VsudButton,
  },
  setup() {
    const router = useRouter();
    return { router };
  },
  data() {
    return {
      bgImg,
      username: '',
      password: '',
      rememberMe: false,
      errors: {},
      isLoading: false
    }
  },
  beforeMount() {
    this.$store.state.hideConfigButton = true;
    this.$store.state.showNavbar = false;
    this.$store.state.showSidenav = false;
    this.$store.state.showFooter = false;
    body.classList.remove("bg-gray-100");
  },
  beforeUnmount() {
    this.$store.state.hideConfigButton = false;
    this.$store.state.showNavbar = true;
    this.$store.state.showSidenav = true;
    this.$store.state.showFooter = true;
    body.classList.add("bg-gray-100");
  },
  mounted() {
    this.checkRememberMe();
  },
  methods: {
    validateForm() {
      this.errors = {};
      // console.log("Username:", this.username);
      // console.log("Password:", this.password);
      if (!this.username) {
        this.errors.username = "O nome de usuário é obrigatório.";
      }
      if (!this.password) {
        this.errors.password = "A senha é obrigatória.";
      }
      return Object.keys(this.errors).length === 0;
    },
    async handleLogin() {
      this.isLoading = true;
      try {
        if (!this.validateForm()) {
          this.isLoading = false;
          return;
        }

        const credentials = {
          email: this.username,
          password: this.password
        };

        console.log('SignIn - enviando credenciais:', credentials);

        const response = await AuthService.login(credentials);
        console.log('SignIn - resposta do login:', response);

        notify({
          title: "Sucesso!",
          text: "Login realizado com sucesso",
          type: "success"
        });

        // Aguarde um momento para a notificação ser exibida
        setTimeout(() => {
          this.router.push('/dashboard');
        }, 1000);
      } catch (error) {
        console.error('SignIn - erro no login:', error);
        notify({
          title: "Erro",
          text: error.message || "Erro ao fazer login",
          type: "error"
        });
      } finally {
        this.isLoading = false;
      }
    },
    toggleRememberMe() {
      if (this.rememberMe) {
        localStorage.setItem('username', this.username);
      } else {
        localStorage.removeItem('username');
      }
    },
    checkRememberMe() {
      const savedUsername = localStorage.getItem('username');
      if (savedUsername) {
        this.username = savedUsername;
        this.rememberMe = true;
      }
    },
    logUsername() {
      console.log("Current Username:", this.username);
    },
    logPassword() {
      console.log("Current Password:", this.password);
    },
  },
};
</script>
