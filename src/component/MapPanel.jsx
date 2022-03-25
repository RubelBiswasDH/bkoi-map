// import './App.css';
// import { bkoiConfig } from 'bkoi-gl/src/util/config';
import React, { useEffect, useRef, useState } from "react"
import bkoigl from "bkoi-gl"
import "bkoi-gl/dist/style/bkoi-gl.css"
import { useSelector } from "react-redux"

const MapPanel = () => {

    const [mapMarker, setMapMarker] = useState()
    const [mapObject, setMapObject] = useState()
    const mapData = useSelector(prevState => prevState);

    let themeColor;
    mapData.themeType === 'dark' ? themeColor = 'https://map.barikoi.com/styles/barikoi-dark/style.json' :  themeColor = ''

    useEffect(()=> {
       
        bkoigl.accessToken = 'MzE0MTowQzJLM0VQRTJV' // required
         const map = new bkoigl.Map({
            container: 'map',  
            center: mapData.currentLocation ? [  mapData.currentLocation.long,  mapData.currentLocation.lat ] : [ 90.3938010872331, 23.821600277500405 ],  
            zoom: 13,
            // controlPositions: 'topLeft',
            style: themeColor
        });
        // console.log(map);  
        const controlLoader = () =>{ 
            
            map.addControl( 
                new bkoigl.FullscreenControl() 
            ) 
            map.addControl( 
                new bkoigl.NavigationControl()
            ) 
            map.addControl(
                new bkoigl.ScaleControl() 
            ) 
          
        }
        

        window.addEventListener("load", controlLoader) ;
        setMapObject(prevState => prevState = map);

  
        return () =>{ 
        console.log("Exit") 
        window.removeEventListener("load", controlLoader)
        }
    },[mapData.themeType])
 
    // console.log("mapData theme")
    // console.log(mapData.themeType)


    useEffect(()=>{
        if(mapData.currentLocation && mapObject ){
            const {currentLocation} = mapData;
            // console.log("currentLocation")
            // console.log(currentLocation)
            const markerColor = setMarkerColor(currentLocation.locationType);
            console.log("markerColor")
            console.log(markerColor)
            mapMarker && mapMarker.remove();
            // mapMarker
            mapObject.flyTo({
                center: [  mapData.currentLocation.long,  mapData.currentLocation.lat ],
                zoom: 13 
            })
            const marker = new bkoigl.Marker({color: markerColor})
            .setLngLat([  mapData.currentLocation.long,  mapData.currentLocation.lat ])
            .addTo(mapObject)
            setMapMarker(prevState=> prevState = marker)
            
        }
    },[mapData.currentLocation])

    const setMarkerColor = (propertyType) => {
        // console.log("propertyType")
        // console.log(propertyType)
        // const property = propertyType.substring().toLowerCase();
        const property = propertyType.toLowerCase();
        if(property === "admin") return "orange";
        else if(property === "office") return "yellow";
        else if(property === "industry") return "red";
        else if(property === "education") return "brown";
        else if(property === "commercial") return "blue";
        else if(property === "shop") return "pink";
        else return "green"
    }

  
return(
    <div >
        <div id="map">

        </div>
        {/* <button onClick={a}>Click</button> */}
    </div>
)
}

export default MapPanel;

 
