import {createStore} from 'redux'

import reducer from './calc-app/reducer'

const store = createStore(reducer)

export default store