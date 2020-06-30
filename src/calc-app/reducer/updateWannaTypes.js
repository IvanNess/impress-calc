import {getNewTypes} from '../utils'

const updateWannaTypes = (state, {type, payload}) =>{
    if (state===undefined){
        return [
            {
                name: 'Поясняющий',
                stringCode: 'explain',
                error: false
            },
            {
                name: 'Обучающий',
                stringCode: 'learning',
                error: false
            },
            {
                name: 'Рекламный',
                stringCode: 'adVideo',
                error: false
            },
            {
                name: 'Презентационный',
                stringCode: 'presentation',
                error: false
            },
            {
                name: 'Видеоблог/видеоконтент',
                stringCode: 'vblog',
                error: false
            },
            {
                name: 'Другое',
                stringCode: 'other',
                error: false
            }
        ]
    }

    return getNewTypes(state, {type, payload}, 'wannaTypes')

}

export default updateWannaTypes