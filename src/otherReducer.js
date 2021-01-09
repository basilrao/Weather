const iState = {
    country:"",
    time:"",
    day:"",
    temperature:"",
    description:"",
    wind:"",
    humidity:""
    
}
 const otherReducer=(state=iState,action)=>{
    
    switch (action.type) {
        case "CHANGE_PARAMS":
            
            return{...state,
            country:action.payload.country,
            time:action.payload.time,
            day:action.payload.day,
            temperature:action.payload.temperature,
            description:action.payload.description,
            wind:action.payload.wind,
            humidity:action.payload.humidity
            }
    
        default:
            return state
    }

}
export default otherReducer;