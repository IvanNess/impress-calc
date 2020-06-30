import updateClicked from './updateClicked'
import updateServiceTypes from './updateServiceTypes'
import updateConnectTypes from './updateConnectTypes'
import updatePrevAux from './updatePrevAux'
import updateModalWindow from './updateModalWindow'
import updateFetch from './updateFetch'
import updatePrevLanguage from './updatePrevLanguage'
import updateWannaTypes from './updateWannaTypes'
import updateAuxTypes from './updateAuxTypes'
import updateLanguageTypes from './updateLanguageTypes'
import updateShowApp from './updateShowApp'

const init ={
    calc:{
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
    }
}

const reducer = (state, action)=>{

    return{
        ...state,
        calc: {
            showApp: updateShowApp(state, action),
            wannaTypes: updateWannaTypes(state, action),
            languageTypes: updateLanguageTypes(state, action),
            auxTypes: updateAuxTypes(state, action),
            budgetTypes: init.calc.budgetTypes,
            serviceTypes: [...updateServiceTypes(state, action)], 
            connectTypes: [...updateConnectTypes(state, action)],
            clicked: {...updateClicked(state, action)},
            prevAuxType: updatePrevAux(state, action),
            prevLanguageType: updatePrevLanguage(state, action),
            modalWindow: {...updateModalWindow(state, action)},
            fetch: {...updateFetch(state, action)}
        }
    }
    // console.log(type, payload, state)

    // switch(type){
    //     case 'TYPE_CLICKED':

    //         let newClicked
    //         let newAuxPanels

    //         if(payload.typePanel==='budgetTypes'){
    //             const budgetTypes = state.calc.clicked.budgetTypes
    //             newClicked = budgetTypes.includes('time') 
    //             ? 
    //                 payload.stringCode==='time' ? deleteFromArr(budgetTypes, 'time'): ['time', payload.stringCode]
    //             :
    //                 payload.stringCode==='time' ? [...budgetTypes, 'time']: [payload.stringCode]
    //         } else if(payload.typePanel==='serviceTypes'){
    //             console.log('service types')
    //             const serviceTypes = state.calc.clicked.serviceTypes
    //             const serviceType = state.calc.serviceTypes.find(serviceType=>serviceType.stringCode===payload.stringCode)
    //             if(serviceTypes.includes(payload.stringCode)){
    //                 newClicked = deleteFromArr(serviceTypes, payload.stringCode)
    //                 //serviceType.auxPanel.open = false
    //             } else{
    //                 newClicked = [...serviceTypes, payload.stringCode]
    //                 // newAuxPanels = serviceType.auxPanel && !state.calc.auxPanels.includes(serviceType.stringCode)
    //                 //     ? [...state.calc.auxPanels.show, serviceType.stringCode]
    //                 //     : state.calc.auxPanels
    //             }

    //         } else{
    //             newClicked = state.calc.clicked[payload.typePanel] === payload.stringCode ? [] : [payload.stringCode]
    //         }           
            
    //         return{
    //             ...state,
    //                 calc:{
    //                     ...state.calc,
    //                     clicked: {
    //                         ...state.calc.clicked,
    //                         [payload.typePanel]: newClicked
    //                     }
    //                 }
    //         }
        
    //     case 'SET_CHOSEN':

    //         const serviceTypeIdx = state.calc.serviceTypes.findIndex(type=>type.stringCode===payload.stringCode)
    //         const newServiceType = {...state.calc.serviceTypes[serviceTypeIdx]}
    //         newServiceType.auxPanel.chosen = payload.param
    //         newServiceType.auxPanel.open = false
            
    //         return{
    //             ...state,
    //                 calc:{
    //                     ...state.calc,
    //                     serviceTypes: [
    //                         ...state.calc.serviceTypes.slice(0, serviceTypeIdx),
    //                         {...newServiceType},
    //                         ...state.calc.serviceTypes.slice(serviceTypeIdx + 1)
    //                     ]
    //                 }
    //         }

    //         case 'SET_AUX_OPEN':

    //         console.log('SET_AUX_OPEN')
    //         const idx = state.calc.serviceTypes.findIndex(type=>type.stringCode===payload.stringCode)
    //         const newType = {...state.calc.serviceTypes[idx]}
    //         newType.auxPanel.open = !newType.auxPanel.open
    //         console.log(newType.auxPanel.open)
            
    //         return{
    //             ...state,
    //                 calc:{
    //                     ...state.calc,
    //                     serviceTypes: [
    //                         ...state.calc.serviceTypes.slice(0, idx),
    //                         {...newType},
    //                         ...state.calc.serviceTypes.slice(idx + 1)
    //                     ]
    //                 }
    //         }

    //     default: 
    //         return state
    // }
}

export default reducer