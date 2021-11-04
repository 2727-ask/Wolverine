<template>
  <div class="container" style="margin-top:20vh;background:transparent">

    <h2 style="text-align:center;font-size:30px;color:#25d1b2">Authentication Required</h2>
    <form class="box" @submit.prevent="login" style="background:transparent">
      <div class="field">
        <label class="label" style="color:#25d1b2">Email</label>
        <div class="control">
          <input
            class="input"
            type="email"
            v-model="email"
            placeholder="e.g. alex@example.com"
          />
        </div>
      </div>

      <div class="field">
        <label class="label" style="color:#25d1b2">Password</label>
        <div class="control">
          <input
            class="input"
            type="password"
            v-model="password"
            placeholder="********"
          />
        </div>
      </div>

      <button class="button is-primary">Sign in</button>
    </form>
  </div>
</template>
<script>

export default {
  data() {
    return {
      user: '',
    };
  },
  methods: {
    login() {
        this.$store.dispatch({
            type:'authentication/login',
            payload:{
                email:this.email,
                password:this.password
            }
        })

    },
  },
};
</script>
