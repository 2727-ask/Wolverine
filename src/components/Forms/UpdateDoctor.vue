<template>
  <div class="container" style="width:70%;margin-top:20vh">
    <router-link to="/newdoctor"
      ><img
        src="https://img.icons8.com/color/48/000000/circled-chevron-left--v1.png"
    /></router-link>
    <h2 style="font-size:40px;color:#25d1b2">Update Doctors</h2>
    <form @submit.prevent="updateChanges">
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
      <center>
        <button
          class="button is-primary is-rounded"
          :class="{ 'is-loading': $store.state.addDoctor.isUpdating }"
          type="submit"
        >
          Update
        </button>
        <button
          class="button is-danger is-rounded"
          style="margin-left:30px"
          :class="{ 'is-loading': $store.state.addDoctor.isUpdating }">
        Delete
        </button>
      </center>
    </form>
  </div>
</template>

<script>
import Doctor from "../../models/DoctorModel.js";
export default {
  data() {
    return {
      flag: false,
      currentName: String,
      currentPhone: String,
      currentAddress: String,
    };
  },
  created() {
    console.log(this.$route.params.id);
    for (var x in this.$store.state.addDoctor.doctors) {
      if (
        this.$route.params.id == this.$store.state.addDoctor.doctors[x].phone
      ) {
        this.doctorName = this.currentName = this.$store.state.addDoctor.doctors[
          x
        ].name;
        this.phno = this.currentPhone = this.$store.state.addDoctor.doctors[
          x
        ].phone;
        this.address = this.currentAddress = this.$store.state.addDoctor.doctors[
          x
        ].address;
      }
    }
  },

  methods: {
    detectChanges() {
      if (
        this.doctorName != this.currentName ||
        this.phno != this.currentPhone ||
        this.address != this.currentAddress
      ) {
        this.flag = true;
      } else {
        this.flag = false;
      }
    },
    updateChanges() {
      this.detectChanges();
      if (this.flag) {
        var newUpdate = new Doctor(
          this.doctorName,
          this.address,
          this.phno,
          "hello"
        );
        this.$store.dispatch({
          type: "addDoctor/updateDoctor",
          payload: {
            update: newUpdate,
            target: this.currentName,
          },
        });
        console.log("Ready For Update");
      } else {
        console.log("No Changes Detected");
      }
    },
  },
};
</script>
