<template>
  <div class="container">
    <form @submit.prevent="extractData">
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
                placeholder=""
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
                v-model="cutPrice"
                placeholder=""
              />
            </p>
          </div>
        </div>
      </div>

      <div class="file has-name is-boxed ml-auto">
        <label class="file-label ml-auto mr-auto">
          <input class="file-input" type="file" @change="getFileInfo" name="report" />
          <span class="file-cta">
            <span class="file-icon">
              <i class="fas fa-upload"></i>
            </span>
            <span class="file-label">
              Choose a file…
            </span>
          </span>
          <span class="file-name">
            eg.docx
          </span>
        </label>
      </div>

      <center class="mt-3">
        <button
          class="button is-warning is-rounded"
          style="margin-left:30px"
          :class="{ 'is-loading': $store.state.facilities.addingFacility }"
        >
          Add Facility
        </button>
      </center>
    </form>
    <div class="uk-container" style="margin-top:60px">
      <center>
        <div style="overflow-y: scroll; height:400px;">
          <table class="table">
            <thead>
              <tr>
                <th>Facility</th>
                <th>Total Price</th>
                <th>Cut Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="facility in $store.state.facilities.facilities"
                :key="facility"
              >
                <td>{{ facility.name }}</td>
                <td>{{ facility.totalPrice }}</td>
                <td>{{ facility.cutPrice }}</td>
                <td>edit</td>
              </tr>
            </tbody>
          </table>
        </div>
      </center>
    </div>
  </div>
</template>
<script>
import Facility from "../../models/facilityModel.js";
export default {
  components: {},

  data() {
    return {
      fileName:String,
      fileLocation:String,
      filetype:String
    };
  },
  created() {},
  methods: {
    extractData() {
      const facility = new Facility(
        this.facilityName,
        this.totalPrice,
        this.cutPrice
      );
      this.$store.dispatch({
        type: "facilities/addFacility",
        payload: facility,
      });
    },
    getFileInfo(event){
      const fileInfo = event.target.files;
      console.log(fileInfo);
      this.fileName = fileInfo[0].name;
      this.fileLocation = fileInfo[0].path;
      this.filetype = fileInfo[0].type;
      
    }
  },
};
</script>
