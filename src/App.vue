<template>
<navbar style="margin-top:-20px"></navbar>
  <Tabs></Tabs>
  <div class="container is-max-widescreen">
    <div class="notification is-primary">
      This container has a <code>max-width</code> of
      <code>$widescreen - $container-offset</code> on fullhd.
    </div>
  </div>
</template>

<script>
import Tabs from "./components/Tabs";
import Navbar from "./components/layouts/Navbar";

export default {
  name: "App",
  components: {
    Tabs,
    Navbar

  },
};
</script>

<style>
@import "./../node_modules/bulma/css/bulma.css";

</style>
