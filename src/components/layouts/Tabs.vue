<template>
  <div class="tabs is-centered is-boxed is-medium">
    <ul>
      <li :class="{ isactive: activate === 'newrecord' }">
        <router-link to="/" @click="activate = 'newrecord'">
          <span :class="{ isactive: activate === 'newrecord' }">New Record</span>
        </router-link>
      </li>
      <li :class="{ isactive: activate === 'doctors' }">
        <router-link to="/newdoctor" @click="activate = 'doctors'">
          <span :class="{ isactive: activate === 'doctors' }">Doctors</span>
        </router-link>
      </li>
      <li :class="{ isactive: activate === 'facilities' }">
        <router-link to="/facilities" @click="activate = 'facilities'">
          <span :class="{ isactive: activate === 'facilities' }">Facilities</span>
        </router-link>
      </li>
      <li :class="{ isactive: activate === 'payments' }">
        <router-link to="/payments" @click="activate = 'payments'">
          <span :class="{ isactive: activate === 'payments' }">Payments</span>
        </router-link>
      </li>
      <li :class="{ isactive: activate === 'settings' }">
        <router-link to="/settings" @click="activate = 'settings'">
          <span :class="{ isactive: activate === 'settings' }">Settings</span>
        </router-link>
      </li>
      <li>
        <a href="#" @click="refresh" style="color:orange">
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
.isactive {
  color: #25d1b2;
  border:none;
  background:transparent;
  border-radius: 30px;
  padding: 10px;
}
</style>
