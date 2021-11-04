<template>
  <div class="tabs is-centered is-boxed is-medium">
    <ul>
      <li :class="{ isactive: activate === 'newrecord' }">
        <router-link to="/" @click="activate = 'newrecord'">
          <span>New Record</span>
        </router-link>
      </li>
      <li :class="{ isactive: activate === 'doctors' }">
        <router-link to="/newdoctor" @click="activate = 'doctors'">
          <span>Doctors</span>
        </router-link>
      </li>
      <li :class="{ isactive: activate === 'facilities' }">
        <router-link to="/facilities" @click="activate = 'facilities'">
          <span>Facilities</span>
        </router-link>
      </li>
      <li :class="{ isactive: activate === 'payments' }">
        <router-link to="/payments" @click="activate = 'payments'">
          <span>Payments</span>
        </router-link>
      </li>
      <li :class="{ isactive: activate === 'settings' }">
        <router-link to="/settings" @click="activate = 'settings'">
          <span>Settings</span>
        </router-link>
      </li>
      <li>
        <a href="#" @click="refresh">
          Refresh
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import isOnline from "is-online";
export default {
  data() {
    return {
      activate: "",
    };
  },
  methods: {
    async refresh() {
      const is_Online = await isOnline();
      if (isOnline) {
        this.$store.dispatch({
          type: "addDoctor/getDoctors",
        });
      } else {
        console.error("No Internet Connection");
      }
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

<style scoped>
.active {
  color: #25d1b2;
  border: 2px solid #25d1b2;
  border-radius: 30px;
  padding: 10px;
}
</style>
