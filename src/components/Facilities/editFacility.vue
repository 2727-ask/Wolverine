<template>
  <div class="container">
    <h3 style="color:#25d1b2;font-size:40px">Update Facility</h3>
    <form @submit.prevent="extractData" style="margin-top:30px">
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label" style="color:#25d1b2;">Facility</label>
        </div>
        <div class="field-body">
          <div class="field">
            <p class="control is-expanded has-icons-left">
              <input
                class="input"
                type="text"
                v-model="facilityName"
                placeholder="eg. Doppler Scan"
                required
                disabled
              />
            </p>
          </div>
        </div>
      </div>

      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label" style="color:#25d1b2;">Total Price</label>
        </div>
        <div class="field-body">
          <div class="field">
            <p class="control is-expanded has-icons-left">
              <input
                class="input"
                type="number"
                v-model="totalPrice"
                min="0"
                placeholder=""
                required
              />
            </p>
          </div>
        </div>
      </div>

      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label" style="color:#25d1b2;">Cut Price</label>
        </div>
        <div class="field-body">
          <div class="field">
            <p class="control is-expanded has-icons-left">
              <input
                class="input"
                type="number"
                min="0"
                v-model="cutPrice"
                placeholder=""
                required
              />
            </p>
          </div>
        </div>
      </div>

      <h5 style="text-align:center;color:red" v-if="Log">{{ Log }}</h5>

      <center class="mt-3">
        <button
          class="button is-warning is-rounded"
          style="margin-left:30px"
          :class="{ 'is-loading': $store.state.facilities.addingFacility }"
          @click="updateFac"
        >
          Add Facility
        </button>
      </center>
    </form>
    <center class="mt-3">
        <button
          class="button is-danger is-rounded"
          style="margin-left:30px"
          @click="activateDeleteFacilityModal"
        >
          Delete
        </button>
      </center>


  </div>
  <DeleteModal :id="id" befName="Facility" befId="Facility" :name="facilityName" title="Delete Facility" type="facilities/deleteFacility" :payload="id"></DeleteModal>
</template>

<script>

import DeleteModal from "../../components/layouts/deleteModal"

export default {
  components:{
    DeleteModal
  },
  data() {
    return {
      id:String,
      originalFacName: "",
      fileName: "",
      fileLocation: "",
      filetype: "",
      Log: "",
    };
  },
  created() {
    this.getThatFacility();
  },
  methods: {
    

    updateFac(){
        this.$store.dispatch({
        type: "facilities/updateFacility",
        payload: {
          name:this.facilityName,
          totalPrice:this.totalPrice,
          cutPrice:this.cutPrice
        },
      });
    },


    getThatFacility() {
      console.log(
        "Triggered getThatFac",
        this.$store.state.facilities.facilities
      );
      for (var x in this.$store.state.facilities.facilities) {
        if (
          this.$store.state.facilities.facilities[x].id ===
          this.$route.params.id
        ) {
          this.id = this.$route.params.id;
          this.facilityName = this.$store.state.facilities.facilities[x].name;
          this.originalFacName = this.$store.state.facilities.facilities[
            x
          ].name;
          this.totalPrice = this.$store.state.facilities.facilities[
            x
          ].totalPrice;
          this.cutPrice = this.$store.state.facilities.facilities[x].cutPrice;
          this.fileName =
            this.$store.state.facilities.facilities[x].name + ".doc";
        } else {
          console.log("Not Found");
        }
      }
    },

    activateDeleteFacilityModal(){
      this.$store.state.activateDeleteModal = true;
    }
  },
};
</script>
