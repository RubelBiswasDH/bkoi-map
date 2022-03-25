import * as actionType from "./actionTypes"


const reducer = (state={} , action) => {

    switch (action.type) {
        case actionType.LOCATION_ADDED:
            return{
                currentLocation: action.payload,
                themeType: state.themeType
            };
        case actionType.THEME_CHANGED:
            return{
                currentLocation: state.currentLocation,
                themeType: action.theme
            };
        default:
            return{
                state
        }
    }
}
export default reducer;