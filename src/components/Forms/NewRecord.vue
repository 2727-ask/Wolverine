<template>
  <div class="container" style="width:70%;margin-top:15vh">
    <h1 style="font-size:40px;color:#25d1b2">New Record</h1>
    <hr>
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
                required
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
                required
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
              <select v-model="gender" required>
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
              <select v-model="purpose" @change="getDiagnosisInfo" required>
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
              <select v-model="refBy" required>
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
                required
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
              <input type="checkbox" v-model="cutNA" @change="checkCutApplicableOrNot"/> <span style="color:#25d1b2;margin-left:10px"> Warning! Sets Cut To 0 Rs</span>
            </p>
          </div>
        </div>
      </div>

      <button class="button is-primary is-rounded ml-5">Save Data</button>
    </form>
    <Modal :patientName="PpatientName" :patientAge="Page" :patientGender="Pgender" :date="Pdate" :refBy="PrefBy" :purpose="Ppurpose" :tp="total" :pp="priceAppliedToCustomer" :cut="cutForDoctor" :profit="profit"></Modal>

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
      PpatientName:String,
      Page:String,
      Pgender:String,
      Pdate:String,
      PrefBy:String,
      Ppurpose:String,
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
      }else if(this.refBy === 'Self'){
        console.log("Other Doctor Detected");
        this.cutForDoctor = 0;
        this.profit = this.total;
        this.priceAppliedToCustomer = this.total;
      }else{
        this.priceAppliedToCustomer = this.total;
        this.profit = this.priceAppliedToCustomer - this.cutAmount;
        this.cutForDoctor = this.cutAmount;
      }
    },
    extractData(){  
      this.checkCutApplicableOrNot(); 
      this.PpatientName = this.patientName;
      this.Page = this.age;
      this.Pgender = this.gender;
      this.Pdate = this.date;
      this.PrefBy = this.refBy;
      this.Ppurpose = this.purpose;
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
