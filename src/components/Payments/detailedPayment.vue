<template>
  <div class="container">
    <h2 style="color:#25d1b2;font-size:30px">Detailed Payment</h2>
    <h3 class="mt-5">
      <div class="field is-grouped is-grouped-multiline">
        <div class="control">
          <div class="tags has-addons">
            <h2 class="tag is-link p-2" style="font-size:20px">
              Dr.{{ $route.params.id }}
            </h2>
          </div>
        </div>
        <div class="control">
          <div class="tags has-addons">
            <h2 class="tag is-link p-2" style="font-size:20px">
              {{ this.$store.state.records.totalCut }} ₹
            </h2>
          </div>
        </div>
        <div class="control">
          <div class="tags has-addons">
            <h2 class="tag is-link p-2" style="font-size:20px">
              {{ today }}
            </h2>
          </div>
        </div>
        <div class="control">
          <div class="tags has-addons">
            <input
              class="input"
              type="month"
              v-model="timeStamp"
              @change="getMonth"
            />
          </div>
        </div>
        <div class="control">
          <div class="tags has-addons">
            <button
              class="button is-primary is-rounded"
              style="color:black"
              @click="fetchData($route.params.id, this.month, this.year)"
            >
              Refresh
            </button>
          </div>
        </div>
        <div class="control">
          <div class="tags has-addons">
            <router-link
              :to="s1+s2+'/'+s3"
              class="button is-rounded"
              style="background: #F67280;color:white;border:none"
              @click="fetchData($route.params.id, this.month, this.year)"
              >Print</router-link
            >
          </div>
        </div>
      </div>
    </h3>
    <table
      class="table ml-auto mr-auto"
      style="width:80vh;background:transparent;margin-top:30px"
      v-if="this.$store.state.records.recordsArray.length != 0"
    >
      <thead>
        <tr>
          <th style="color:#25d1b2">Date</th>
          <th style="color:#25d1b2">Patient Name</th>
          <th style="color:#25d1b2">Diagnosis of</th>
          <th style="color:#25d1b2">Total</th>
          <th style="color:#25d1b2">Action</th>
        </tr>
      </thead>
      <tfoot>
        <tr>
          <th></th>
          <th></th>
          <th>Total</th>
          <th>{{ this.$store.state.records.totalCut }} ₹</th>
          <th></th>
        </tr>
      </tfoot>
      <tbody>
        <tr
          v-for="payment in this.$store.state.records.recordsArray"
          :key="payment.patientName"
        >
          <td style="color:#25d1b2">
            {{ payment.date }}
          </td>
          <td style="color:#25d1b2">
            {{ payment.patientName }}
          </td>
          <td style="color:#25d1b2">
            {{ payment.purpose }}
          </td>
          <td style="color:#25d1b2">
            {{ payment.cut }}
          </td>
          <td>
            <a style="color:red" @click="activateDeleteModal">delete</a>
            <deletePayment
              :id="payment.id"
              :name="payment.patientName"
              :docName="payment.refBy"
              :month="month"
              :year="year"
              :payload="payment.id"
              type="records/deleteRecord"
              befName="Patient"
              befId="Record"
              title="Delete Payment Record"
            ></deletePayment>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="container" v-else>
      <div class="columns">
        <div class="column">
          <img src="../../assets/noInfo.gif" width="480" height="480" />
        </div>
        <div class="column">
          <h3
            style="text-align:center;font-size:40px;color:#25d1b2"
            class="mt-5"
          >
            No Data Available
          </h3>
          <button
            class="button is-link is-rounded mt-5"
            style="margin-left:40%"
            @click="fetchData($route.params.id, this.month, this.year)"
          >
            Refresh
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import deletePayment from "../layouts/deleteModal";
export default {
  components: {
    deletePayment,
  },
  data() {
    return {
      s1:'/printPage/',
      s2:this.$route.params.id,
      s3:'',
      monthsMap: {
        "01": "1",
        "02": "2",
        "03": "3",
        "04": "4",
        "05": "5",
        "06": "6",
        "07": "7",
        "08": "8",
        "09": "9",
        "10": "10",
        "11": "11",
        "12": "12",
      },
      engMonths: {
        "0": "Jan",
        "1": "Feb",
        "2": "Mar",
        "3": "Apr",
        "4": "May",
        "5": "Jun",
        "6": "July",
        "7": "Aug",
        "8": "Sept",
        "9": "Oct",
        "10": "Nov",
        "11": "Dec",
      },
      month: "",
      year: "",
      today: "",
      docName: this.$route.params.id,
      total: 0,
    };
  },
  created() {
    var today = new Date();
    this.month = (today.getMonth() + 1).toString();
    this.year = today.getFullYear().toString();
    this.today = this.engMonths[today.getMonth().toString()] + " " + this.year;
    this.s3 = this.today;
    this.fetchData(this.$route.params.id, this.month, this.year);
  },

  methods: {
    fetchData(docName, month, year) {
      this.$store.dispatch({
        type: "records/fetchPayments",
        payload: {
          docName: docName,
          month: month,
          year: year,
        },
      });
    },

    getMonth() {
      this.total = this.$store.state.records.totalCut;
      this.month = this.monthsMap[this.timeStamp.slice(5, 7)];
      this.year = this.timeStamp.slice(0, 4);
      this.today =
        this.engMonths[(parseInt(this.timeStamp.slice(5, 7)) - 1).toString()] +
        " " +
        this.year;
      this.fetchData(this.$route.params.id, this.month, this.year);
    },

    activateDeleteModal() {
      this.$store.state.activateDeleteModal = true;
    },
  },
};
</script>
