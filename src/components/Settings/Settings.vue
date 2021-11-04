<template>
  <div class="container">
    <h2 style="color:#25d1b2;font-size:40px">Settings</h2>
    <hr />
    <h3 style="color:#25d1b2">Files/Reports</h3>
    <form @submit.prevent="setLoc">
    <div class="field has-addons" style="margin-top:10px;">
      <p class="control is-expanded">
        <input
          class="input"
          type="text"
          v-model="saveToPath"
          placeholder="Save File To"
          required
        />
      </p>
      <p class="control">
        <button class="button" style="background:#25d1b2;border-color:#25d1b2;color:white">
          Save
        </button>
      </p>
    </div>
    </form>
    <h3>
      <span style="color:#25d1b2">Current Location :</span><span style="color:#FD2E24;margin-left:30px" v-if="loc"> {{ loc }}</span><span style="color:#FD2E24;margin-left:30px" v-else>Not Selected Yet</span>
    </h3>
    <form @submit.prevent="setTemplatePath">
    <div class="field has-addons" style="margin-top:10px;">
      <p class="control is-expanded">
        <input
          class="input"
          type="text"
          v-model="templatePath"
          placeholder="Get Templates From"
          required
        />
      </p>
      <p class="control">
        <button class="button" style="background:#25d1b2;border-color:#25d1b2;color:white">
          Save
        </button>
      </p>
    </div>
    </form>
    <h3>
      <span style="color:#25d1b2">Current Report Template Path :</span><span style="color:#FD2E24;margin-left:30px" v-if="tloc"> {{ tloc }}</span><span style="color:#FD2E24;margin-left:30px" v-else>Not Selected Yet</span>
    </h3>
  </div>
</template>
<script>
import setLocation from "../../functions/setSavingLocation.js";
import configReportPath from "../../functions/reportTemplatePath.js";
import loc from "../../../cred.json";
export default {
  data() {
    return {
      loc: loc.saveAt,
      tloc: loc.reportTemplatePath
    };
  },
  methods: {
    setLoc() {
      if (this.saveToPath){  
        setLocation(this.saveToPath);
      }
    },
    setTemplatePath(){
        if(this.templatePath){
            configReportPath(this.templatePath);
        }     
    }
  },
};
</script>
