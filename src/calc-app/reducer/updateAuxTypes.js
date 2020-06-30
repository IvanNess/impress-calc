import {getNewTypes} from '../utils'

const updateAuxTypes = (state, {type, payload}) =>{
    if (state===undefined){
        return [
            {
                name: 'Анимационный',
                stringCode: 'animation',
                error: false
            },
            {
                name: 'Игровой',
                stringCode: 'play',
                error: false
            },
            {
                name: 'На основе захватов экрана',
                stringCode: 'screen',
                error: false
            },
            {
                name: 'Комбинированный',
                stringCode: 'combine',
                error: false
            },
        ]
    }

    return getNewTypes(state, {type, payload}, 'auxTypes')

}

export default updateAuxTypes