<template>
  <div class="container" style="width:70%;margin-top:20vh">
    <router-link to="/newdoctor"
      ><img
        src="https://img.icons8.com/color/48/000000/circled-chevron-left--v1.png"
    /></router-link>
    <h2 style="font-size:40px;color:#25d1b2">Update Doctors</h2>
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
      <center>
        <button
          class="button is-primary is-rounded"
          :class="{ 'is-loading': $store.state.addDoctor.isLoading }"
          type="submit"
        >
          Save
        </button>
      </center>
    </form>
  </div>
</template>

<script>
export default {
  created() {
    console.log(this.$route.params.id);
    for(var x in this.$store.state.addDoctor.doctors){
        if(this.$route.params.id == (this.$store.state.addDoctor.doctors[x].phone)){
            this.doctorName = (this.$store.state.addDoctor.doctors[x].name)
            this.phno = (this.$store.state.addDoctor.doctors[x].phone)
            this.address = (this.$store.state.addDoctor.doctors[x].address)
        }
    }
  },
};
</script>
