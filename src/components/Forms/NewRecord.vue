<template>
  <div class="container" style="width:70%;margin-top:20vh">
    <form @submit.prevent="extractData">
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Patient Name</label>
        </div>
        <div class="field-body">
          <div class="field">
            <p class="control is-expanded has-icons-left">
              <input
                class="input"
                type="text"
                v-model="patientName"
                placeholder="eg. Sachin Tendulkar"
              />
            </p>
          </div>
        </div>
      </div>

      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Age</label>
        </div>
        <div class="field-body">
          <div class="field">
            <p class="control is-expanded has-icons-left">
              <input
                class="input"
                v-model="age"
                type="number"
                placeholder="eg. 19"
              />
            </p>
          </div>
        </div>
      </div>

      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Gender</label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="select">
              <select v-model="gender">
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Diagnosis of</label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="select">
              <select v-model="purpose" @change="getDiagnosisInfo">
                <option
                  v-for="x in $store.state.facilities.facilities"
                  :key="x"
                  >{{ x.name }}</option
                >
              </select>
            </div>
          </div>
        </div>
      </div>

      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Refered By</label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="select">
              <select v-model="refBy">
                <option
                  v-for="doctor in $store.state.addDoctor.doctors"
                  :key="doctor"
                  >{{ doctor.name }}</option
                >
              </select>
            </div>
          </div>
        </div>
      </div>

      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Date</label>
        </div>
        <div class="field-body">
          <div class="field">
            <p class="control is-expanded has-icons-left">
              <input
                class="input"
                v-model="date"
                type="date"
                placeholder="eg. Sachin Tendulkar"
              />
            </p>
          </div>
        </div>
      </div>

      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Cut NA</label>
        </div>
        <div class="field-body">
          <div class="field" style="margin-top:7px">
            <p class="control is-expanded has-icons-left">
              <input type="checkbox" v-model="cutNA" @change="checkCutApplicableOrNot"/>
            </p>
          </div>
        </div>
      </div>

      <button class="button is-primary is-rounded">Save Data</button>
    </form>
    <Modal :patientName="patientName" :patientAge="age" :patientGender="gender" :date="date" :refBy="refBy" :purpose="purpose" :tp="total" :pp="priceAppliedToCustomer" :cut="cutForDoctor"></Modal>

  </div>
</template>

<script>
// import Record from "../../models/PatientRecord.js"
import Modal from "../layouts/Modal";
export default {
  components:{
    Modal
  },
  data(){
    return{
      facilityName:String,
      total:Number,
      priceAppliedToCustomer:Number,
      profit:Number,
      cutAmount:Number,
      cutForDoctor:Number,
    }
  },
  created() {
    console.log("data", this.$store.state.facilities);
  },
  methods: {
    getDiagnosisInfo() {
      const facilityArray = this.$store.state.facilities.facilities;
      facilityArray.forEach((facility) => {
        if(facility.name == this.purpose){
            this.facilityName = facility.name;
            this.cutAmount = facility.cutPrice;
            this.total = facility.totalPrice;
            console.log(this.facilityName,this.cutAmount,this.total)
        }
      });
    },
    checkCutApplicableOrNot(){
      if(this.cutNA == true){
        this.priceAppliedToCustomer = this.total - this.cutAmount;
        this.profit = this.priceAppliedToCustomer;
        this.cutForDoctor = 0;
      }else{
        this.priceAppliedToCustomer = this.total;
        this.profit = this.priceAppliedToCustomer - this.cutAmount;
        this.cutForDoctor = this.cutAmount;
      }
    },
    extractData(){  
      this.checkCutApplicableOrNot(); 
      console.log(this.date)
      console.log("Applied Cut",this.cutForDoctor);
      console.log("Total Price",this.total);
      console.log("Total Profit",this.profit);
      console.log("Price Applied To Customer",this.priceAppliedToCustomer)
      this.$store.state.activateModal = true;
    }
  },

  // extractData(){
  //   const record  = new Record(this.patientName,this.age,this.gender,this.purpose,this.refBy,this.date,);
  // }
};
</script>

<style scoped>
label {
  color: #25d1b2;
}
</style>
