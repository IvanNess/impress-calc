const updatePrevLanguage = (state, {type, payload})=>{
    if(state===undefined){
        return undefined
    }
    switch(type){
        case 'TYPE_CLICKED':
            if(payload.typePanel === 'languageTypes'){
                return state.calc.clicked.languageTypes[0]
            }
        default:
            return state.calc.prevLanguageType
    }
}

export default updatePrevLanguage