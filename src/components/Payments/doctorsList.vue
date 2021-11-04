<template>
  <div class="container">
    <h2 style="font-size:30px;color:#25d1b2">Payments</h2>
    <table class="table mt-5 ml-auto mr-auto" style="width:80vh">
      <thead>
        <tr>
          <th style="color:#25d1b2">Doctor Name</th>
          <th style="color:#25d1b2">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="doctor in $store.state.addDoctor.doctors" :key="doctor">
          <td style="color:#25d1b2">{{ doctor.name }}</td>
          <td>
            <router-link :to="'/detailedPayments/'+doctor.name">Details</router-link>   
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
table {
  background: transparent;
}
</style>
