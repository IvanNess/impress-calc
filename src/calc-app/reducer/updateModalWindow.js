const updateModalWindow = (state, { type, payload }) => {
    if (state === undefined) {
        return {
            show: false,
            errorParts: [],
            contactError: false
        }
    }

    switch (type) {
        case 'OPEN_WINDOW':
            console.log('OPEN_WINDOW', payload)
            return {...payload}

        case 'CLOSE_WINDOW':
            return {
                show: false,
                errorParts: [],
                contactErrors: { emptyFields: false, wrongEmail: false, wrongMessengers: false }
            }
        default:
            return state.calc.modalWindow
    }
}

export default updateModalWindow