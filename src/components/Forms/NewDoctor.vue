<template>
  <div class="container" style="width:70%;margin-top:20vh">
    <h2 style="font-size:40px;color:#25d1b2">Doctors</h2>
    <h4 style="font-size:20px;color:#25d1b2">
      Total : {{ $store.state.addDoctor.dlength }}
    </h4>
    <div class="columns">
      <div class="column">
        <div style="overflow-y: scroll; height:400px;">
          <strip-card
            v-for="doctor in $store.state.addDoctor.doctors"
            :key="doctor"
            :slug2="doctor.id"
            :title="doctor.name"
            slug1="/updatedoctor/"
          ></strip-card>
        </div>
      </div>
      <div class="column">
        <form @submit.prevent="extractValuesDoctor">
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label" style="color:#25d1b2;">Name</label>
            </div>
            <div class="field-body">
              <div class="field">
                <p class="control is-expanded has-icons-left">
                  <input
                    class="input"
                    type="text"
                    v-model="doctorName"
                    placeholder="eg. Sachin Tendulkar"
                    pattern="[^/><\][\\\x22,;|]+"
                    required
                  />
                </p>
              </div>
            </div>
          </div>
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label" style="color:#25d1b2">Phone</label>
            </div>
            <div class="field-body">
              <div class="field">
                <p class="control is-expanded has-icons-left">
                  <input
                    class="input"
                    type="text"
                    v-model="phno"
                    title="Phone Number Should have 10 digits"
                    pattern="[1-9]{1}[0-9]{9}"
                    placeholder="Phone Number"
                    required
                  />
                </p>
              </div>
            </div>
          </div>
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label" style="color:#25d1b2">Address</label>
            </div>
            <div class="field-body">
              <div class="field">
                <p class="control is-expanded has-icons-left">
                  <input
                    class="input"
                    type="text"
                    v-model="address"
                    placeholder="eg . Patan"
                    required
                  />
                </p>
              </div>
            </div>
          </div>
          <button
            class="button is-primary is-rounded ml-5"
            :class="{ 'is-loading': $store.state.addDoctor.isLoading }"
            type="submit"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import StripCard from "./../layouts/StripCard";
import Doctor from "../../models/DoctorModel.js";
import { v4 as uuidv4 } from "uuid";
import { dialog } from "@electron/remote";

export default {
  components: {
    StripCard,
  },
  methods: {
    extractValuesDoctor() {
      var ifConnected = window.navigator.onLine;
      if (ifConnected) {
        const timeElapsed = Date.now();
        const today = new Date(timeElapsed);
        const data = new Doctor(
          uuidv4(),
          this.doctorName,
          this.address,
          this.phno,
          today.toDateString()
        );

        this.$store.dispatch({
          type: "addDoctor/addDoctor",
          payload: data,
        });
      } else {
        dialog.showMessageBoxSync({
          type: "error",
          message: "No Internet Connection",
        });
      }
    },
  },
};
</script>

<style>
label {
  color: #25d1b2;
}
</style>
