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
                required
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

      <div class="file has-name is-boxed ml-auto">
        <label class="file-label ml-auto mr-auto">
          <input
            class="file-input"
            type="file"
            @change="getFileInfo"
            name="report"
            required
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
            <h3 v-if="fileName != null || fileName != ''">{{ fileName }}</h3>
          </span>
        </label>
      </div>

      <input
        type="checkbox"
        style="margin-left:40%"
        v-model="confirmed"
        @change="confirmThisFile"
        required
      />
      <span style="color:#25d1b2;margin-left:30px">Confirm This File</span>
      <h5 style="text-align:center;color:red" v-if="Log">{{ Log }}</h5>

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
    <div
      class="uk-container"
      style="margin-top:60px"
      v-if="$store.state.facilities.facilities.length"
    >
      <center>
        <div style="overflow-y: scroll; height:400px;">
          <table class="table" style="background:transparent">
            <thead>
              <tr>
                <th style="color:#25d1b2;">Facility</th>
                <th style="color:#25d1b2;">Total Price</th>
                <th style="color:#25d1b2;">Cut Price</th>
                <th style="color:#25d1b2;">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="facility in $store.state.facilities.facilities"
                :key="facility"
              >
                <td style="color:#25d1b2;">{{ facility.name }}</td>
                <td style="color:#25d1b2;">{{ facility.totalPrice }}</td>
                <td style="color:#25d1b2;">{{ facility.cutPrice }}</td>
                <td style="color:#25d1b2;">
                  <router-link :to="slug1 + facility.id">edit</router-link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </center>
    </div>
  </div>
</template>
<script>
import move from "../../functions/moveFile.js";
import fs from "fs";
import Facility from "../../models/facilityModel.js";
import { v4 as uuidv4 } from "uuid";
export default {
  components: {},

  data() {
    return {
      slug1: "/editFacility/",
      fileName: null,
      fileLocation: String,
      filetype: String,
      Log: "",
    };
  },
  created() {},
  mounted() {
    this.$store.dispatch({
      type: "facilities/fetchFacilities",
    });
  },
  methods: {
    extractData() {
      const facility = new Facility(
        uuidv4(),
        this.facilityName,
        this.totalPrice,
        this.cutPrice
      );

      this.$store.dispatch({
        type: "facilities/addFacility",
        payload: facility,
      });

      this.moveAndRenameFile();
      this.confirmed = false;
    },
    async moveAndRenameFile() {
      if (this.confirmed) {
        await move(
          `${this.fileLocation}`,
          `${fs.readFileSync(process.cwd() + "/saveReportTemplateTo.txt")}`,
          (err) => {
            console.log(err);
          }
        );
        console.log("File Name is", this.fileName);
        try {
          if (
            fs.existsSync(
              `${fs.readFileSync(
                process.cwd() + "/saveReportTemplateTo.txt"
              )}/${this.facilityName}.doc`
            )
          ) {
            console.error("File Already Exixts");
          } else {
            await fs.rename(
              `${fs.readFileSync(
                process.cwd() + "/saveReportTemplateTo.txt"
              )}/${this.fileName}`,
              `${fs.readFileSync(
                process.cwd() + "/saveReportTemplateTo.txt"
              )}/${this.facilityName}.doc`,
              (err) => {
                console.log(err);
              }
            );
          }
        } catch (error) {
          console.error(error);
        }
      } else {
        this.Log = "Please Confirm File Upload";
      }
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
  },
};
</script>
