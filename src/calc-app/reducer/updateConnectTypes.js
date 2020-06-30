import {deleteFromArr} from '../utils'

const updateFocused = (state, payload)=>{
    
    const nomoremin = state.calc.serviceTypes.find(type=>type.stringCode==='nomoremin')
    const nomoresec = state.calc.serviceTypes.find(type=>type.stringCode==='nomoresec')
    const isChronoNotFocused =  ![0,''].includes(nomoremin.auxPanel.value) || ![0,''].includes(nomoresec.auxPanel.value)

    let newClicked = [...state.calc.clicked.serviceTypes]
    if(payload && payload.typePanel==='serviceTypes'){
        if(newClicked.includes(payload.stringCode)){
            //отжатие
            newClicked = deleteFromArr(newClicked, payload.stringCode)
        } else{
            newClicked.push(payload.stringCode)
        }
    }

    const isServiceTypesNotFocused = !state.calc.serviceTypes.some(type=>{
        return newClicked.includes(type.stringCode) && type.auxPanel && ['', 0].includes(type.auxPanel.value)
    })

    let newConnectTypes = [...state.calc.connectTypes]
    const email = newConnectTypes.find(type=>type.stringCode==='email')
    const messengers = newConnectTypes.find(type=>type.stringCode==='messengers')
    if(isChronoNotFocused && isServiceTypesNotFocused){
        email.focused = true
    }else{
        email.focused = false
    }
    console.log('UPDATE_FOCUSED', newConnectTypes, isChronoNotFocused, isServiceTypesNotFocused)
    return newConnectTypes
}

const updateConnectTypes = (state, {type, payload}) =>{
    if(state===undefined)
        return [
            {
                name: 'email',
                stringCode: 'email',
                error: false,
                value: '',
                focused: false,
                placeholder: 'e-mail',
            },
            {
                name: 'messengers',
                stringCode: 'messengers',
                error: false,
                value: '',
                focused: false,
                placeholder: 'Телефон/мессенджер',
            }
        ]

    let idx
    let newType
    let newTypes = [...state.calc.connectTypes]
    
    switch(type){
        case 'TYPE_CLICKED':
        case 'CALC_APP_CLICKED':
            if(payload && payload.isInput){
                return newTypes
            }
            return updateFocused(state, payload)

        case 'SET_UNFOCUSED_CONNECT':
            console.log('SET_UNFOCUSED_CONNECT')
            const emailType = newTypes.find(type=>type.stringCode==='email')
            emailType.focused = false
            return newTypes

        case 'SHOW_ERRORS':
            newTypes = updateFocused(state,payload)
            const {contactErrors: { emptyFields, wrongEmail, wrongMessengers }} = payload
            console.log('SHOW_ERRORS', emptyFields, wrongEmail, wrongMessengers)
            const email = newTypes.find(type=>type.stringCode==='email')
            email.error = emptyFields || (wrongEmail && wrongMessengers) ? true: false 
            const messengers = newTypes.find(type=>type.stringCode==='messengers')
            messengers.error = emptyFields || (wrongMessengers && wrongEmail) ? true: false 
            return newTypes

        case 'SET_VALUE':
            console.log('SET_VALUE', payload.value, payload.stringCode, state.calc.connectTypes)
            idx = state.calc.connectTypes.findIndex(type=>type.stringCode===payload.stringCode)
            if(idx!==-1){ 
                newType = newTypes[idx]
                newType.value = payload.value
                newTypes.forEach(type=>type.error=false)
                console.log('newType', newType)
                return[
                    ...state.calc.connectTypes.slice(0, idx),
                    {...newType},
                    ...state.calc.connectTypes.slice(idx + 1)
            ]}
            
        default:
            return state.calc.connectTypes
    }
}

export default updateConnectTypes