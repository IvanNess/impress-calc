const updateShowApp = (state, {type, payload})=>{
    if(state===undefined){
        return true
    }

    switch(type){
        case 'SHOW_CALC_APP':
            console.log('OUTSIDE')
            return true
        case 'OUTSIDE_CALC_APP_CLICKED':
            return false
        default: 
            return state.calc.showApp
    }
}

export default updateShowApp