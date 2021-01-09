const search={
    city:"karachi"

}

const reducer = (state = search, action) => {
    
    switch (action.type) {
        case "CHANGE_NAME":
            return {city:action.payload}
    
        default:
            return state
    }

}

export default reducer;