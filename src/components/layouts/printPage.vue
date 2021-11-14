<template>
  <div class="container ml-auto mr-auto">
    <center><button class="button is-success ml-auto mr-auto" @click="printContent">Print</button></center>
  </div>
  <div class="container" id="printMe" style="background:white">
    <h3 style="text-align:center;font-size:30px">
       Dr {{ $route.params.name }}
    </h3>
    <h3 style="text-align:center">( {{ $route.params.date }} )</h3>
    <hr style="background:black" />
    <table
      class="table ml-auto mr-auto"
      style="width:80vh;background:white;margin-top:30px"
      v-if="this.$store.state.records.recordsArray.length != 0"
    >
      <thead>
        <tr>
          <th>Date</th>
          <th>Patient Name</th>
          <th>Diagnosis of</th>
          <th>Total</th>
        </tr>
      </thead>
      <tfoot>
        <tr>
          <th></th>
          <th></th>
          <th>Total</th>
          <th>{{ this.$store.state.records.totalCut }} ₹</th>
        </tr>
      </tfoot>
      <tbody>
        <tr
          v-for="payment in this.$store.state.records.recordsArray"
          :key="payment.patientName"
        >
          <td>
            {{ payment.date }}
          </td>
          <td>
            {{ payment.patientName }}
          </td>
          <td>
            {{ payment.purpose }}
          </td>
          <td>
            {{ payment.cut }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <!-- <button class="button is-success" @click="printContent">Print Record</button> -->
</template>
<script>
import pre from "print-html-element";
export default {
  data() {
    return {
      data: this.$route.params.date,
    };
  },
  methods: {
    printContent() {
      pre.printElement(document.getElementById('printMe'));
    },
  },
};
</script>
