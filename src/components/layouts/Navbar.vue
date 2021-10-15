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
          <a class="button is-light">
            Log in
          </a>
          <a class="button is-light" @click="changeDisplayMode()">
            {{ this.$store.state.displayModeName }}
          </a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  methods: {
    changeDisplayMode() {
      console.log("Triggered");
      this.$store.commit({
        type: "changeDisplayMode",
      });
      document.body.style.backgroundColor = this.$store.state.displayColor;
    },
  },
};
</script>

