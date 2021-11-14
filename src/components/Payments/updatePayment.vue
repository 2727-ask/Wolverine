<template>
  <div class="container" style="margin-top:10vh">
  <router-link class="button is-success" style="margin-left:50px" :to="/detailedPayments/+$route.params.docName"> Go Back</router-link>
    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label">Payment id : </label>
      </div>
      <div class="field-body mt-2">
        <div class="field">
          <p class="control">
            <b class="mt-2">{{ $route.params.id }}</b>
          </p>
        </div>
      </div>
    </div>
    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label">Patient Name :</label>
      </div>
      <div class="field-body mt-2">
        <div class="field">
          <p class="control">
            <b class="mt-2">{{ $route.params.patName }}</b>
          </p>
        </div>
      </div>
    </div>
    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label">Reffered By :</label>
      </div>
      <div class="field-body mt-2">
        <div class="field">
          <p class="control">
            <b class="mt-2">{{ $route.params.docName }}</b>
          </p>
        </div>
      </div>
    </div>
    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label">Purpose :</label>
      </div>
      <div class="field-body mt-2">
        <div class="field">
          <p class="control">
            <b class="mt-2">{{ $route.params.purpose }}</b>
          </p>
        </div>
      </div>
    </div>
    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label">Pay Cut </label>
      </div>
      <div class="field-body">
        <div class="field">
          <p class="control" :class="{ 'is-loading': isLoading }">
            <input class="input" ref="cut" type="number" v-model="cut_price" />
          </p>
        </div>
      </div>
    </div>
    <div class="buttons" style="margin-left:150px">
      <button
        class="button is-warning"
        :class="{ 'is-loading': isUpdating }"
        @click="updateCut"
      >
        Update
      </button>
      <button class="button is-danger" @click="activateDeleteModal">Delete</button>
    </div>
  </div>
  <deleteModal
    :id="$route.params.id"
    befName="Record"
    befId="Record Id"
    :name="$route.params.patName"
    title="Delete Payment Record"
    type="records/deleteRecord"
    :payload="$route.params.id"
    :month="$route.params.mon"
    :year="$route.params.year"
    :docName="$route.params.docName"
  ></deleteModal>
</template>
<script>
import { db } from "../../firebaseConfig.js";
import { dialog } from "@electron/remote";
import deleteModal from "../layouts/deleteModal";
export default {
  components: {
    deleteModal,
  },
  data() {
    return {
      fac_name: null,
      patient_name: null,
      isLoading: false,
      isUpdating: false,
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        this.isLoading = true;
        await db
          .collection("Payments")
          .doc(this.$route.params.docName)
          .collection(this.$route.params.year)
          .doc(this.$route.params.mon.toString())
          .collection("data")
          .where("id", "==", this.$route.params.id)
          .get()
          .then((data) => {
            data.forEach((doc) => {
              this.cut_price = doc.data().cut;
            });
            this.isLoading = false;
          });
      } catch (error) {
        dialog.showMessageBoxSync({
          title: "Error",
          message: `${error}`,
          type: "error",
        });
      }
    },
    async updateCut() {
      this.cut_price = parseInt(this.$refs.cut.value)
      console.log(this.cut_price)
      try {
        this.isUpdating = true;
        const data = await db
          .collection("Payments")
          .doc(this.$route.params.docName)
          .collection(this.$route.params.year)
          .doc(this.$route.params.mon.toString())
          .collection("data")
          .where("id", "==", this.$route.params.id);
        data.get().then((doc) => {
          doc.forEach((mydata) => {
            mydata.ref.update({
              cut: this.cut_price,
            });
          });
          this.fetchData();
          this.isUpdating = false;
        });
      } catch (error) {
        dialog.showMessageBoxSync({
          title: "Error",
          message: `${error}`,
          type: "error",
        });
      }
    },
    activateDeleteModal() {
      console.log('Activating....')  
      this.$store.state.activateDeleteModal = true;
    },
  },
};
</script>
