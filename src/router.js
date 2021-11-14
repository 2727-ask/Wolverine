import {createRouter, createWebHistory} from 'vue-router';
import NewRecord from './components/Forms/NewRecord.vue';
import NewDoctor from './components/Forms/NewDoctor.vue';
import UpdateDoctor from './components/Forms/UpdateDoctor.vue';
import Facilities from './components/Facilities/Facilties.vue';
import Settings from './components/Settings/Settings.vue';
import Payments from './components/Payments/doctorsList.vue';
import EditFacility from './components/Facilities/editFacility.vue'
import DetailPayments from './components/Payments/detailedPayment.vue';
import printPage from './components/layouts/printPage.vue';
import updatePayment from './components/Payments/updatePayment.vue';
import login from './components/Forms/login.vue';
const router = createRouter({
    history:createWebHistory(),
    routes:[
        {path:'/',redirect:'/newrecord'},
        {path:'/login',component:login},
        {path:'/newrecord',component:NewRecord},
        {path:'/newdoctor',component:NewDoctor},
        {path:'/facilities',component:Facilities},
        {path:'/updatedoctor/:id',component:UpdateDoctor},
        {path:'/settings',component:Settings},
        {path:'/payments',component:Payments},
        {path:'/printPage/:name/:date',component:printPage},
        {path:'/detailedPayments/:id',component:DetailPayments},
        {path:'/editFacility/:id',component:EditFacility},
        {path:'/updatePayment/:id/:docName/:year/:mon/:patName/:purpose/',component:updatePayment}
    ]
});

export default router; 