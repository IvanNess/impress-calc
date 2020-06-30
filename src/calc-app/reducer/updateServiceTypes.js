const resetChronoTypes = (newTypes, state)=>{
    const nomoreminIdx = state.calc.serviceTypes.findIndex(type=>type.stringCode==='nomoremin')
    const nomoresecIdx = state.calc.serviceTypes.findIndex(type=>type.stringCode==='nomoresec')
    const nomoremin = newTypes[nomoreminIdx]
    const nomoresec = newTypes[nomoresecIdx]
    if(['', 0].includes(nomoremin.auxPanel.value) && ['', 0].includes(nomoresec.auxPanel.value)){
        newTypes[nomoreminIdx].auxPanel.value = ''
    }
}

const updateNewTypesWithFocused = (newTypes, state) =>{
    const nomoreminIdx = state.calc.serviceTypes.findIndex(type=>type.stringCode==='nomoremin')
    const nomoresecIdx = state.calc.serviceTypes.findIndex(type=>type.stringCode==='nomoresec')
    const nomoremin = newTypes[nomoreminIdx]
    const nomoresec = newTypes[nomoresecIdx]
    if(['', 0].includes(nomoremin.auxPanel.value) && ['', 0].includes(nomoresec.auxPanel.value)){
        newTypes[nomoreminIdx].auxPanel.value = ''
        newTypes[nomoreminIdx].auxPanel.focused = true
    } else{
        state.calc.clicked.serviceTypes.some(typeName=>{
            console.log('SOME', state.calc.clicked.serviceTypes)
            const type = newTypes.find(type=>type.stringCode===typeName)
            if( type.auxPanel && ['', 0].includes(type.auxPanel.value)){
                console.log('FOCUSED_TYPE', type)
                type.auxPanel.focused = true
                return true
            }
            return false
        })
    }
    return [...newTypes]
}

const updateServiceTypes = (state, {type, payload})=>{

    if(state===undefined){
        return[
            {
                name: 'Сценарий',
                stringCode: 'scenario',
                languageTypes: ['rus', 'eng'],
                auxTypes: ['animation', 'screen', 'play', 'combine'],
                error: false
            },
            {
                name: 'Сценарий на русском языке',
                stringCode: 'rusScenario',
                languageTypes: ['both',],
                auxTypes: ['animation', 'screen', 'play', 'combine'],
                error: false
            },
            {
                name: 'Сценарий на иностранном языке',
                stringCode: 'engScenario',
                languageTypes: ['both',],
                auxTypes: ['animation', 'screen', 'play', 'combine'],
                error: false
            },
            {
                name: 'Захват экрана',
                stringCode: 'capture',
                auxTypes: ['screen', 'combine'],
                error: false
            },
            {
                name: '2д анимация',
                stringCode: 'dd',
                auxTypes: ['animation', 'combine'],
                error: false
            }, 
            {
                name: '3д анимация',
                stringCode: 'ddd',
                auxTypes: ['animation', 'combine'],
                error: false,
            },
            {
                name: 'Видеосъемка',
                stringCode: 'filming',
                auxTypes: ['play', 'combine'],
                connected: ['actors', 'location'],
                error: false,
                auxPanel: {
                    params: ['day'],
                    chosen: 'day',
                    open: false,
                    value: '',
                    error: false,
                    focused: false,
                    types: {
                        day: {
                            name: 'съемочных дней',
                            stringCode: 'day',
                        }
                    }
                }
            },
            {
                name: 'Видеомонтаж и базовая анимация захватов',
                stringCode: 'captureEdit',
                auxTypes: ['screen',],
                error: false,
                auxPanel: {
                    params: ['min',],
                    chosen: 'min',
                    open: false,
                    value: '',
                    focused: false,
                    types: {
                        min: {
                            name: 'мин',
                            stringCode: 'min',
                        }
                    }
                }
            }, 
            {
                name: 'Видеомонтаж и базовая анимация',
                stringCode: 'edit',
                auxTypes: ['play', 'combine'],
                error: false,
                auxPanel: {
                    params: ['sec',],
                    chosen: 'sec',
                    open: false,
                    value: '',
                    focused: false,
                    types: {
                        sec: {
                            name: 'сек',
                            stringCode: 'sec',
                        }
                    }
                }
            }, 
            {
                name: 'Модели, актеры',
                stringCode: 'actors',
                auxTypes: ['play', 'combine'],
                open: 'hide',
                error: false,
                auxPanel: {
                    params: ['actors'],
                    chosen: 'actors',
                    open: false,
                    value: '',
                    focused: false,
                    types: {
                        actors: {
                            name: 'чел.',
                            stringCode: 'actors',
                        }
                    }
                },
            },
            {
                name: 'Локация для съемок(аренда студии, офиса, квартиры для съемок)',
                stringCode: 'location',
                auxTypes: ['play', 'combine'],
                open: 'hide',
                error: false,
            },
            {
                name: 'Дизайн кадров',
                stringCode: 'design',
                auxTypes: ['animation',],
                error: false
            },
            {
                name: 'Дикторская озвучка',
                stringCode: 'dubbing',
                auxTypes: ['animation', 'screen', 'play', 'combine'],
                languageTypes: ['rus',],
                error: false
            },
            {
                name: 'Дикторская озвучка на русском/белорусском языке',
                stringCode: 'rusDubbing',
                auxTypes: ['animation', 'screen', 'play', 'combine'],
                languageTypes: ['both'],
                error: false
            },
            {
                name: 'Дикторская озвучка носителем языка',
                stringCode: 'engDubbing',
                auxTypes: ['animation', 'screen', 'play', 'combine'],
                languageTypes: ['eng'],
                error: false
            },
            {
                name: 'Дикторская озвучка на иностранном языке(носителем языка)',
                stringCode: 'engBothDubbing',
                auxTypes: ['animation', 'screen', 'play', 'combine'],
                languageTypes: ['both'],
                error: false
            },
            {
                name: 'Лицензионная музыка',
                stringCode: 'license',
                auxTypes: ['animation', 'screen', 'play', 'combine'],
                error: false,
                auxPanel: {
                    params: ['track'],
                    chosen: 'track',
                    open: false,
                    value: '',
                    focused: false,
                    types: {
                        track: {
                            name: 'треков',
                            stringCode: 'track',
                        }
                    }
                }
            },
            {
                name: 'Звуковые эффекты',
                stringCode: 'sounds',
                auxTypes: ['animation', 'screen', 'play', 'combine'],
                error: false,
                auxPanel: {
                    params: ['min',],
                    chosen: 'min',
                    open: false,
                    value: '',
                    focused: false,
                    types: {
                        min: {
                            name: 'мин',
                            stringCode: 'min',
                        }
                    }
                }
            }, 
            {
                name: 'Использование готовых видеофутажей или шаблонов',
                stringCode: 'footages',
                auxTypes: ['play', 'combine'],
                error: false,
                auxPanel: {
                    params: ['item', 'sec'],
                    chosen: 'item',
                    open: false,
                    value: '',
                    focused: false,
                    types: {
                        item: {
                            name: 'штук',
                            stringCode: 'item',
                        },
                        sec: {
                            name: 'сек',
                            stringCode: 'sec'
                        }
                    }
                }
            },
            {
                name: 'Графика',
                stringCode: 'graph',
                auxTypes: ['animation', 'screen', 'play'],
                error: false,
                auxPanel: {
                    params: ['sec',],
                    chosen: 'sec',
                    open: false,
                    value: '',
                    focused: false,
                    types: {
                        sec: {
                            name: 'сек',
                            stringCode: 'sec',
                        }
                    }
                }
            }, 
            {
                name: 'Не более мин',
                stringCode: 'nomoremin',
                auxTypes: [],
                error: false,
                auxPanel: {
                    params: ['min',],
                    chosen: 'min',
                    open: false,
                    focused: true,
                    value: '',
                    types: {
                        min: {
                            name: 'мин',
                            stringCode: 'min',
                        }
                    }
                }
            }, 
            {
                name: 'Не более сек',
                stringCode: 'nomoresec',
                auxTypes: [],
                error: false,
                auxPanel: {
                    params: ['sec',],
                    chosen: 'sec',
                    open: false,
                    value: '',
                    types: {
                        sec: {
                            name: 'сек',
                            stringCode: 'sec',
                        }
                    }
                }
            }, 
        ]
    }

    let idx
    let newType
    let newTypes

    switch(type){ 
        case 'SHOW_ERRORS': 
            newTypes = [...state.calc.serviceTypes]
            newTypes.forEach(type=>{
                if(['nomoremin', 'nomoresec'].includes(type.stringCode)){
                    type.error = payload.errorParts.includes('chrono')? true: false
                } else{
                    type.error = payload.errorParts.includes('serviceTypes')? true: false
                }
            })
            console.log('SHOW_ERRORS', newTypes, payload)
            return newTypes
        
        case 'SET_CHOSEN':

            const serviceTypeIdx = state.calc.serviceTypes.findIndex(type=>type.stringCode===payload.stringCode)
            const newServiceType = {...state.calc.serviceTypes[serviceTypeIdx]}
            newServiceType.auxPanel.chosen = payload.param
            newServiceType.auxPanel.open = false
            
            return[
                ...state.calc.serviceTypes.slice(0, serviceTypeIdx),
                {...newServiceType},
                ...state.calc.serviceTypes.slice(serviceTypeIdx + 1)
            ]
            

        case 'SET_AUX_OPEN':

        console.log('SET_AUX_OPEN')
        idx = state.calc.serviceTypes.findIndex(type=>type.stringCode===payload.stringCode)
        newType = {...state.calc.serviceTypes[idx]}
        newType.auxPanel.open = !newType.auxPanel.open
        
        console.log(newType)

        return[
            ...state.calc.serviceTypes.slice(0, idx),
            {...newType},
            ...state.calc.serviceTypes.slice(idx + 1)
        ]

        case 'SET_UNFOCUSED':
            console.log('SET_UNFOCUSED')
            newTypes = [...state.calc.serviceTypes]
            idx = newTypes.findIndex(type=>type.stringCode==='nomoremin')
            newType = newTypes[idx]
            newType.auxPanel.focused = false
            newTypes.forEach(type=>{
                if(type.auxPanel)
                    type.auxPanel.focused = false
            })
                
            return[
                ...state.calc.serviceTypes.slice(0, idx),
                {...newType},
                ...state.calc.serviceTypes.slice(idx + 1)
            ]
        case 'TYPE_CLICKED':

            console.log('TYPE_CLICKED', payload.typePanel, payload.stringCode, state.calc.clicked.auxTypes[0])
            newTypes = [...state.calc.serviceTypes]

            if(payload.typePanel==='serviceTypes'){
                idx = state.calc.serviceTypes.findIndex(type=>type.stringCode===payload.stringCode)
                newType = {...state.calc.serviceTypes[idx]}

                if(newType.auxPanel){
                    newType.auxPanel.open = false
                    if(state.calc.clicked.serviceTypes.includes(payload.stringCode)){
                        newType.auxPanel.value = ''
                    } else{
                        newType.auxPanel.focused = true
                        console.log('APPLY FOCUS', newType)
                        resetChronoTypes(newTypes, state)
                    }
                    newTypes = [
                        ...state.calc.serviceTypes.slice(0, idx),
                        {...newType},
                        ...state.calc.serviceTypes.slice(idx + 1)
                    ]
                } else{
                    console.log('CASE 1')
                    newTypes = updateNewTypesWithFocused(newTypes, state)
                }
                if(newType.connected){
                    console.log('CASE 2')
                    //newTypes = updateNewTypesWithFocused(newTypes, state)

                    const newTypesCopy = [...newTypes]

                    const open = state.calc.clicked.serviceTypes.includes(newType.stringCode)? 'hide': true

                    newType.connected.forEach(connected=>{
                        const connectedType = newTypesCopy.find(type=>type.stringCode===connected)
                        connectedType.open = open
                        if(connectedType.auxPanel){
                            connectedType.auxPanel.value = open? '': connectedType.auxPanel.value
                        }
                    })
                    newTypes = newTypesCopy
                }
                
                newTypes.forEach(type=>{
                    if(!['nomoremin', 'nomoresec'].includes(type.stringCode))
                        type.error=false
                })
                
                return newTypes
            }


            if(payload.typePanel==='auxTypes' && state.calc.clicked.auxTypes[0] !== payload.stringCode){
                console.log('IN', state.calc.clicked.auxTypes[0] !== payload.stringCode)
                newTypes = updateNewTypesWithFocused(newTypes, state)
                newTypes.forEach(type=>{
                    if(!['nomoremin', 'nomoresec'].includes(type.stringCode) && type.auxPanel){
                        type.auxPanel.value = ''
                    }
                })

                const copy = [...newTypes]
                copy.forEach(type=>{
                    if(type.connected){
                            type.connected.forEach(connected=>{
                            const connectedType = copy.find(copyType=>copyType.stringCode===connected)
                            connectedType.open = 'hide'
                        })
                    }
                })
                
                return copy
            }

            newTypes = updateNewTypesWithFocused(newTypes, state)
            return newTypes


        case 'CALC_APP_CLICKED':
            console.log('CALC_APP_CLICKED')
            let newServiceTypes = [...state.calc.serviceTypes]
            newServiceTypes.forEach(serviceType=>{
                if(serviceType.auxPanel){
                    serviceType.auxPanel.open = false
                }
            })
            console.log(newServiceTypes)
            if(!payload || !payload.isInput){
                console.log('NO_INPUT')
                newServiceTypes=updateNewTypesWithFocused(newServiceTypes, state)
                //console.log(newServiceTypes)
            }
            return newServiceTypes
        
        case 'SET_VALUE':
            console.log('SET_VALUE', payload.value, parseInt(payload.value))
            idx = state.calc.serviceTypes.findIndex(type=>type.stringCode===payload.stringCode)
            
            if(idx!==-1){
                newTypes = [...state.calc.serviceTypes]
                newType = newTypes[idx]
                newType.auxPanel.value = parseInt(payload.value)===0? 0: parseInt(payload.value) || ''
                
                if(![0, ''].includes(newType.auxPanel.value)){
                    if(!['nomoremin', 'nomoresec'].includes(payload.stringCode)){
                        newTypes.forEach(type=>{
                            type.error = !['nomoremin', 'nomoresec'].includes(type.stringCode)? false: type.error
                        })
                    } else{
                        newTypes.forEach(type=>{
                            type.error = ['nomoremin', 'nomoresec'].includes(type.stringCode)? false: type.error
                        })
                    }
                }

                return newTypes
            }
        
        default: 
            return state.calc.serviceTypes
    }


}

export default updateServiceTypes