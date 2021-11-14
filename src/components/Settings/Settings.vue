<template>
  <div class="container">
    <h2 style="color:#25d1b2;font-size:40px">Settings</h2>
    <hr />
    <h1 style="color:#25d1b2;font-size:40px">Save Reports At</h1>
    <button
      class="button"
      type="button"
      @click="setLoc"
      style="background:#25d1b2;border-color:#25d1b2;color:black"
    >
      {{ loc }}
    </button>

    <hr />
    <h1 style="color:#25d1b2;font-size:40px">Save Templates At</h1>
    <button
      class="button"
      @click="setTemplateLoc"
      style="background:#25d1b2;border-color:#25d1b2;color:black"
    >
      {{ tloc }}
    </button>
    <hr>
  </div>
  
</template>
<script>
import fs from "fs";
import { dialog } from "@electron/remote";
export default {
  data() {
    return {
      loc: null,
      tloc: null,
    };
  },

  mounted() {
    if (fs.readFileSync(process.cwd() + "/saveReportTo.txt").length != 0) {
      this.loc = fs.readFileSync(process.cwd() + "/saveReportTo.txt");
    } else {
      this.loc = "Not Set Yet";
    }

    if (
      fs.readFileSync(process.cwd() + "/saveReportTemplateTo.txt").length != 0
    ) {
      this.tloc = fs.readFileSync(process.cwd() + "/saveReportTemplateTo.txt");
    } else {
      this.tloc = "Not Set Yet";
    }
  },

  methods: {
    updateFile(location, fileName) {
      fs.writeFileSync(process.cwd() + fileName, location, function(err) {
        if (err) {
          dialog.showMessageBox({
            type: "error",
            message: err,
          });
        }
        console.log("Updated!");
        this.loc = fs.readFileSync(process.cwd() + "/saveReportTo.txt");
      });
    },

    async setLoc() {
      const dir = await dialog.showOpenDialog({
        properties: ["openDirectory"],
      });
      if (dir) {
        this.updateFile(`${dir.filePaths[0]}`, "/saveReportTo.txt");
        this.loc = fs.readFileSync(process.cwd() + "/saveReportTo.txt");
      }
    },

    async setTemplateLoc() {
      const dir = await dialog.showOpenDialog({
        properties: ["openDirectory","promptToCreate","createDirectory"],
      });
      if (dir) {
        this.updateFile(`${dir.filePaths[0]}`, "/saveReportTemplateTo.txt");
        this.tloc = fs.readFileSync(process.cwd() + "/saveReportTemplateTo.txt");
      }
    },
  },
};
</script>
