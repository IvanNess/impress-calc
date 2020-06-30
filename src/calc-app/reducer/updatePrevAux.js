const updatePrevAux = (state, {type, payload}) =>{
    if(state===undefined){
        return{
            undefined
        }
    }
    switch(type){
        case 'TYPE_CLICKED':
            if(payload.typePanel === 'auxTypes'){
                return state.calc.clicked.auxTypes[0]
            }
            
        default:
            return state.calc.prevAuxType
    }
}

export default updatePrevAux