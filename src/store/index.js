import { createStore } from 'vuex';
import displayModule from './modules/displayModule/index.js';
import addDoctor from './modules/addDoctor/index.js';
import facilities from './modules/facilities/index.js';
import records from './modules/Records/index.js';
import authentication from './modules/Authentication/index';



const store = createStore({
    namespaced: true,
    state:{
        logs:[],
        activateModal:false,
        activateDeleteModal:false,
        addingRecord:false,
        conStatus:true,
        isAuthenticated:false,
        userName:null,
    },
    modules:{
        displayModule:displayModule,
        addDoctor:addDoctor,
        facilities:facilities,
        records:records,
        authentication:authentication
    },
})

export default store;