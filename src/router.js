import {createRouter, createWebHistory} from 'vue-router';
import NewRecord from './components/Forms/NewRecord.vue';
import NewDoctor from './components/Forms/NewDoctor.vue';
import UpdateDoctor from './components/Forms/UpdateDoctor.vue';
const router = createRouter({
    history:createWebHistory(),
    routes:[
        {path:'/',redirect:'/newrecord'},
        {path:'/newrecord',component:NewRecord},
        {path:'/newdoctor',component:NewDoctor},
        {path:'/updatedoctor/:id',component:UpdateDoctor}
    ]
});

export default router; 