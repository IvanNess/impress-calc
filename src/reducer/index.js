const init ={
    calc:{
        wannaTypes: [
            {
                name: 'Поясняющий',
                stringCode: 'explain'
            },
            {
                name: 'Обучающий',
                stringCode: 'learning'
            },
            {
                name: 'Рекламный',
                stringCode: 'adVideo'
            },
            {
                name: 'Презентационный',
                stringCode: 'presentation'
            },
            {
                name: 'Видеоблог/видеоконтент',
                stringCode: 'vblog'
            },
            {
                name: 'Другое',
                stringCode: 'other'
            }
        ],
    
        auxTypes: [
            {
                name: 'Анимационный',
                stringCode: 'animation'
            },
            {
                name: 'Игровой',
                stringCode: 'play'
            },
            {
                name: 'На основе захватов экрана',
                stringCode: 'screen'
            },
            {
                name: 'Комбинированный',
                stringCode: 'combine'
            },
        ],

        budgetTypes: [
            {
                name: 'Хочу узнать стандартную стоимость',
                stringCode: 'standart'
            },
            {
                name: 'Нужен самый бюджетный вариант',
                stringCode: 'budget'
            },
            {
                name: 'Нужен ролик самого высокого качества',
                stringCode: 'high'
            },
            {
                name: 'У меня горящие сроки',
                stringCode: 'time'
            },            
        ],

        serviceTypes: [
            {
                name: 'Сценарий на русском языке',
                stringCode: 'rusScenario',
                auxTypes: ['animation',]
            },
            {
                name: 'Сценарий на иностранном языке',
                stringCode: 'scenario',
                auxTypes: ['animation',]

            },
            {
                name: 'Дизайн кадров',
                stringCode: 'design',
                auxTypes: ['animation',]

            },
            {
                name: '2д анимация',
                stringCode: 'dd',
                auxTypes: ['animation',]

            },
            {
                name: '3д анимация',
                stringCode: 'ddd',
                auxTypes: ['animation',]

            },
            {
                name: 'Дикторская озвучка на русском языке',
                stringCode: 'rusDubbing',
                auxTypes: ['animation',]

            },
            {
                name: 'Дикторская озвучка на иностранном языке',
                stringCode: 'dubbing',
                auxTypes: ['animation',]

            },
            {
                name: 'Лицензионная музыка',
                stringCode: 'license',
                auxTypes: ['animation',],
                //auxPanel: ['штук']
                auxPanel: {
                    params: ['track'],
                    chosen: 'track',
                    open: false,
                    types: {
                        track: {
                            name: 'треков',
                            stringCode: 'track',
                        }
                    }
                }
            },
            {
                name: 'Использование готовых видеофутажей или шаблонов',
                stringCode: 'footages',
                auxTypes: ['play',],
                auxPanel: {
                    params: ['item', 'sec'],
                    chosen: 'item',
                    open: false,
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
                name: 'Музыка и звуковые эффекты',
                stringCode: 'sounds',
                auxTypes: ['animation',]

            }, 
        ],

        clicked: {
            wannaTypes: [],
            auxTypes: [],
            budgetTypes: [],
            serviceTypes: []
        },

        auxPanels: {
            show: [],
            hide: [],
        }
    }
}

const deleteFromArr = (arr, stringItem) =>{
    const idx = arr.findIndex(item=>item===stringItem)
    return [
        ...arr.slice(0, idx),
        ...arr.slice(idx + 1)
    ]
}

const reducer = (state = init, {type, payload})=>{
    console.log(type, payload, state)

    switch(type){
        case 'TYPE_CLICKED':

            let newClicked
            let newAuxPanels

            if(payload.typePanel==='budgetTypes'){
                const budgetTypes = state.calc.clicked.budgetTypes
                newClicked = budgetTypes.includes('time') 
                ? 
                    payload.stringCode==='time' ? deleteFromArr(budgetTypes, 'time'): ['time', payload.stringCode]
                :
                    payload.stringCode==='time' ? [...budgetTypes, 'time']: [payload.stringCode]
            } else if(payload.typePanel==='serviceTypes'){
                console.log('service types')
                const serviceTypes = state.calc.clicked.serviceTypes
                const serviceType = state.calc.serviceTypes.find(serviceType=>serviceType.stringCode===payload.stringCode)
                if(serviceTypes.includes(payload.stringCode)){
                    newClicked = deleteFromArr(serviceTypes, payload.stringCode)
                    //serviceType.auxPanel.open = false
                } else{
                    newClicked = [...serviceTypes, payload.stringCode]
                    // newAuxPanels = serviceType.auxPanel && !state.calc.auxPanels.includes(serviceType.stringCode)
                    //     ? [...state.calc.auxPanels.show, serviceType.stringCode]
                    //     : state.calc.auxPanels
                }

            } else{
                newClicked = state.calc.clicked[payload.typePanel] === payload.stringCode ? [] : [payload.stringCode]
            }           
            
            return{
                ...state,
                    calc:{
                        ...state.calc,
                        clicked: {
                            ...state.calc.clicked,
                            [payload.typePanel]: newClicked
                        }
                    }
            }
        
        case 'SET_CHOSEN':

            const serviceTypeIdx = state.calc.serviceTypes.findIndex(type=>type.stringCode===payload.stringCode)
            const newServiceType = {...state.calc.serviceTypes[serviceTypeIdx]}
            newServiceType.auxPanel.chosen = payload.param
            newServiceType.auxPanel.open = false
            
            return{
                ...state,
                    calc:{
                        ...state.calc,
                        serviceTypes: [
                            ...state.calc.serviceTypes.slice(0, serviceTypeIdx),
                            {...newServiceType},
                            ...state.calc.serviceTypes.slice(serviceTypeIdx + 1)
                        ]
                    }
            }

            case 'SET_AUX_OPEN':

            console.log('SET_AUX)OPEN')
            const idx = state.calc.serviceTypes.findIndex(type=>type.stringCode===payload.stringCode)
            const newType = {...state.calc.serviceTypes[idx]}
            newType.auxPanel.open = !newType.auxPanel.open
            console.log(newType.auxPanel.open)
            
            return{
                ...state,
                    calc:{
                        ...state.calc,
                        serviceTypes: [
                            ...state.calc.serviceTypes.slice(0, idx),
                            {...newType},
                            ...state.calc.serviceTypes.slice(idx + 1)
                        ]
                    }
            }

        default: 
            return state
    }
}

export default reducer