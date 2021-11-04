<template>
  <div class="modal" :class="{ 'is-active': $store.state.activateModal }">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Confirm Information</p>
        <button class="delete" aria-label="close" @click="cancelModal"></button>
      </header>
      <section class="modal-card-body">
        <div class="container">
          <h3>
            Patient Name : <span>{{ patientName }}</span>
          </h3>
          <h3>
            Patient Age : <span>{{ patientAge }}</span>
          </h3>
          <h3>
            Patient Gender : <span>{{ patientGender }}</span>
          </h3>
          <h3>
            Date of Diagnosis : <span>{{ date }}</span>
          </h3>
          <h3>
            Reffered By : Dr. <span>{{ refBy }}</span>
          </h3>
          <h3>
            Purpose : <span>{{ purpose }}</span>
          </h3>
          <h3>
            Total Price : <span>{{ tp }}</span>
          </h3>
          <h3>
            Cut For Doctor : <span>{{ cut }}</span>
          </h3>
          <h3>
            Patient Pays : <span>{{ pp }}</span>
          </h3>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button
          class="button is-success"
          @click="generateReport"
          :class="{ 'is-loading': $store.state.records.savingRecord }"
        >
          Save changes
        </button>
        <button class="button" @click="cancelModal">Cancel</button>
      </footer>
    </div>
  </div>
</template>

<script>
import Generator from "../../functions/generateReport.js";
import Record from "../../models/PatientRecord.js";
import { v4 as uuidv4 } from 'uuid';
export default {
  props: {
    patientName: String,
    patientAge: Number,
    patientGender: String,
    date: Date,
    refBy: String,
    purpose: String,
    tp: String,
    cut: String,
    pp: String,
    profit: Number,
  },
  methods: {
    cancelModal() {
      this.$store.state.activateModal = false;
    },
    generateReport() {
      this.storeData();
      const gen = new Generator();
      gen.generator(
        this.purpose,
        this.patientName,
        this.patientAge,
        this.date,
        this.refBy
      );
    },
    storeData() {
      var id = uuidv4()
      const record = new Record(
        id,
        this.patientName,
        this.patientAge,
        this.patientGender,
        this.purpose,
        this.refBy,
        this.date,
        this.cut,
        this.tp,
        this.profit,
        this.pp
      );
      this.$store.dispatch({
        type: "records/newPayment",
        payload: record,
      });
    },
  },
};
</script>
