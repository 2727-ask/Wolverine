<template>
  <navbar style="margin-top:-20px"></navbar>
  <Tabs></Tabs>
  <router-view></router-view>
</template>

<script>
import Tabs from "./components/layouts/Tabs";
import Navbar from "./components/layouts/Navbar";

export default {
  name: "App",
  components: {
    Tabs,
    Navbar,
  },
};
</script>

<style>
@import "./../node_modules/bulma/css/bulma.css";
</style>
