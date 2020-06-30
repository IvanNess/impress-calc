import {getNewTypes} from '../utils'

const updateLanguageTypes = (state, {type, payload}) =>{
    if (state===undefined){
        return [
            {
                name: 'Русский/Белорусский',
                stringCode: 'rus',
                error: false
            },
            {
                name: 'Английский или другой иностранный',
                stringCode: 'eng',
                error: false
            },
            {
                name: 'Обе версии',
                stringCode: 'both',
                error: false
            }
        ]
    }

    return getNewTypes(state, {type, payload}, 'languageTypes')

}

export default updateLanguageTypes