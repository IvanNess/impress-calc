const deleteFromArr = (arr, stringItem) =>{
    const idx = arr.findIndex(item=>item===stringItem)
    if(idx===-1)
        return arr
    return [
        ...arr.slice(0, idx),
        ...arr.slice(idx + 1)
    ]
}

const getFormErrors = (calc)=>{
    console.log('calc', calc)
    let errorParts = []

    const nomoremin = calc.serviceTypes.find(type => type.stringCode === 'nomoremin')
    const nomoresec = calc.serviceTypes.find(type => type.stringCode === 'nomoresec')

    if (calc.clicked.wannaTypes.length === 0) {
        errorParts.push('wannaTypes')
    }
    if (['', 0].includes(nomoremin.auxPanel.value) && ['', 0].includes(nomoresec.auxPanel.value)) {
        errorParts.push('chrono')
    }
    if (calc.clicked.languageTypes.length === 0) {
        errorParts.push('languageTypes')
    }
    if (calc.clicked.auxTypes.length === 0) {
        errorParts.push('auxTypes')
    }

    const noServiceTypesErrors = calc.clicked.serviceTypes.some(stringCode=>{
        const type = calc.serviceTypes.find(type=>{
            return type.stringCode===stringCode
        })
        return(
            !type.auxPanel ? true : 
                ![0, ''].includes(type.auxPanel.value)? true: false   
        )
    })

    if ((calc.clicked.serviceTypes.length === 0 || !noServiceTypesErrors) && calc.clicked.auxTypes.length !== 0 ) {
        errorParts.push('serviceTypes')
    }

    const email = calc.connectTypes.find(type => type.stringCode === 'email')
    const messengers = calc.connectTypes.find(type => type.stringCode === 'messengers')

    const emptyFields = calc.connectTypes.every(type => {
        console.log(type.value)
        return type.value === ''
    })

    const wrongEmail = !email.value.includes('@')

    let messengersDigitQuantity = 0
    for (let index = 0; index < messengers.value.length; index++) {
        const element = messengers.value[index];
        if ('0123456789'.includes(element))
            messengersDigitQuantity++
    }
    //const wrongMessengers = !messengers.value.includes('@') && messengersDigitQuantity <= 6
    const wrongMessengers = messengers.value === ''

    console.log(errorParts.length,  !emptyFields, !wrongEmail, !wrongMessengers)

    if (errorParts.length === 0 && !emptyFields && (!wrongEmail || !wrongMessengers))
        return {
            show: false,
            errorParts: [],
            contactErrors: { emptyFields: false, wrongEmail: false, wrongMessengers: false }
        }

    return {
        show: true,
        errorParts,
        contactErrors: { emptyFields, wrongEmail, wrongMessengers }
    }
}

const getNewTypes = (state, {type, payload}, typeName)=>{
    let newTypes = [...state.calc[typeName]]
    switch(type){
        case 'SHOW_ERRORS': 
            if(state.calc.clicked[typeName].length===0){
                newTypes.forEach(type=>type.error=true)
            }
            return newTypes
        case 'TYPE_CLICKED':
            if(payload.typePanel===typeName){
                newTypes.forEach(type=>type.error=false)
            }
            return newTypes
        default:
            return state.calc[typeName]        
    }
}

const onCountClick = (calc, doFetch, showErrors, appClicked, isLoading)=>{
    if(isLoading){
        return
    }
    const {show, errorParts, contactErrors} = getFormErrors(calc)
    console.log({show, errorParts, contactErrors})
    if(!show){
        console.log('do fetch...')
        doFetch()
    } else{
        console.log('open window')
        // openWindow({show, errorParts, contactErrors})
        // e.stopPropagation()
        showErrors({show, errorParts, contactErrors})
        appClicked()
    }
}

export {
    deleteFromArr,
    getFormErrors,
    getNewTypes,
    onCountClick
}