import {deleteFromArr} from '../utils'

const updateClicked = (state, {type, payload})=>{
    if(state===undefined){
        return{
            wannaTypes: [],
            auxTypes: [],
            languageTypes: [],
            budgetTypes: [],
            serviceTypes: [],
            connectTypes: ['email', 'messangers'],
        }
    }

    switch(type){
        case 'TYPE_CLICKED':

            let newClicked

            if(payload.typePanel==='auxTypes'  && state.calc.clicked.auxTypes[0] !== payload.stringCode){
               
                newClicked = state.calc.clicked[payload.typePanel] === payload.stringCode ? [] : [payload.stringCode]
                return{ 
                    ...state.calc.clicked,
                    serviceTypes: [],
                    [payload.typePanel]: newClicked
                }
            }

            if(payload.typePanel==='connectTypes'){
                return state.calc.clicked
            }

            if(payload.typePanel==='languageTypes'){
                const serviceTypes = state.calc.clicked.serviceTypes.filter(type=>{
                    const serviceType = state.calc.serviceTypes.find(serviceType=>serviceType.stringCode===type)
                    return serviceType.languageTypes? serviceType.languageTypes.includes(payload.stringCode): true
                    //return !serviceType.languageTypes
                })
                
                return {
                    ...state.calc.clicked,
                    languageTypes: [payload.stringCode],
                    serviceTypes
                }
            }

            if(payload.typePanel==='budgetTypes'){
                const budgetTypes = state.calc.clicked.budgetTypes
                newClicked = budgetTypes.includes('time') 
                ? 
                    payload.stringCode==='time' ? deleteFromArr(budgetTypes, 'time'): ['time', payload.stringCode]
                :
                    payload.stringCode==='time' ? [...budgetTypes, 'time']: [payload.stringCode]
            } else if(payload.typePanel==='serviceTypes'){
                console.log('service types')
                const types = state.calc.clicked[payload.typePanel]

                if(types.includes(payload.stringCode)){
                    newClicked = deleteFromArr(types, payload.stringCode)
                    const type = state.calc[payload.typePanel].find(type=>type.stringCode===payload.stringCode)
                    if(type.connected){

                        newClicked = type.connected.reduce((res,type) => {
                            const result = deleteFromArr(res, type)
                            return result
                        }, newClicked);
                    }

                } else{
                    newClicked = [...types, payload.stringCode]
                    //sort out newClicked
                    let sorted = []
                    state.calc.serviceTypes.forEach(type => {
                        if(newClicked.includes(type.stringCode)){
                            sorted.push(type.stringCode)
                        }
                    })
                    newClicked = sorted
                }


            } else{
                newClicked = [payload.stringCode]
            }  

            console.log(newClicked)
                     
            
            return{ 
                ...state.calc.clicked,
                [payload.typePanel]: newClicked
            }
        default:
            return state.calc.clicked
    }
}

export default updateClicked