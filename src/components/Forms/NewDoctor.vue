<template>
  <div class="container" style="width:70%;margin-top:20vh">
  <h2 style="font-size:40px;color:#25d1b2">Doctors</h2>
  <h4 style="font-size:20px;color:#25d1b2">Total : {{$store.state.addDoctor.dlength}}</h4>
    <div class="columns">
      <div class="column">
        <div style="overflow-y: scroll; height:400px;">
          <strip-card
            v-for="doctor in $store.state.addDoctor.doctors"
            :key="doctor"
            :slug="doctor.phone" 
            :doctorName="doctor.name"
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
                    placeholder="Phone Number"
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
                  />
                </p>
              </div>
            </div>
          </div>
          <button
            class="button is-primary is-rounded"
            :class="{'is-loading':$store.state.addDoctor.isLoading}"
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

export default {
  components: {
    StripCard,
  },
  methods: {
    extractValuesDoctor() {
      const timeElapsed = Date.now();
      const today = new Date(timeElapsed);
      const data = new Doctor(
        this.doctorName,
        this.address,
        this.phno,
        today.toDateString()
      );

      this.$store.dispatch({
        type: "addDoctor/addDoctor",
        payload: data,
      });
    },
  },
};
</script>

<style>
label {
  color: #25d1b2;
}
</style>
