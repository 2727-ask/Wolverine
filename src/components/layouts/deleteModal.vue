<template>
  <div class="modal" :class="{ 'is-active': $store.state.activateDeleteModal }">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ title }}</p>
        <button
          class="delete"
          aria-label="close"
          @click="deactivateModal"
        ></button>
      </header>
      <section class="modal-card-body">
        <h2>
          Are You Sure You Want To Delete {{ befName }}
          <b style="color:green">{{ name }}</b>
        </h2>
        <h2>{{ befId }} Id : {{ id }}</h2>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-danger" @click="deleteIt">Yes Delete!</button>
        <button class="button" @click="deactivateModal">Cancel</button>
      </footer>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      payloadForRecords: {},
    };
  },
  props: {
    id: String,
    name: String,
    title: String,
    type: String,
    payload: String,
    befName: String,
    befId: String,
    month: null,
    year: null,
    docName: null,
  },
  methods: {
    deactivateModal() {
      this.$store.state.activateDeleteModal = false;
    },
    recall(docName, month, year) {
      this.$store.dispatch({
        type: "records/fetchPayments",
        payload: {
          docName: docName,
          month: month,
          year: year,
        },
      });
    },
    deleteIt() {
      console.log(this.payload);
      console.log("Deleteing");
      if (this.type === "records/deleteRecord") {
        console.log("Deleteing A Record");
        this.payloadForRecords.month = this.month;
        this.payloadForRecords.year = this.year;
        this.payloadForRecords.docName = this.docName;
        this.payloadForRecords.id = this.id;

        this.$store.dispatch({
          type: this.type,
          payload: this.payloadForRecords,
        });
        this.recall(this.docName, this.month, this.year);
        this.$store.state.activateDeleteModal = false;
      } else if (this.type === "facilities/deleteFacility") {
        this.$store.dispatch({
          type: this.type,
          payload: {
            id: this.payload,
            name: this.name,
          },
        });
      } else {
        this.$store.dispatch({
          type: this.type,
          payload: this.payload,
        });
        this.$store.state.activateDeleteModal = false;
      }
    },
  },
};
</script>
