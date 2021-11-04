<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="https://bulma.io">
        <img
          src="https://bulma.io/images/bulma-logo.png"
          alt="Bulma: Free, open source, and modern CSS framework based on Flexbox"
          width="112"
          height="28"
        />
      </a>

      <a
        role="button"
        class="navbar-burger"
        aria-label="menu"
        aria-expanded="false"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div class="navbar-end">
      <div class="navbar-item">
        <div class="dropdown" :class="{'is-active':this.flag}" v-if="this.$store.state.authentication.isAuthenticated">
          <div class="dropdown-trigger">
            <button
              class="button is-primary"
              aria-haspopup="true"
              aria-controls="dropdown-menu3"
              @click="toggleFlag"
            >
              <span>{{$store.state.authentication.userName}}</span>
              <span class="icon is-small">
                <i class="fas fa-angle-down" aria-hidden="true"></i>
              </span>
            </button>
          </div>
          <div class="dropdown-menu" id="dropdown-menu3" role="menu">
            <div class="dropdown-content">
              <a href="#" @click="logout" class="dropdown-item">
                Log Out
              </a>
            </div>
          </div>
        </div>
        <router-link
          v-if="$store.state.authentication.userName == null"
          to="/login"
          class="button is-light"
        >
          Log in
        </router-link>
        <a class="button is-light" @click="changeDisplayMode()">
          {{ this.$store.state.displayModule.displayModeName }}
        </a>
      </div>
    </div>
  </nav>
</template>

<script>
import isOnline from "is-online";

export default {
  data() {
    return {
      flag: false,
    };
  },

  mounted() {
    this.getDoctors();
    this.getFacilities();
  },

  methods: {
    toggleFlag(){
      console.log('triggered toggle flag')
      if(this.flag){
        this.flag = false;
      }else{
        this.flag = true
      }
    },
    logout(){
      this.$store.dispatch({
        type:'authentication/logout'
      })
    },
    changeDisplayMode() {
      console.log("Triggered");
      this.$store.commit({
        type: "displayModule/changeDisplayMode",
      });
      document.body.style.backgroundColor = this.$store.state.displayModule.displayColor;
    },

    async getDoctors() {
      console.log("Called");
      const is_Online = await isOnline();
      if (is_Online) {
        this.$store.dispatch({
          type: "addDoctor/getDoctors",
        });
      } else {
        console.error("No Internet Connection");
      }
    },

    async getFacilities() {
      const is_Online = await isOnline();
      if (is_Online) {
        this.$store.dispatch({
          type: "facilities/fetchFacilities",
        });
      } else {
        console.error("No Internet Connection");
      }
    },
  },
};
</script>
