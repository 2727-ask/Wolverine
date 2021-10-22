import { createStore } from 'vuex';
import displayModule from './modules/displayModule/index.js';
import addDoctor from './modules/addDoctor/index.js'
import facilities from './modules/facilities/index.js'


const store = createStore({
    namespaced: true,
    state:{
        logs:[],
        activateModal:false
    },
    modules:{
        displayModule:displayModule,
        addDoctor:addDoctor,
        facilities:facilities

    },
})

export default store;