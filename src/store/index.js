import { createStore } from 'vuex';
import displayModule from './modules/displayModule/index.js';
import addDoctor from './modules/addDoctor/index.js'


const store = createStore({
    namespaced: true,
    state:{
        logs:[]
    },
    modules:{
        displayModule:displayModule,
        addDoctor:addDoctor
    },
})

export default store;