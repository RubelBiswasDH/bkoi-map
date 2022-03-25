// import './App.css';
// import { bkoiConfig } from 'bkoi-gl/src/util/config';
import React, { useEffect, useState } from "react"
import bkoigl from "bkoi-gl"
import "bkoi-gl/dist/style/bkoi-gl.css"
import { useSelector } from "react-redux"

const MapPanel = () => {

    const [mapMarker, setMapMarker] = useState();
    const [mapObject, setMapObject] = useState();

    const mapData = useSelector(prevState => prevState);

   

    // creating map and navigation control 
    useEffect(()=> {
       
        bkoigl.accessToken = process.env.REACT_APP_BKOI_API // required
         const map = new bkoigl.Map({
            container: 'map',  
            center: mapData.currentLocation ? [  mapData.currentLocation.long,  mapData.currentLocation.lat ] : [ 90.3938010872331, 23.821600277500405 ],  
            zoom: 13,
            // controlPositions: 'topLeft',
            style: mapData.themeType === 'dark' ? 'https://map.barikoi.com/styles/barikoi-dark/style.json' :  ''
        });

        // Navigation Control Loader
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[mapData.themeType])
 
   

// Marking and jumping to map section on new location
    useEffect(()=>{
        if(mapData.currentLocation && mapObject ){
            const {currentLocation} = mapData;
            const markerColor = setMarkerColor(currentLocation.locationType);
  
            mapMarker && mapMarker.remove();
     
            mapObject.flyTo({
                center: [  mapData.currentLocation.long,  mapData.currentLocation.lat ],
                zoom: 13 
            })

            const marker = new bkoigl.Marker({color: markerColor})
            .setLngLat([  mapData.currentLocation.long,  mapData.currentLocation.lat ])
            .addTo(mapObject)
            setMapMarker(prevState=> prevState = marker)
            
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[mapData.currentLocation])


    // setting Location Marker color
    const setMarkerColor = (propertyType) => {
   
        const property = propertyType.substring().toLowerCase();

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

 
