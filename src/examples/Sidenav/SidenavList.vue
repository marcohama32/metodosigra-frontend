<template>
  <div id="sidenav-collapse-main" class="w-auto h-auto collapse navbar-collapse max-height-vh-100 h-100">
    <ul class="navbar-nav">
      <router-link to="/" class="nav-item">
        <sidenav-collapse nav-text="Dashboard" :to="{ name: 'Dashboard' }">
          <template #icon>
            <icon name="dashboard" />
          </template>
        </sidenav-collapse>
      </router-link>

      <!-- <li class="mt-3 nav-item">
        <h6 class="text-xs ps-4 text-uppercase font-weight-bolder opacity-6"
          :class="$store.state.isRTL ? 'me-4' : 'ms-2'">
          CLIENTES</h6>
      </li> -->

      <router-link to="/esg-advisory" class="nav-item">
        <sidenav-collapse nav-text="ESG Advisory" :to="{ name: 'EsgAdvisory' }">
          <template #icon>
            <icon name="sign-up" />
          </template>
        </sidenav-collapse>
      </router-link>

      <router-link to="/cyber-risks" class="nav-item">
        <sidenav-collapse nav-text="Cyber Risk" :to="{ name: 'CyberRisks' }">
          <template #icon>
            <icon name="sign-up" />
          </template>
        </sidenav-collapse>
      </router-link>

      <router-link to="/sustainability" class="nav-item">
        <sidenav-collapse nav-text="Sustainability" :to="{ name: 'Sustainability' }">
          <template #icon>
            <icon name="sign-up" />
          </template>
        </sidenav-collapse>
      </router-link>

      <router-link to="/monitoria-e-avaliacao" class="nav-item">
        <sidenav-collapse nav-text="Monitoria e Avaliação" :to="{ name: 'MonitoriaEAvaliacao' }">
          <template #icon>
            <icon name="sign-up" />
          </template>
        </sidenav-collapse>
      </router-link>

      <router-link to="/commercial" class="nav-item">
        <sidenav-collapse nav-text="Comercial" :to="{ name: 'Commercial' }">
          <template #icon>
            <icon name="sign-up" />
          </template>
        </sidenav-collapse>
      </router-link>

      <router-link to="/digital-transformation" class="nav-item">
        <sidenav-collapse nav-text="Digital Transformation" :to="{ name: 'DigitalTransformation' }">
          <template #icon>
            <icon name="sign-up" />
          </template>
        </sidenav-collapse>
      </router-link>

      <router-link to="/eficience-operations" class="nav-item">
        <sidenav-collapse nav-text="Eficience Operations" :to="{ name: 'EficienceOperations' }">
          <template #icon>
            <icon name="sign-up" />
          </template>
        </sidenav-collapse>
      </router-link>

      <router-link to="/usuarios" class="nav-item">
        <sidenav-collapse nav-text="Usuários" :to="{ name: 'Usuários' }">
          <template #icon>
            <icon name="sign-up" />
          </template>
        </sidenav-collapse>
      </router-link>

      

      <!-- <router-link to="/reports" class="nav-item">
        <sidenav-collapse nav-text="Relatórios" :to="{ name: 'Relatórios' }">
          <template #icon>
            <icon name="sign-up" />
          </template>
        </sidenav-collapse>
      </router-link> -->

      <!-- <li class="mt-3 nav-item">
        <h6 class="text-xs ps-4 text-uppercase font-weight-bolder opacity-6"
          :class="$store.state.isRTL ? 'me-4' : 'ms-2'">
          CONFIGURAÇÕES</h6>
      </li>

      <router-link to="/config" class="nav-item">
        <sidenav-collapse nav-text="Config" :to="{ name: 'Config' }">
          <template #icon>
            <icon name="settings" />
          </template>
        </sidenav-collapse>
      </router-link> -->



      <!-- <router-link to="/profile" class="nav-item">
        <sidenav-collapse nav-text="Perfil" :to="{ name: 'Profile' }">
          <template #icon>
            <icon name="user" />
          </template>
        </sidenav-collapse>
      </router-link>

      <router-link to="/sign-in" class="nav-item">
        <sidenav-collapse nav-text="Entrar" :to="{ name: 'Sign In' }">
          <template #icon>
            <icon name="sign-in" />
          </template>
        </sidenav-collapse>
      </router-link> -->
    </ul>
  </div>
  <div class="pt-3 mx-3 mt-3 sidenav-footer">
    <router-link to="/help" class="btn bg-gradient-success mt-4 w-100" type="button">Assistência</router-link>
  </div>
</template>

<script>
import Icon from "@/components/Icon.vue";
import SidenavCollapse from "./SidenavCollapse.vue";
import SidenavCard from "./SidenavCard.vue";

export default {
  name: "SidenavList",
  components: {
    Icon,
    SidenavCollapse,
    SidenavCard,
  },
  props: {
    cardBg: {
      type: String,
      default: ""
    },
  },
  data() {
    return {
      title: "Water Billing System",
      controls: "dashboardsExamples",
      isActive: "active",
    };
  },
  methods: {
    getRoute() {
      const routeArr = this.$route.path.split("/");
      return routeArr[1];
    },
  }
};
</script>
