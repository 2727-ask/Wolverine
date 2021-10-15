<template>
  <div class="tabs is-centered is-boxed is-medium">
    <ul>
      <li>
        <a @click="isActive = 'newRecord'">
          <span :class="{ active: isActive === 'newRecord' }" style=""
            >New Record</span
          >
        </a>
      </li>
      <li>
        <a @click="isActive = 'doctors'">
          <span class="icon is-small"
            ><i class="fas fa-music" aria-hidden="true"></i
          ></span>
          <span :class="{ active: isActive === 'doctors' }">Doctors</span>
        </a>
      </li>
      <li>
        <a @click="isActive = 'payments'">
          <span class="icon is-small"
            ><i class="fas fa-film" aria-hidden="true"></i
          ></span>
          <span :class="{ active: isActive === 'payments' }">Payments</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isActive: "",
    };
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
