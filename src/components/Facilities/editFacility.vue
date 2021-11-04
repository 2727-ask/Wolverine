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

    <div class="container my-5">
      <div class="field is-horizontal" style="margin-left:180px">
        <div class="columns">
          <div class="column">
            <div class="file has-name is-right">
              <label class="file-label">
                <input
                  class="file-input"
                  type="file"
                  name="resume"
                  @change="getFileInfo"
                />
                <span class="file-cta">
                  <span class="file-icon">
                    <i class="fas fa-upload"></i>
                  </span>
                  <span class="file-label">
                    Choose a file…
                  </span>
                </span>
                <span class="file-name">
                  {{ this.fileName }}
                </span>
              </label>
            </div>
          </div>
          <div class="column">
            <button class="button is-link is-outlined" @click="updateFile" >
              Upload
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <DeleteModal :id="id" befName="Facility" befId="Facility" :name="facilityName" title="Delete Facility" type="facilities/deleteFacility" :payload="id"></DeleteModal>
</template>

<script>
import loc from "../../../cred.json";
import FileOperations from "../../functions/fileOperations.js";
import DeleteModal from "../../components/layouts/deleteModal"
import move from "../../functions/moveFile.js";

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
    updateFile() {
      console.log(loc);
      const fileOpt = new FileOperations();
      const res = fileOpt.deleteFile(
        loc.reportTemplatePath + this.originalFacName + ".doc"
      );
      console.log("Res is ",res); 
      if (res) {
        console.log("Res is ",res);  
        const moved = move(this.fileLocation, loc.reportTemplatePath);  
        if(moved){
            console.log('File Moved Ready to rename')
            fileOpt.renameFile(`${loc.reportTemplatePath}${this.fileName}`,`${loc.reportTemplatePath}${this.facilityName}.docx`);
        } 
      }
    },

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

    

    getFileInfo(event) {
      if (this.facilityName == "" || this.facilityName == undefined) {
        console.log("Facility Name Donot Exist");
        this.Log = "Please Enter Facility Name First!";
      } else {
        this.Log = null;
        const fileInfo = event.target.files;
        console.log(fileInfo);
        this.fileName = fileInfo[0].name;
        this.fileLocation = fileInfo[0].path;
        this.filetype = fileInfo[0].type;
        console.log(this.fileName);
        // console.log(this.fileLocation)
      }
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
