import * as actionType from "./actionTypes"

export const setLocationState = (locationObj) => ({
    type: actionType.LOCATION_ADDED,
    payload: {
        id: locationObj.id,
        lat: locationObj.latitude,
        long: locationObj.longitude,
        locationType: locationObj.pType
    }
})

export const setTheme = (themeName) => ({
    type : actionType.THEME_CHANGED,
    theme: themeName

})