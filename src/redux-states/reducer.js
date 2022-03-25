import * as actionType from "./actionTypes"

const initialTheme = "light"

const reducer = (state={} , action) => {
    console.log("from reducer");
    console.log(action.payload);
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