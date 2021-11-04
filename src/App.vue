<template>
  <navbar style="margin-top:-20px"></navbar>
  <login v-if="$store.state.authentication.isAuthenticated == false"></login>
  <Tabs v-if="$store.state.authentication.isAuthenticated" ></Tabs>
  <router-view v-if="$store.state.authentication.isAuthenticated"></router-view>
</template>

<script>
import Tabs from "./components/layouts/Tabs";
import Navbar from "./components/layouts/Navbar";
import login from "./components/Forms/login";


export default {
  name: "App",
  components: {
    Tabs,
    Navbar,
    login
  },
};
</script>

<style>
@import "./../node_modules/bulma/css/bulma.css";
</style>
