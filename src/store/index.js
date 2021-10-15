import { createStore } from 'vuex';

const store = createStore({
    state() {
        return {
            displayColor: 'white',
            displayModeName: 'Light',
        }
    },
    mutations: {
        changeDisplayMode(state) {
            if (state.displayModeName === 'Light') {
                state.displayColor = 'black',
                state.displayModeName = 'Dark'
            }else{
                state.displayColor = 'white',
                state.displayModeName = 'Light'
            }
        }
    }
})

export default store;