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
        <div class="buttons">
          <a class="button is-primary">
            <strong>Sign up</strong>
          </a>
          <a class="button is-light" @click="getDoctors">
            Log in
          </a>
          <a class="button is-light" @click="changeDisplayMode()">
            {{ this.$store.state.displayModule.displayModeName }}
          </a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  mounted() {
    this.getDoctors();
    this.getFacilities();
  },

  methods: {
    changeDisplayMode() {
      console.log("Triggered");
      this.$store.commit({
        type: "displayModule/changeDisplayMode",
      });
      document.body.style.backgroundColor = this.$store.state.displayModule.displayColor;
    },

    getDoctors() {
      console.log("Called");
      this.$store.dispatch({
        type: "addDoctor/getDoctors",
      });
    },

    getFacilities() {
      this.$store.dispatch({
        type: "facilities/fetchFacilities",
      });
    },
  },
};
</script>
