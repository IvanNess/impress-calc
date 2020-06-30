const updateFetch = (state, {type, payload}) =>{
    if(state===undefined){
        return {
            error: null,
            isLoading: false,
            data: null
        }
    }
    switch(type){
        case 'LOADING':
            return {error: null, isLoading: true, data: null}
        case 'DATA_LOADED':
            return {error: null, isLoading: false, data: payload.data}
        case 'FETCH_ERROR':
            return {error: payload.error, isLoading: false, data: null}
        default: 
            return state.calc.fetch
    }
}

export default updateFetch