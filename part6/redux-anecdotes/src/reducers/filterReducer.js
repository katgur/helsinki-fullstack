const reducer = (state = '', action) => {
    console.log('state now: ', state)
    console.log('action', action)
    switch (action.type) {
        case 'SET_FILTER':
            return action.payload
        default:
            return state
    }
}

export function setFilter(str) {
    return {
        type: 'SET_FILTER',
        payload: str,
    }
}

export default reducer