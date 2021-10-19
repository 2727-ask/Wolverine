export default{
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