<template>
  <!-- Navbar -->
  <nav class="top-0 navbar navbar-expand-lg position-absolute z-index-3"
    :class="isBlur ? isBlur : 'shadow-none my-2 navbar-transparent w-100'">
    <div class="container">
      <router-link class="navbar-brand font-weight-bolder ms-lg-0 ms-3" to="/dashboard" v-bind="$attrs"
        :class="isBlur ? 'text-dark' : 'text-white'">WaterFlow</router-link>
      <button class="navbar-toggler shadow-none ms-2" type="button" data-bs-toggle="collapse"
        data-bs-target="#navigation" aria-controls="navigation" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon mt-2">
          <span class="navbar-toggler-bar bar1"></span>
          <span class="navbar-toggler-bar bar2"></span>
          <span class="navbar-toggler-bar bar3"></span>
        </span>
      </button>
      <!-- colocarei logo do waterflow  -->
      <a href="#" class="btn btn-sm btn-round mb-0 me-1"
        :class="isBlur ? 'bg-gradient-dark' : 'bg-gradient-success'">Waterflow</a>

    </div>
  </nav>
  <!-- End Navbar -->
</template>

<script>
import downArrWhite from "@/assets/img/down-arrow-white.svg";
import downArrBlack from "@/assets/img/down-arrow-dark.svg";

export default {
  name: "NavbarComponent",
  props: {
    btnBackground: {
      type: String,
      default: ""
    },
    isBlur: {
      type: String,
      default: ""
    },
    darkMode: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      downArrWhite,
      downArrBlack,
    };
  },
  computed: {
    darkModes() {
      return {
        "text-dark": this.darkMode,
      };
    },
  },
};
</script>
